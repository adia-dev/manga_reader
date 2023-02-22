use crate::models::app_data::ApplicationData;
use actix_web::{middleware::Logger, web, App, HttpServer};
use std::sync::Mutex;

mod handlers;
mod middlewares;
mod models;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let app_data = web::Data::new(ApplicationData {
        request_count: Mutex::new(0),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_data.clone())
            .wrap(Logger::default())
            .wrap(middlewares::AppData)
            .service(services::ping)
    })
    .bind(dotenv::var("API_BIND_ADDR").unwrap())?
    .run()
    .await
}
