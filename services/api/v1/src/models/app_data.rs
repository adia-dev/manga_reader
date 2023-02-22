use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Serialize, Debug, Deserialize)]
pub struct ApplicationData {
    pub request_count: Mutex<i32>,
    pub last_request: Mutex<String>,
    pub last_response: Mutex<String>,
    pub last_request_time: Mutex<String>,
    pub last_response_time: Mutex<String>,
    pub session_start_time: Mutex<String>,
}
