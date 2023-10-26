## Project Scope

- We would like to build Equipment Tracking module that allows our customers to allocate construction equipment for their jobs. Construction equipment examples: truck, forklift, crane, etc. Tracking the use of equipment in hours/days/weeks is essential to allow our customers to bill their clients for use of equipment.

- This is a backend application only. Frontend is out of scope.

## Requirements

- User can see list of equipment and current statuses.
- User can check-out specific equipment
- User can return specific equipment that they checked out
- User cannot check-out equipment that was already checked out
- For simplicity of assignment, assume Job ID as a string identifier (self-reported by user)
- When returning equipment, user needs to specify location where equipment will be dropped
- (optional) If equipment is not available, user can request to get this equipment later (as soon as it is available or at specific date)
- (optional) User can filter equipment by location and equipment type (truck, forklift, etc)

## Database Selection

For the equipment tracking project, a SQL database might be more suitable if you have well-defined data structures, need strong data integrity, or plan to run complex queries involving relationships between equipment, users, and jobs. PostgreSQL is a popular open-source SQL database that offers ACID compliance and robust features.

## Data Model

- User

  - user_id (Primary Key)
  - username (or email)
  - password (hashed)

- Equipment

  - equipment_id (Primary Key)
  - name (e.g., truck, forklift, crane)
  - type (equipment type, e.g., construction, industrial)
  - location (current location of equipment)

- Job

  - job_id (Primary Key)
  - job_name (a name or identifier for the job)

- EquipmentLog
  - log_id (Primary Key)
  - equipment_id (Foreign Key to Equipment)
  - user_id (Foreign Key to Users)
  - job_id (Foreign Key to Jobs)
  - checkout_date (date and time equipment was checked out)
  - return_date (date and time equipment was returned)
  - return_location (location where equipment was returned)
  - requested_return_date (date when equipment is requested for return, optional)
  - status (e.g., checked out, available, requested)

## Setup Node Project with TypeScript

```
npm init -y
npm install express body-parser typescript
npm install --save-dev ts-node
npm install --save-dev @types/node @types/express @types/body-parser
npm install --save-dev nodemon
npx tsc --init
npm i dotenv 
npm i --save-dev @types/dotenv
```

## Create Supabase database

Create a project in Supabase and use the database url in `.env` file later in the project.

## Setup Prisma

```
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
npm i @prisma/client
```

- Add model into Prisma schema.
- Generate the Prisma client
```
npx prisma generate
```

- Migrate

```
npx prisma migrate dev --name init
```

- Prisma Studio

```
npx prisma studio
```

- Visualize Prisma schema
```
https://prismaliser.app/
```

## Authentication

```
npm i bcryptjs
npm i --save-dev @types/bcryptjs
```

## JWT

```
npm i jsonwebtoken
npm i --save-dev @types/jsonwebtoken
```

## Jest
```
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

## Docker
- Create Dockerfile
- Create container for database
- Run Docker Desktop
- Run the command below
```
docker compose up -d
```

Once docker is up, run the command below:
```
docker-compose exec server /bin/sh
npx prisma migrate dev --name init
```

# Getting Started

## Option 1 - local
- Set the environment variables for `DATABASE_URL` and `SERVER_PORT`
- Run the app
```
npm run dev
```

## Option 2 - Docker
- Set the environment varaible `SERVER_PORT` to 5000
```
docker compose up -d
docker-compose exec server /bin/sh
npx prisma migrate dev --name init
```


- Open the included Postman collection to invoke endpoints
  - Set `BASE_URL` to `http://localhost:<SERVER_PORT>`


- Run tests
```
npm run test
```