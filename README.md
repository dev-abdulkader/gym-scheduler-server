# Gym Schedule Management System

## Project Overview

The Gym Schedule Management System is a backend solution designed to manage users, classes, and bookings. It supports three roles: **Admin**, **Trainer**, and **Trainee**. Admins can manage classes, update user roles, and oversee the system. Trainers are assigned to classes, and Trainees can book classes and view their schedules.

---

## Relation Diagram

Below is the relational diagram illustrating the relationships between the **Users**, **ClassSchedule**, and **Booking** tables:

![Relational Diagram](http://res.cloudinary.com/dgxitnory/image/upload/v1734069894/xxm1vspm2rp1ba89srbj.png)

## Database Relationships

This section describes the relationships between users, class schedules, and bookings in the system.

### One-to-Many Relationships

1. **Users to Class Schedule (Trainer to Classes)**  
   A user (with the role of "trainer") can have multiple classes assigned to them in the `classSchedule` table.

   - **Relationship:** One user → Many class schedules
   - **Example:** A trainer can have multiple classes.

   **Foreign Key:**  
   `classSchedule.trainer_id > users.id`

2. **Users to Booking (Trainee to Bookings)**  
   A user (with the role of "trainee") can make multiple bookings in the `booking` table.

   - **Relationship:** One user → Many bookings
   - **Example:** A trainee can make multiple bookings.

   **Foreign Key:**  
   `booking.trainee_id > users.id`

### Many-to-One Relationship

1. **Booking to Class Schedule (Multiple Trainees to One Class)**  
   Many bookings can refer to the same class schedule, meaning multiple trainees can book the same class.

   - **Relationship:** Many bookings → One class schedule
   - **Example:** Multiple trainees can book the same class.

   **Foreign Key:**  
   `booking.class_schedule_id > classSchedule.id`

### Summary of Relationships

- **Users to Class Schedule (Trainer to Classes):** One-to-Many  
  (A trainer can have multiple classes assigned to them.)
- **Users to Booking (Trainee to Bookings):** One-to-Many  
  (A trainee can make multiple bookings.)
- **Class Schedule to Booking:** One-to-Many  
  (A class schedule can have multiple bookings.)

### Visual Description of Relationships

```plaintext
Users (Trainers) → Class Schedule (One-to-Many)
      |
      v
   Class Schedule <--- Booking (Many-to-One)
      |
      v
   Users (Trainees) → Booking (One-to-Many)
```

---

## Technology Stack

- **Language:** Node.js
- **Backend Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)

---

## API Endpoints

## User Routes

| Method | Endpoint            | Description                          | Authentication             |
| ------ | ------------------- | ------------------------------------ | -------------------------- |
| POST   | `/register`         | Register a new user.                 | No                         |
| POST   | `/login`            | Login to the system.                 | No                         |
| POST   | `/logout`           | Logout the current user.             | `verifyJWT`                |
| POST   | `/refresh-token`    | Refresh the access token.            | No                         |
| POST   | `/change-password`  | Change the current user's password.  | `verifyJWT`                |
| GET    | `/current-user`     | Retrieve the current user's details. | `verifyJWT`                |
| PATCH  | `/update-user`      | Update the current user's details.   | `verifyJWT`                |
| PATCH  | `/update-role`      | Update a user's role.                | `verifyJWT`, `verifyAdmin` |
| GET    | `/get-all-trainers` | Get a list of all trainers.          | `verifyJWT`, `verifyAdmin` |
| PATCH  | `/update-avatar`    | Update the user's avatar.            | `verifyJWT`                |

---

## Booking Routes

| Method | Endpoint                       | Description                              | Authentication             |
| ------ | ------------------------------ | ---------------------------------------- | -------------------------- |
| POST   | `/create-booking`              | Create a new booking.                    | `verifyJWT`                |
| GET    | `/get-user-bookings`           | Get all bookings for the logged-in user. | `verifyJWT`                |
| GET    | `/get-booked-classes/:classId` | Get all bookings for a specific class.   | `verifyJWT`                |
| GET    | `/get-all-bookings`            | Get all bookings.                        | `verifyJWT`, `verifyAdmin` |
| DELETE | `/delete-booking/:bookingId`   | Delete a booking.                        | `verifyJWT`                |

---

## Class Schedule Routes

| Method | Endpoint                | Description                               | Authentication             |
| ------ | ----------------------- | ----------------------------------------- | -------------------------- |
| POST   | `/create-class`         | Create a new class schedule.              | `verifyJWT`, `verifyAdmin` |
| GET    | `/get-all-classes`      | Retrieve all class schedules.             | `verifyJWT`, `verifyAdmin` |
| GET    | `/get-single-class/:id` | Retrieve a specific class schedule by ID. | `verifyJWT`, `verifyAdmin` |
| PUT    | `/update-class/:id`     | Update a specific class schedule by ID.   | `verifyJWT`, `verifyAdmin` |
| DELETE | `/delete-class/:id`     | Delete a specific class schedule by ID.   | `verifyJWT`, `verifyAdmin` |

---

## Notes

- **Authentication**:
  - `verifyJWT`: Requires a valid JSON Web Token (JWT) to access the endpoint.
  - `verifyAdmin`: Requires admin role for access.
- Use tools like Postman or cURL to test these endpoints during development.

---

## Database Schema

### **Users**

```typescript
{
  id: string, // Primary Key
  fullName: string,
  email: string,
  phone: string,
  password: string,
  avatar: string,
  role: enum("admin", "trainer", "trainee")
}
```

### **ClassSchedule**

```typescript
{
  id: string, // Primary Key
  className: string,
  trainerId: ObjectId (reference to Users),
  schedule: date,
  duration: number (in minutes),
  maxCapacity: number
}
```

### **Bookings**

```typescript
{
  id: string, // Primary Key
  traineeId: ObjectId (reference to Users),
  classScheduleId: ObjectId (reference to ClassSchedule),
  bookingDate: date
}
```

---

## Admin Credentials

- **Email:** admin@gmail.com
- **Password:** admin123456

---

## Instructions to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dev-abdulkader/gym-scheduler-server
   cd gym-scheduler-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Set Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```env
PORT=8000
MONGO_URL=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d

CORS_ORIGIN=*

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

4. **Run the server:**

   ```bash
   npm run dev
   ```

5. **Test the API:**
   Use tools like Postman or curl to interact with the endpoints.

---

## Postman Documentation Link

- [Postman Url](https://documenter.getpostman.com/view/35184130/2sAYHxn4Eb#85d01253-2bda-470c-86de-dde2e3ea79ab)

## Live Hosting Link

- [Live Project](https://gym-scheduler-server.vercel.app/)

---
