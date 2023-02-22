use crate::models::app_data::ApplicationData;
use actix_web::{web, App, HttpServer};
use std::sync::Mutex;

mod handlers;
mod models;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    let app_data = web::Data::new(ApplicationData {
        count: Mutex::new(0),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_data.clone())
            .service(services::ping)
    })
    .bind(dotenv::var("API_BIND_ADDR").unwrap())?
    .run()
    .await
}
