use std::sync::Mutex;

pub struct ApplicationData {
    pub request_count: Mutex<i32>,
}
