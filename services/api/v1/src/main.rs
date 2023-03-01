use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer};

mod adapters;
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
    let port: u16 = dotenv::var("PORT")
        .unwrap_or_else(|_| "5172".to_string())
        .parse()
        .unwrap();

    let server = HttpServer::new(move || {
        App::new()
            .app_data(app_data.clone())
            .wrap(Logger::default())
            .wrap(middlewares::AppData)
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allowed_methods(vec!["POST"])
                    .allowed_headers(vec![
                        http::header::AUTHORIZATION,
                        http::header::CONTENT_TYPE,
                        http::header::ACCESS_CONTROL_ALLOW_METHODS,
                    ]),
            )
            .service(services::ping)
            .service(services::app_data)
            .service(
                web::scope("/manga")
                    .service(services::manga::get_manga_by_title)
                    .service(services::manga::get_manga_by_id)
                    .service(services::manga::get_manga_stats_by_id)
                    .service(services::manga::get_manga_stats_by_title)
                    .service(services::manga::get_manga_by_order),
            )
            .service(
                web::scope("/users")
                    .service(services::user::get_users)
                    .service(services::user::create_user),
            )
    })
    .bind(("0.0.0.0", port))?
    .run();

    println!("Server running on port {}", port);

    server.await
}
