use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};

use diesel::prelude::*;

use crate::{
    db::PgPool, error::ApplicaError, models::application::Application,
    schema::applications,
};

pub fn get_router() -> Router<PgPool> {
    Router::new()
        .route(
            "/",
            get(get_applications)
                .post(add_application)
                .put(edit_application)
                .delete(delete_application),
        )
        .route("/accept", post(accept_application))
}

async fn get_applications(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<Application>>, ApplicaError> {
    let mut db_conn = pool.get()?;
    let result: Vec<Application> = applications::table
        .select(Application::as_select())
        .load(&mut db_conn)?;

    Ok(Json(result))
}

async fn add_application(State(pool): State<PgPool>) -> &'static str {
    "Add application"
}

async fn edit_application(State(pool): State<PgPool>) -> &'static str {
    "Edit application"
}

async fn delete_application(State(pool): State<PgPool>) -> &'static str {
    "Delete application"
}

async fn accept_application(State(pool): State<PgPool>) -> &'static str {
    "Accept application"
}
