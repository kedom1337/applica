# `Applica` 👥

A full-stack platform for managing user applications, designed for university clubs.

## Development

1. Start the required Docker containers:

   ```bash
   sudo docker-compose --profile dev up -d
   ```

2. Run the frontend or backend:

- **Frontend** (`localhost:3000`):

  ```bash
  cd frontend
  bun run dev
  ```

- **Backend** (`localhost:8080/api`):

  ```bash
  cd backend
  bun run dev
  ```

## Production

1. Start the production containers:

   ```bash
   sudo docker-compose --profile prod up -d
   ```

2. Make sure to configure your `.env` file with your LDAP URL (if using an external LDAP).

This will launch the frontend, backend, and a PostgreSQL database.
