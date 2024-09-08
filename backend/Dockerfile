# Stage 1 - Build app
FROM rust:1.81.0-slim-bullseye AS build
WORKDIR /usr/src/app

# Install dependencies
COPY Cargo.toml Cargo.lock ./
RUN cargo fetch

# Build application
COPY . .
RUN cargo build --locked --release

# Stage 2 - Run app
FROM debian:bullseye-slim AS final
WORKDIR /app

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

# Copy the executable from the build stage
COPY --from=build /usr/src/app/target/release/backend .

# Run application
EXPOSE 8080/tcp
CMD ["./backend"]
