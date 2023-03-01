pub mod manga;
pub mod user;

use chrono::offset::Utc;
use actix_web::{get, web, HttpResponse, Responder};
use std::sync::Mutex;
use crate::{cache, models::app_data::ApplicationData};

pub fn recover_previous_session() -> ApplicationData {
    let recovered_request_count = cache::redis_cache::get_value("request_count").unwrap_or(0);
    let recovered_last_request =
        cache::redis_cache::get_value("last_request").unwrap_or("".to_string());
    let recovered_last_response =
        cache::redis_cache::get_value("last_response").unwrap_or("".to_string());
    let recovered_last_request_time =
        cache::redis_cache::get_value("last_request_time").unwrap_or("".to_string());
    let recovered_last_response_time =
        cache::redis_cache::get_value("last_response_time").unwrap_or("".to_string());

    let now_string = Utc::now().to_rfc3339();
    let recovered_session_start_time =
        cache::redis_cache::get_value("session_start_time").unwrap_or(now_string);

    ApplicationData {
        request_count: Mutex::new(recovered_request_count),
        last_request: Mutex::new(recovered_last_request),
        last_response: Mutex::new(recovered_last_response),
        last_request_time: Mutex::new(recovered_last_request_time),
        last_response_time: Mutex::new(recovered_last_response_time),
        session_start_time: Mutex::new(recovered_session_start_time),
    }
}

#[get("/")]
pub async fn ping() -> impl Responder {
    HttpResponse::Ok().body("Hello World !")
}

#[get("/app-data")]
pub async fn app_data(data: web::Data<ApplicationData>) -> impl Responder {
    HttpResponse::Ok().json(data)
}
