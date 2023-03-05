use crate::{adapters, models::user::User};
use ::mysql::prelude::Queryable;
use actix_web::{get, post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct NewUser {
    pub firebase_id: String,
    pub email: String,
    pub gender: String,
    pub username: Option<String>,
    pub bio: Option<String>,
}

#[get("/list")]
pub async fn get_users() -> impl Responder {
    match adapters::mysql::get_conn() {
        Ok(mut conn) => {
            let users = conn
                .query_map(
                    "SELECT firebase_id, email, gender, username, bio from users",
                    |(firebase_id, email, gender, username, bio)| User { firebase_id, email, gender, username, bio},
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

#[post("/updatebio")]
pub async fn update_bio(body: web::Json<NewUser>) -> impl Responder {
    match adapters::mysql::get_conn() {
        Ok(mut conn) => {
            let user = body.into_inner();
            let result = conn.exec_drop(
                "UPDATE users SET bio = ? WHERE users.firebase_id = ?",
                (user.bio, user.firebase_id),
            );
            match result {
                Ok(_) => HttpResponse::Ok().body("User updated successfully."),
                Err(_) => HttpResponse::InternalServerError().body("Could not update user."),
            }
        }
        Err(_) => HttpResponse::InternalServerError().body("Could not connect to the database."),
    }
}

#[post("/updateusername")]
pub async fn update_username(body: web::Json<NewUser>) -> impl Responder {
    match adapters::mysql::get_conn() {
        Ok(mut conn) => {
            let user = body.into_inner();
            let result = conn.exec_drop(
                "UPDATE users SET username = ? WHERE users.firebase_id = ?",
                (user.username, user.firebase_id),
            );
            match result {
                Ok(_) => HttpResponse::Ok().body("User updated successfully."),
                Err(_) => HttpResponse::InternalServerError().body("Could not update user."),
            }
        }
        Err(_) => HttpResponse::InternalServerError().body("Could not connect to the database."),
    }
}

#[get("/{firebase_id}")]
pub async fn get_user(firebase_id: web::Path<String>) -> impl Responder {
    match adapters::mysql::get_conn() {
        Ok(mut conn) => {
            let user: Option<(String, String, String, Option<String>, Option<String>)> = conn
                .exec_first(
                    "SELECT firebase_id, email, gender, username, bio FROM users WHERE firebase_id = ?",
                    (firebase_id.into_inner(),),
                )
                .unwrap();
            println!("{:#?}", user);
            HttpResponse::Ok().json(user)
        }
        Err(_) => HttpResponse::InternalServerError().body("Could not connect to the database."),
    }
}
