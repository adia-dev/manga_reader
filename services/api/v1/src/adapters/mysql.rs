use mysql::prelude::*;
use mysql::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    firebase_id: String,
    email: String,
    gender: String,
    username: Option<String>,
    bio: Option<String>,
    firstname: Option<String>,
    lastname: Option<String>,
}

pub fn get_conn() -> std::result::Result<PooledConn, Box<dyn std::error::Error>> {
    let mysql_url = dotenv::var("MYSQL_URI").expect("MYSQL_URI must be set");
    let opts = Opts::from_url(&mysql_url)?;
    let pool = Pool::new(opts)?;
    let conn = pool.get_conn()?;

    Ok(conn)
}
