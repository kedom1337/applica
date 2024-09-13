use axum::Router;

mod routes;
use routes::*;

use tokio::net::TcpListener;
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| {
                    format!(
                        "{}=debug,tower_http=debug,axum::rejection=trace",
                        env!("CARGO_CRATE_NAME")
                    )
                    .into()
                }),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let api_v1_routes = Router::new()
        .nest("/application", application::get_router())
        .nest("/auth", auth::get_router());

    let app_routes = Router::new()
        .nest("/api/v1", api_v1_routes)
        .layer(TraceLayer::new_for_http());

    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
    tracing::debug!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app_routes).await.unwrap();
}
