use crate::{
    adapters,
    models::{app_data::ApplicationData, user::User},
};
use ::mysql::{
    prelude::{FromValue, Queryable},
    Row,
};
use actix_web::{get, post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct NewUser {
    pub firebase_id: String,
    pub email: String,
}

#[get("/list")]
pub async fn get_users() -> impl Responder {
    match adapters::mysql::get_conn() {
        Ok(mut conn) => {
            let users = conn
                .query_map(
                    "SELECT firebase_id, email from users",
                    |(firebase_id, email)| User { firebase_id, email },
                )
                .unwrap();
            println!("{:#?}", users);
            HttpResponse::Ok().json(users)
        }
        Err(_) => HttpResponse::InternalServerError().body("Could not connect to the database."),
    }
}

#[post("/new")]
pub async fn create_user(body: web::Json<NewUser>) -> impl Responder {
    match adapters::mysql::get_conn() {
        Ok(mut conn) => {
            let user = body.into_inner();
            let result = conn.exec_drop(
                "INSERT INTO users (firebase_id, email) VALUES (?, ?)",
                (user.firebase_id, user.email),
            );
            match result {
                Ok(_) => HttpResponse::Ok().body("User created successfully."),
                Err(_) => HttpResponse::InternalServerError().body("Could not create user."),
            }
        }
        Err(_) => HttpResponse::InternalServerError().body("Could not connect to the database."),
    }
}
