use axum::{routing::get, Router};

pub fn get_router() -> Router {
    Router::new().route("/", get(validate_jwt).post(login))
}

async fn validate_jwt() -> &'static str {
    "Validate JWT"
}

async fn login() -> &'static str {
    "Login"
}
