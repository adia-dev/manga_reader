use actix_web::{body, get, post, web, App, HttpRequest, HttpResponse, HttpServer, Responder};

use crate::models::app_data::ApplicationData;

#[get("/")]
pub async fn ping() -> impl Responder {
    HttpResponse::Ok().body("Hello World !")
}
