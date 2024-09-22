mod common;
mod models;
mod routes;
mod schema;

use common::*;
use routes::*;

use std::{env, path::Path};

use axum::Router;
use sqlx::postgres::PgPoolOptions;
use tokio::net::TcpListener;
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    let dev_env = Path::new(".env");
    if dev_env.exists() {
        dotenvy::from_filename(dev_env).unwrap();
    }

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

    let db_pool = PgPoolOptions::new()
        .max_connections(15)
        .connect(&env::var("DATABASE_URL").unwrap())
        .await
        .unwrap();

    // TODO: Convert tracing event to span
    tracing::debug!("running database migrations");
    sqlx::migrate!().run(&db_pool).await.unwrap();

    let api_v1_routes = Router::new()
        .nest("/application", application::get_router())
        .nest("/auth", auth::get_router());

    let app_routes = Router::new()
        .nest("/api/v1", api_v1_routes)
        .layer(TraceLayer::new_for_http())
        .with_state(db_pool);

    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
    tracing::debug!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app_routes).await.unwrap();
}
