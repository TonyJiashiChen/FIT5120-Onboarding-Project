# FIT5120-Onboarding-Project
\
**Get Started (frontend)**\
\
`cd onboarding-frontend`\
`npm start`

## Building frontend image with arg
`docker buildx build --platform linux/amd64 --build-arg REACT_APP_API_URL=http://34.129.1.154:7999/api/ --push -t jirathipk/vic-emissions-frontend:latest .`

**Using Docker for the frontend and backend (Dev)**\
`docker-compose up -d`\
To rebuild image\
`docker-compose up -d --build`\
To stop containers\
`docker-compose down`

After containers initialise for the first time
Run `alembic upgrade head` in the backend container to migrate data in the database


**Backend (manually)**\
\
`cd onboarding-backend`\
\
Migrate database\
`alembic upgrade head`

Display raw SQL\
`alembic upgrade head --sql`

Reset database\
`alembic downgrade base && alembic upgrade head`
https://alembic.sqlalchemy.org/en/latest/
\
Run the server manually\
`uvicorn app.main:app --reload`\
https://fastapi.tiangolo.com/deployment/manually/
\
\
environment variable required
- DATABASE_HOSTNAME
- DATABASE_NAME
- DATABASE_PORT
- DATABASE_PASSWORD
- DATABASE_USERNAME