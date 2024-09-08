use axum::Router;

mod routes;
use routes::*;

#[tokio::main]
async fn main() {
    let api_v1_routes = Router::new()
        .nest("/application", application::get_router())
        .nest("/auth", auth::get_router());

    let app = Router::new().nest("/api/v1", api_v1_routes);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}
