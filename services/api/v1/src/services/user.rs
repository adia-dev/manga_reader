use crate::{
    adapters::mysql,
    models::{app_data::ApplicationData, user::User},
};
use ::mysql::prelude::Queryable;
use actix_web::{get, web, HttpResponse, Responder};

#[get("/")]
pub async fn get_users(_data: web::Data<ApplicationData>) -> impl Responder {
    match mysql::get_conn() {
        Ok(mut conn) => {
            let users = conn
                .query_map(
                    "SELECT firebase_id, email from users",
                    |(firebase_id, email)| User { firebase_id, email },
                )
                .unwrap();
            println!("{:#?}", users);
            HttpResponse::Ok().body("user: SIKE !")
        }
        Err(_) => HttpResponse::InternalServerError().body("Could not connect to the database."),
    }
}
