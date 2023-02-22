extern crate redis;
use dotenv;
use redis::{Commands, Connection};

fn build_con() -> Result<Connection, redis::RedisError> {
    let client = redis::Client::open(dotenv::var("REDIS_ADDR").unwrap())?;
    client.get_connection()
}

pub fn get_value<T>(key: &str) -> redis::RedisResult<T>
where
    T: redis::FromRedisValue,
{
    let mut con = match build_con() {
        Ok(con) => con,
        Err(e) => return Err(e),
    };

    con.get(key)
}

pub fn set_value<T>(key: &str, value: T) -> redis::RedisResult<()>
where
    T: redis::ToRedisArgs,
{
    let mut con = match build_con() {
        Ok(con) => con,
        Err(e) => return Err(e),
    };

    con.set(key, value)
}

pub fn del_value(key: &str) -> redis::RedisResult<()> {
    let mut con = match build_con() {
        Ok(con) => con,
        Err(e) => return Err(e),
    };

    con.del(key)
}
