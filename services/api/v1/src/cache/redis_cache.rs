extern crate redis;
use dotenv;
use redis::{Commands, Connection};

fn build_con() -> Result<Connection, redis::RedisError> {
    let redis_addr = match dotenv::var("REDIS_ADDR") {
        Ok(addr) => addr,
        Err(e) => {
            println!("REDIS_ADDR not found: {:?}", e);
            return Err(redis::RedisError::from((
                redis::ErrorKind::ClientError,
                "REDIS_ADDR not found",
            )));
        }
    };

    let client = match redis::Client::open(redis_addr) {
        Ok(client) => client,
        Err(e) => panic!("Could not connect to redis: {:?}", e),
    };
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
