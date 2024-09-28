use axum::{
    extract::State,
    routing::{get, post},
    Router,
};
use sqlx::PgPool;

use crate::{error::ApplicaError, models::application::Application};

pub fn get_router() -> Router<PgPool> {
    Router::new()
        .route(
            "/",
            get(get_applications)
                .post(add_application)
                .delete(delete_application),
        )
        .route("/status", post(set_applicattion_status))
}

async fn get_applications(
    State(pool): State<PgPool>,
) -> Result<(), ApplicaError> {
    let applications =
        sqlx::query_as!(Application, "SELECT * FROM applications")
            .fetch_all(&pool)
            .await?;

    Ok(())
}

async fn add_application(
    State(pool): State<PgPool>,
) -> Result<(), ApplicaError> {
    Ok(())
}

async fn delete_application(
    State(pool): State<PgPool>,
) -> Result<(), ApplicaError> {
    Ok(())
}

async fn set_applicattion_status(
    State(pool): State<PgPool>,
) -> Result<(), ApplicaError> {
    Ok(())
}
