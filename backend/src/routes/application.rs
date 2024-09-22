use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};
use sea_query::{Asterisk, Expr, PostgresQueryBuilder, Query};
use sea_query_binder::SqlxBinder;
use sqlx::PgPool;

use crate::{
    error::ApplicaError,
    models::{
        application::{
            Application, DeleteApplicationReq, DeleteApplicationRes,
            GetApplicationsRes, SetApplicationStatusReq,
        },
        course::Course,
        field::Field,
    },
    schema::{Applications, ApplicationsFields, Courses, Fields},
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
) -> Result<Json<Vec<GetApplicationsRes>>, ApplicaError> {
    let (sql, _) = Query::select()
        .column(Asterisk)
        .from(Applications::Table)
        .build_sqlx(PostgresQueryBuilder);

    let applications = sqlx::query_as::<_, Application>(&sql)
        .fetch_all(&pool)
        .await?;

    let mut res = Vec::with_capacity(applications.len());
    for a in applications.into_iter() {
        let (sql, _) = Query::select()
            .column(Asterisk)
            .from(Courses::Table)
            .cond_where(Expr::col(Courses::Id).eq(a.course_id))
            .build_sqlx(PostgresQueryBuilder);

        let course = sqlx::query_as::<_, Course>(&sql)
            .bind(a.course_id)
            .fetch_one(&pool)
            .await?;

        let (sql, _) = Query::select()
            .column(Asterisk)
            .from(ApplicationsFields::Table)
            .cond_where(Expr::col(ApplicationsFields::ApplicationId).eq(a.id))
            .left_join(
                Fields::Table,
                Expr::col(ApplicationsFields::FieldId).equals(Fields::Id),
            )
            .build_sqlx(PostgresQueryBuilder);

        let fields = sqlx::query_as::<_, Field>(&sql)
            .bind(a.id)
            .fetch_all(&pool)
            .await?;

        res.push(GetApplicationsRes {
            application: a,
            course,
            fields,
        })
    }

    Ok(Json(res))
}

async fn add_application(
    State(pool): State<PgPool>,
) -> Result<(), ApplicaError> {
    Ok(())
}

async fn delete_application(
    State(pool): State<PgPool>,
    Json(req): Json<DeleteApplicationReq>,
) -> Result<Json<DeleteApplicationRes>, ApplicaError> {
    let (sql, _) = Query::delete()
        .from_table(Applications::Table)
        .cond_where(Expr::col(Applications::Id).eq(req.id))
        .returning_all()
        .build_sqlx(PostgresQueryBuilder);

    let rows = sqlx::query(&sql).bind(req.id).fetch_all(&pool).await?;
    println!("{:#?}", rows);

    Ok(Json(DeleteApplicationRes { deleted: req.id }))
}

async fn set_applicattion_status(
    State(pool): State<PgPool>,
    Json(req): Json<SetApplicationStatusReq>,
) -> Result<(), ApplicaError> {
    let status =
        String::from(serde_json::to_string(&req.status)?.trim_matches('"'));

    let (sql, values) = Query::update()
        .table(Applications::Table)
        .values([
            (Applications::Status, status.clone().into()),
            (Applications::UpdatedAt, Expr::current_timestamp().into()),
        ])
        .cond_where(Expr::col(Applications::Id).eq(req.id))
        .build_sqlx(PostgresQueryBuilder);

    println!("{:#?}", values);

    let rows = sqlx::query(&sql).bind(status).fetch_all(&pool).await?;

    Ok(())
}
