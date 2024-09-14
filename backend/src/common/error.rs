use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};

pub struct ApplicaError(anyhow::Error);

impl IntoResponse for ApplicaError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}

impl<E> From<E> for ApplicaError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}
