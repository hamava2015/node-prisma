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

