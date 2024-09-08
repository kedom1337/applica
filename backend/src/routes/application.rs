use axum::{
    routing::{get, post},
    Router,
};

pub fn get_router() -> Router {
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

async fn get_applications() -> &'static str {
    "Get application"
}

async fn add_application() -> &'static str {
    "Add application"
}

async fn edit_application() -> &'static str {
    "Edit application"
}

async fn delete_application() -> &'static str {
    "Delete application"
}

async fn accept_application() -> &'static str {
    "Accept application"
}
