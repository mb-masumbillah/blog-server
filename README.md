# Blog Platform API

## Overview

The Blog Platform API is a backend service designed for a blogging platform where users can create, update, and delete their blogs. The system supports two user roles: Admin and User, each with distinct permissions. The API includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Features

- **User Roles**:

  - **Admin**: Manages users and blogs, can block users and delete any blog.
  - **User**: Can register, log in, and manage their own blogs.

- **Authentication & Authorization**:

  - Secure user authentication using JWT tokens.
  - Role-based access control to differentiate between Admin and User actions.

- **Blog Management**:
  - Create, update, and delete blogs.
  - Public API for fetching blogs with search, sorting, and filtering options.

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## API Endpoints

### Authentication

- **Register User**
  - `POST /api/auth/register`
- **Login User**
  - `POST /api/auth/login`

### Blog Management

- **Create Blog**
  - `POST /api/blogs`
- **Update Blog**
  - `PATCH /api/blogs/:id`
- **Delete Blog**
  - `DELETE /api/blogs/:id`
- **Get All Blogs (Public)**
  - `GET /api/blogs`

### Admin Actions

- **Block User**
  - `PATCH /api/admin/users/:userId/block`
- **Delete Blog**
  - `DELETE /api/admin/blogs/:id`

## Error Handling

The API provides structured error responses to ensure meaningful feedback for users and developers. Common error types include:

- Validation Errors
- Not Found Errors
- Authentication Errors
- Authorization Errors
- Internal Server Errors

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Admin login crediential

```json
{
  "email": "admin@gmail.com",
  "password": "securepassword"
}
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/b4-assignment-3.git
   cd b4-assignment-3
   ```