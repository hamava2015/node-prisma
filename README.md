<div align="center">
	<a><img width="150" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></a>
</div>

<p align="center">
	<a><img width="60" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></a>
	<a><img width="60" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></a>
	<a><img width="60" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/></a>
	<a><img width="60" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" /></a>
  <a><img width="60" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest"/></a>
  <a><img width="60" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker"/></a>
	
</p>


# Backend With NodeJS, TypeScript, Prisma, and PostgreSQL

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

## tech Stack
- Node.js
- Typescript
- Prisma
- Supabase
- PostgreSQL
- REST API
- Docker
- Jest


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

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  user_id       Int            @id @default(autoincrement())
  username      String         @unique
  password      String
  name          String?
  equipmentLogs EquipmentLog[]
}

model Equipment {
  equipment_id  Int            @id @default(autoincrement())
  name          String
  type          String
  location      String
  equipmentLogs EquipmentLog[]
}

model Job {
  job_id        Int            @id @default(autoincrement())
  job_name      String
  equipmentLogs EquipmentLog[]
}

model EquipmentLog {
  log_id                Int       @id @default(autoincrement())
  checkout_date         DateTime
  return_date           DateTime?
  return_location       String?
  requested_return_date DateTime?
  status                String
  user_id               Int
  equipment_id          Int
  job_id                Int

  User      User      @relation(fields: [user_id], references: [user_id])
  Equipment Equipment @relation(fields: [equipment_id], references: [equipment_id])
  Job       Job       @relation(fields: [job_id], references: [job_id])

  @@unique([user_id, equipment_id, job_id, checkout_date], name: "unique_log_entry")
}

```
  
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
![prisma_studio](https://github.com/afallahi/node-prisma/assets/73287428/53630241-77d0-4dc1-916e-fc9d7342cee9)


- Visualize Prisma schema
```
https://prismaliser.app/
```
![schema](https://github.com/afallahi/node-prisma/assets/73287428/608e4dbe-818f-4d01-a8f6-e5df453a3c1d)


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
docker compose up
```

# Getting Started

## Option 1 - local
- Set the environment variables for `DATABASE_URL` and `SERVER_PORT`
```
DATABASE_URL="postgresql://postgres:<DB_PASSWORD>@db.vcihvoifiuxwcokrlxqr.supabase.co:5432/postgres"
```

- Run the app
```
npm run dev
```

## Option 2 - Docker
- Set the environment varaible `SERVER_PORT` to 3000
```
docker compose up -d
```

- Open the included Postman collection to invoke endpoints
  - Set `BASE_URL` to `http://localhost:<SERVER_PORT>`


- Run tests
```
npm run test
```

![jest](https://github.com/afallahi/node-prisma/assets/73287428/7aa8c56e-7d31-4b76-bbda-5aa2ec7fd892)


- Postman
  
![1 login](https://github.com/afallahi/node-prisma/assets/73287428/1251bc66-337e-4dbf-86f7-563ef2648f93)
![2 list](https://github.com/afallahi/node-prisma/assets/73287428/59dc87c1-5e19-40c2-bde7-95964c6099b1)
![3 add](https://github.com/afallahi/node-prisma/assets/73287428/4643396f-4b47-4039-bc7d-adc73316fda1)
![4 filter](https://github.com/afallahi/node-prisma/assets/73287428/4ca1622a-5780-4d77-8a0d-755205061446)
![5 checkout](https://github.com/afallahi/node-prisma/assets/73287428/d2575579-58bf-4584-be32-154c78eb72f6)
![6 return](https://github.com/afallahi/node-prisma/assets/73287428/e7bbedee-31fe-455c-a98d-efd71abb7a74)

