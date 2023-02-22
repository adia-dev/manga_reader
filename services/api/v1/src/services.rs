use actix_web::{body, get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
pub async fn ping() -> impl Responder {
    HttpResponse::Ok().body("Hello World !")
}
