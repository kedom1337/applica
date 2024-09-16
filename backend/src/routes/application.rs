use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};

use diesel::prelude::*;

use crate::{
    db::PgPool,
    error::ApplicaError,
    models::{
        application::{
            Application, DeleteApplication, NewApplication, UpdateStatus,
        },
        application_field::ApplicationField,
    },
};

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
) -> Result<Json<Vec<Application>>, ApplicaError> {
    use crate::schema::applications::dsl::*;

    let mut db_conn = pool.get()?;
    let result = applications
        .select(Application::as_select())
        .load(&mut db_conn)?;

    Ok(Json(result))
}

async fn add_application(
    State(pool): State<PgPool>,
    Json(payload): Json<NewApplication>,
) -> Result<Json<Application>, ApplicaError> {
    use crate::schema::applications::dsl::*;
    use crate::schema::applications_fields::dsl::*;

    let mut db_conn = pool.get()?;
    db_conn.transaction(|c| {
        let result = diesel::insert_into(applications)
            .values(&payload)
            .returning(Application::as_returning())
            .get_result(c)?;

        let new_fields = payload
            .fields
            .into_iter()
            .map(|f| ApplicationField {
                application_id: result.id,
                field_id: f,
            })
            .collect::<Vec<ApplicationField>>();

        diesel::insert_into(applications_fields)
            .values(new_fields)
            .execute(c)?;

        Ok(Json(result))
    })
}

async fn delete_application(
    State(pool): State<PgPool>,
) -> Result<Json<DeleteApplication>, ApplicaError> {
    use crate::schema::applications::dsl::*;

    let mut db_conn = pool.get()?;
    let result =
        diesel::delete(applications.filter(id.eq(1))).execute(&mut db_conn)?;

    Ok(Json(DeleteApplication { delete: result }))
}

async fn set_applicattion_status(
    State(pool): State<PgPool>,
    Json(payload): Json<UpdateStatus>,
) -> Result<Json<Application>, ApplicaError> {
    use crate::schema::applications::dsl::*;

    let mut db_conn = pool.get()?;
    let result = diesel::update(applications.filter(id.eq(payload.id)))
        .set(status.eq(payload.status))
        .returning(Application::as_returning())
        .get_result(&mut db_conn)?;

    Ok(Json(result))
}
