use std::sync::Mutex;

use chrono::offset::{FixedOffset, Utc};
use chrono::DateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug, Deserialize)]
pub struct ApplicationData {
    pub request_count: Mutex<i32>,
    pub last_request: Mutex<String>,
    pub last_response: Mutex<String>,
    pub last_request_time: Mutex<String>,
    pub last_response_time: Mutex<String>,
    pub session_start_time: Mutex<String>,
}
