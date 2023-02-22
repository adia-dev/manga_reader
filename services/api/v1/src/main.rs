use crate::models::app_data::ApplicationData;
use actix_web::{middleware::Logger, web, App, HttpServer};
use cache::redis_cache;
use std::sync::{Arc, Mutex};

mod cache;
mod handlers;
mod middlewares;
mod models;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let app_data = web::Data::new(services::recover_previous_session());

    let server = HttpServer::new(move || {
        App::new()
            .app_data(app_data.clone())
            .wrap(Logger::default())
            .wrap(middlewares::AppData)
            .service(services::ping)
            .service(services::app_data)
    })
    .bind(dotenv::var("API_BIND_ADDR").unwrap())?
    .run();

    server.await
}
