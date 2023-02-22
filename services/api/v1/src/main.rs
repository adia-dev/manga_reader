use crate::models::app_data::ApplicationData;
use actix_cors::Cors;
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
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:5173")
                    .allowed_methods(vec!["POST"])
                    .allowed_headers(vec![
                        http::header::AUTHORIZATION,
                        http::header::CONTENT_TYPE,
                        http::header::ACCESS_CONTROL_ALLOW_METHODS,
                    ]),
            )
            .service(services::ping)
            .service(services::app_data)
            .service(web::scope("/manga").service(services::manga::get_manga_by_title))
    })
    .bind(dotenv::var("API_BIND_ADDR").unwrap())?
    .run();

    server.await
}
