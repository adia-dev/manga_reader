// src/manga/routes.rs

use actix_web::{get, web, HttpResponse, Result};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MangaQueryParams {
    limit: Option<i32>,
    offset: Option<i32>,
    content_rating: Option<Vec<String>>,
    includes: Option<Vec<String>>,
    order: Option<Vec<String>>,
}

async fn fetch_manga_data(url: String) -> Result<Value, actix_web::Error> {
    let client = Client::new();
    client
        .get(url)
        .header("User-Agent", "rust-manga-reader-project")
        .send()
        .await
        .map_err(|e| actix_web::error::ErrorInternalServerError(e.to_string()))?
        .json::<Value>()
        .await
        .map_err(|e| actix_web::error::ErrorInternalServerError(e.to_string()))
}

fn get_mangadex_base_url() -> String {
    dotenv::var("MANGADEX_API_BASE_URL").expect("MANGADEX_API_BASE_URL must be set")
}

#[get("/{title}")]
pub async fn get_manga_by_title(title: web::Path<String>) -> Result<HttpResponse> {
    let url = format!("{}/manga?title={}&limit=3&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc", get_mangadex_base_url(), title);
    let manga = fetch_manga_data(url).await?;
    Ok(HttpResponse::Ok().json(manga))
}

#[get("/order/{order}")]
pub async fn get_manga_by_order(order: web::Path<String>) -> Result<HttpResponse> {
    let url = format!("{}/manga?order[{}]=desc&limit=20&includes[]=cover_art&contentRating[]=safe&hasAvailableChapters=true", get_mangadex_base_url(), order);
    let manga = fetch_manga_data(url).await?;
    Ok(HttpResponse::Ok().json(manga))
}

#[get("/id/{id}")]
pub async fn get_manga_by_id(id: web::Path<String>) -> Result<HttpResponse> {
    let url = format!("{}/manga/{}", get_mangadex_base_url(), id);
    let manga = fetch_manga_data(url).await?;
    Ok(HttpResponse::Ok().json(manga))
}

#[get("/id/{id}/stats")]
pub async fn get_manga_stats_by_id(id: web::Path<String>) -> Result<HttpResponse> {
    let url = format!("{}/statistics/manga/{}", get_mangadex_base_url(), id);
    let manga = fetch_manga_data(url).await?;
    Ok(HttpResponse::Ok().json(manga))
}

#[get("/{title}/stats")]
pub async fn get_manga_stats_by_title(title: web::Path<String>) -> Result<HttpResponse> {
    let manga_data_url = format!("{}/manga?title={}&limit=3&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc", get_mangadex_base_url(), title);
    let mut manga = fetch_manga_data(manga_data_url).await?;
    if let Some(data) = manga["data"].as_array_mut() {
        for manga_entry in data {
            if let Some(id) = manga_entry["id"].as_str() {
                let stats_url = format!("{}/statistics/manga/{}", get_mangadex_base_url(), id);
                if let Ok(stats) = fetch_manga_data(stats_url).await {
                    manga_entry["statistics"] = stats["statistics"].clone();
                }
            }
        }
    }
    Ok(HttpResponse::Ok().json(manga))
}
