use crate::{cache, models::app_data::ApplicationData};
use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    web, Error,
};
use futures_util::future::LocalBoxFuture;
use std::future::{ready, Ready};

// There are two steps in middleware processing.
// 1. Middleware initialization, middleware factory gets called with
//    next service in chain as parameter.
// 2. Middleware's call method gets called with normal request.
pub struct AppData;

// Middleware factory is `Transform` trait
// `S` - type of the next service
// `B` - type of response's body

impl<S, B> Transform<S, ServiceRequest> for AppData
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = ApplicationMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(ApplicationMiddleware { service }))
    }
}

pub struct ApplicationMiddleware<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for ApplicationMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        {
            let app_data = req.app_data::<web::Data<ApplicationData>>().unwrap();

            let mut request_count = app_data.request_count.lock().unwrap();
            *request_count += 1;
            cache::redis_cache::set_value("request_count", *request_count).unwrap();
        }

        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;

            Ok(res)
        })
    }
}
