use crate::models::manga::MangaResponse;
use actix_web::{get, web, HttpResponse};
use serde::{Deserialize, Serialize};

// manga related services inside of a /manga scope
#[get("/{title}")]
pub async fn get_manga_by_title(
    title: web::Path<String>,
    _params: web::Query<MangaQueryParams>,
) -> HttpResponse {
    let url = format!("{}/manga?title={}&limit=3&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc", get_mangadex_base_url(), title);
    let response = reqwest::get(&url).await.unwrap().text().await.unwrap();
    let manga: MangaResponse = serde_json::from_str(&response).unwrap();
    HttpResponse::Ok().json(manga)
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MangaQueryParams {
    limit: Option<i32>,
    offset: Option<i32>,
    content_rating: Option<Vec<String>>,
    includes: Option<Vec<String>>,
    order: Option<Vec<String>>,
}

fn get_mangadex_base_url() -> String {
    dotenv::var("MANGADEX_API_BASE_URL").unwrap()
}

fn format_query_params_includes(includes: Vec<String>) -> String {
    let mut formatted = String::new();
    for include in includes {
        formatted.push_str(&format!("&includes[]={}", include));
    }
    formatted
}
