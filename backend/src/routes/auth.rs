use axum::{routing::get, Router};

use crate::db::PgPool;

pub fn get_router() -> Router<PgPool> {
    Router::new().route("/", get(validate_jwt).post(login))
}

async fn validate_jwt() -> &'static str {
    "Validate JWT"
}

async fn login() -> &'static str {
    "Login"
}
