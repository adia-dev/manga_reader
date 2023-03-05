// manga related services inside of a /manga scope
use actix_web::{get, web, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MangaQueryParams {
    limit: Option<i32>,
    offset: Option<i32>,
    content_rating: Option<Vec<String>>,
    includes: Option<Vec<String>>,
    order: Option<Vec<String>>,
}

#[get("/{title}")]
pub async fn get_manga_by_title(
    title: web::Path<String>,
    _params: web::Query<MangaQueryParams>,
) -> HttpResponse {
    let url = format!("{}/manga?title={}&limit=3&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc", get_mangadex_base_url(), title);

    let response = match reqwest::get(&url).await {
        Ok(response) => response.text().await.unwrap(),
        Err(e) => {
            println!("Error: {}", e);
            return HttpResponse::NotFound().body("Manga not found");
        }
    };

    let manga: serde_json::Value = serde_json::from_str(&response).unwrap();
    HttpResponse::Ok().json(manga)
}

#[get("/order/{order}")]
pub async fn get_manga_by_order(order: web::Path<String>) -> HttpResponse {
    println!("order: {}", order);
    // /manga?order[followedCount]=desc&limit=20&includes[]=cover_art&contentRating[]=safe&hasAvailableChapters=true
    let url = format!("{}/manga?order[{}]=desc&limit=20&includes[]=cover_art&contentRating[]=safe&hasAvailableChapters=true", get_mangadex_base_url(), order);

    let response = match reqwest::get(&url).await {
        Ok(response) => response.text().await.unwrap(),
        Err(e) => {
            println!("Error: {}", e);
            return HttpResponse::NotFound().body("Manga not found");
        }
    };

    let manga: serde_json::Value = serde_json::from_str(&response).unwrap();

    HttpResponse::Ok().json(manga)
}

#[get("/id/{id}")]
pub async fn get_manga_by_id(id: web::Path<String>) -> HttpResponse {
    let url = format!("{}/manga/{}", get_mangadex_base_url(), id);

    let response = match reqwest::get(&url).await {
        Ok(response) => response.text().await.unwrap(),
        Err(e) => {
            println!("Error: {}", e);
            return HttpResponse::NotFound().body("Manga not found");
        }
    };
    let manga: serde_json::Value = serde_json::from_str(&response).unwrap();
    HttpResponse::Ok().json(manga)
}

#[get("/id/{id}/stats")]
pub async fn get_manga_stats_by_id(id: web::Path<String>) -> HttpResponse {
    println!("id: {}", id);
    let url = format!("{}/statistics/manga/{}", get_mangadex_base_url(), id);

    let response = match reqwest::get(&url).await {
        Ok(response) => response.text().await.unwrap(),
        Err(e) => {
            println!("Error: {}", e);
            return HttpResponse::NotFound().body("Manga not found");
        }
    };
    let manga: serde_json::Value = serde_json::from_str(&response).unwrap();
    HttpResponse::Ok().json(manga)
}

// combine get manga by title to get the id and then get the manga stats by id
#[get("{title}/stats")]
pub async fn get_manga_stats_by_title(title: web::Path<String>) -> HttpResponse {
    let url = format!("{}/manga?title={}&limit=3&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc", get_mangadex_base_url(), title);

    let response = match reqwest::get(&url).await {
        Ok(response) => response.text().await.unwrap(),
        Err(e) => {
            println!("Error: {}", e);
            return HttpResponse::NotFound().body("Manga not found");
        }
    };

    let mut manga: serde_json::Value = serde_json::from_str(&response).unwrap();
    // map the manga response and add the stats to the data object
    for manga in manga["data"].as_array_mut().unwrap() {
        let id = manga["id"].as_str().unwrap();
        let stats_url = format!("{}/statistics/manga/{}", get_mangadex_base_url(), id);
        let stats_response = match reqwest::get(&stats_url).await {
            Ok(response) => response.text().await.unwrap(),
            Err(e) => {
                println!("Error: {}", e);
                return HttpResponse::NotFound().body("Manga not found");
            }
        };
        let stats: serde_json::Value = serde_json::from_str(&stats_response).unwrap();
        manga["statistics"] = stats["statistics"].clone();
    }

    HttpResponse::Ok().json(manga)
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
