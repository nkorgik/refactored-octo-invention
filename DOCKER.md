# Docker Setup for Modern Interface

This document explains how to use Docker with this Next.js application.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

## Running with Docker

### Development Mode

For development with hot reload:

```bash
# Build and start the development container
docker-compose -f docker-compose.dev.yml up --build
```

### Production Mode

For production builds:

```bash
# Build and start the production container
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The application will be available at http://localhost:3000.

## Docker Image Structure

Our Docker setup uses a multi-stage build process:

1. **Dependencies Stage**: Installs node modules
2. **Build Stage**: Compiles the Next.js application
3. **Runner Stage**: Creates a minimal production image

This approach minimizes the final image size by:
- Only including production dependencies
- Using a non-root user for security
- Optimizing for the Next.js standalone output

## Environment Variables

You can pass environment variables to the container by:

1. Adding them to the `environment` section in `docker-compose.yml`
2. Using a `.env` file and the `env_file` option in Docker Compose
3. Passing them directly when running a container: `docker run -e VARIABLE=value`

## Docker Best Practices Used

- Multi-stage builds for smaller production images
- Non-root user for improved security
- Proper caching of dependencies for faster builds
- `.dockerignore` to prevent unnecessary files from being included
- `NEXT_TELEMETRY_DISABLED=1` to disable telemetry
- Using Alpine Linux base images for smaller size