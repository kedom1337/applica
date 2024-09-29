# `Applica` 👥

A full-stack platform for managing user applications, designed for university clubs.

## Development

1. Start the required Docker containers with the `dev` profile:

   ```bash
   sudo docker-compose --profile dev up -d
   ```

2. Run the frontend or backend:

- **Frontend** (`localhost:3000`):

  ```bash
  cd frontend
  bun install
  bun run dev
  ```

- **Backend** (`localhost:8080/api`):

  ```bash
  cd backend
  bun install
  bun run dev
  ```

## Production

1. Start the production containers with the `prod` profile:

   ```bash
   sudo docker-compose --profile prod up -d
   ```

2. Make sure to configure your `.env` file with your LDAP URL.

This will launch the frontend, backend, and a PostgreSQL database.
