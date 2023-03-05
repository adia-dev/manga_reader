use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub firebase_id: String,
    pub email: String,
    pub gender: String,
    pub username: Opton<String>,
}
