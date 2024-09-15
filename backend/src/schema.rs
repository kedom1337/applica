// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "status"))]
    pub struct Status;
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::Status;

    applications (id) {
        id -> Int4,
        #[max_length = 100]
        first_name -> Varchar,
        #[max_length = 100]
        last_name -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 50]
        phone -> Nullable<Varchar>,
        course_id -> Int4,
        semester -> Nullable<Int4>,
        #[max_length = 50]
        degree -> Nullable<Varchar>,
        experience -> Nullable<Text>,
        status -> Status,
        messaged -> Nullable<Bool>,
        talked -> Nullable<Bool>,
        club_briefed -> Nullable<Bool>,
        security_briefed -> Nullable<Bool>,
        information -> Nullable<Text>,
        created -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    applications_fields (application_id, field_id) {
        application_id -> Int4,
        field_id -> Int4,
    }
}

diesel::table! {
    courses (id) {
        id -> Int4,
        #[max_length = 255]
        name -> Varchar,
    }
}

diesel::table! {
    fields (id) {
        id -> Int4,
        #[max_length = 255]
        name -> Varchar,
    }
}

diesel::joinable!(applications -> courses (course_id));
diesel::joinable!(applications_fields -> applications (application_id));
diesel::joinable!(applications_fields -> fields (field_id));

diesel::allow_tables_to_appear_in_same_query!(
    applications,
    applications_fields,
    courses,
    fields,
);
