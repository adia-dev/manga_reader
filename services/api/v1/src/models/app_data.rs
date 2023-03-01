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

impl ApplicationData {
    pub fn new() -> Self {
        Self {
            request_count: Mutex::new(0),
            last_request: Mutex::new(String::from("")),
            last_response: Mutex::new(String::from("")),
            last_request_time: Mutex::new(String::from("")),
            last_response_time: Mutex::new(String::from("")),
            session_start_time: Mutex::new(String::from("")),
        }
    }

    pub fn increment_request_count(&self) {
        let mut request_count = self.request_count.lock().unwrap();
        *request_count += 1;
    }

    pub fn set_last_request(&self, request: String) {
        let mut last_request = self.last_request.lock().unwrap();
        *last_request = request;
    }

    pub fn set_last_response(&self, response: String) {
        let mut last_response = self.last_response.lock().unwrap();
        *last_response = response;
    }

    pub fn set_last_request_time(&self, request_time: String) {
        let mut last_request_time = self.last_request_time.lock().unwrap();
        *last_request_time = request_time;
    }

    pub fn set_last_response_time(&self, response_time: String) {
        let mut last_response_time = self.last_response_time.lock().unwrap();
        *last_response_time = response_time;
    }

    pub fn set_session_start_time(&self, _session_start_time: String) {
        let mut session_start_time = self.session_start_time.lock().unwrap();
        *session_start_time = session_start_time.to_string();
    }

    pub fn get_request_count(&self) -> i32 {
        let request_count = self.request_count.lock().unwrap();
        *request_count
    }

    pub fn get_last_request(&self) -> String {
        let last_request = self.last_request.lock().unwrap();
        last_request.to_string()
    }

    pub fn get_last_response(&self) -> String {
        let last_response = self.last_response.lock().unwrap();
        last_response.to_string()
    }

    pub fn get_last_request_time(&self) -> String {
        let last_request_time = self.last_request_time.lock().unwrap();
        last_request_time.to_string()
    }

    pub fn get_last_response_time(&self) -> String {
        let last_response_time = self.last_response_time.lock().unwrap();
        last_response_time.to_string()
    }

    pub fn get_session_start_time(&self) -> String {
        let session_start_time = self.session_start_time.lock().unwrap();
        session_start_time.to_string()
    }

    pub fn print(&self) {
        println!("Request Count: {}", self.get_request_count());
        println!("Last Request: {}", self.get_last_request());
        println!("Last Response: {}", self.get_last_response());
        println!("Last Request Time: {}", self.get_last_request_time());
        println!("Last Response Time: {}", self.get_last_response_time());
        println!("Session Start Time: {}", self.get_session_start_time());
    }
}
