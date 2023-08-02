# FIT5120-Onboarding-Project
\
**Get Started (frontend)**\
\
`cd onboarding-frontend`\
`npm start`

**Backend**\
\
`cd onboarding-backend`\
\
Migrate database\
`alembic upgrade head`\

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

\
Using Docker\
`docker-compose up -d`\
Stop containers\
`docker-compose down`

\
To do:
- Fix backend testing
- Add comments