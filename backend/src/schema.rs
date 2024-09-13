// @generated automatically by Diesel CLI.

diesel::table! {
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
        #[max_length = 50]
        status -> Nullable<Varchar>,
        messaged -> Nullable<Bool>,
        talked -> Nullable<Bool>,
        club_briefed -> Nullable<Bool>,
        security_briefed -> Nullable<Bool>,
        information -> Nullable<Text>,
        created -> Nullable<Timestamp>,
        last_updated -> Nullable<Timestamp>,
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
