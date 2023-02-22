use std::sync::Mutex;

pub struct ApplicationData {
    pub count: Mutex<i32>,
}
