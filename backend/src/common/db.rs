use std::env;

use diesel::{
    r2d2::{ConnectionManager, Pool},
    PgConnection,
};
use diesel_migrations::{
    embed_migrations, EmbeddedMigrations, MigrationHarness,
};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations/");

pub type PgPool = Pool<ConnectionManager<PgConnection>>;

pub fn get_connection_pool() -> PgPool {
    let db_url = env::var("DATABASE_URL").unwrap();
    let manager = ConnectionManager::new(db_url);

    Pool::builder()
        .build(manager)
        .expect("could not build database connection pool")
}

pub fn run_migrations(conn: &mut PgConnection) {
    conn.run_pending_migrations(MIGRATIONS).unwrap();
}
