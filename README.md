UIME Medical Center – Tenant Management Portal

Capstone Project – Full Stack Web Application
Author: Jonathan Zarazua
Program: Software Development
Tech Stack: React · Node.js · Express · Sequelize · MySQL · JWT Authentication

Project Overview

The UIME Medical Center Tenant Management Portal is a full-stack web application designed to modernize how a medical center manages tenant communication, leases, and administrative announcements.

The primary goal of this project is to replace fragmented, one-on-one communication and paper-based tracking with a secure, role-based digital portal for administrators and tenants.


Problem Statement

Before this system, the medical center relied on:

One-on-one communication via phone or messaging

Manual lease and tenant tracking

Limited payment visibility

Paper-based records later transferred to digital systems

This approach was inefficient, error-prone, and difficult to scale.

Phase 1 – Implemented Features (Current Version)
Authentication & Security

JWT + HTTP-only cookie authentication

Role-based access control (Admin / Tenant)

Protected routes on both frontend and backend

Forced password change support


Admin Dashboard

Admin overview dashboard with system statistics

Create and manage tenants

Create and manage leases

Post global announcements visible to all tenants

Secure logout

Tenant Dashboard

Personalized tenant dashboard

Welcome message with tenant name

Lease information display (if assigned)

View admin announcements

Direct messaging interface (tenant → admin communication)

Secure logout

Announcements System

Admins can create announcements

Announcements stored in database

Visible in real-time to all tenants

Timestamped and ordered by most recent

Database Design

Relational MySQL database

Sequelize ORM with migrations

Core models:

Users

Tenants

Leases

Announcements

Foreign key relationships enforced


Phase 2 – Planned Features (Future Work)

The following features were intentionally scoped out of Phase 1 to ensure stability and quality:

Payment processing & history

Invoicing system

Maintenance request workflows

Staff management module

Financial reporting & analytics

Notifications system

These features will be implemented in Phase 2 as the project continues to evolve.

Technical Decisions & Trade-offs

During development, the complexity of implementing secure payment processing alongside authentication, announcements, and tenant management was underestimated.

To maintain code quality and meet project deadlines:

Feature scope was reduced

Core tenant–admin communication was prioritized

Payments were deferred to Phase 2

Tech Stack
Frontend

React

React Router

Axios

Custom CSS

Backend

Node.js

Express

Sequelize ORM

MySQL

JWT Authentication

Cookie-based sessions

Installation & Setup

Prerequisites

Node.js

MySQL

npm

cd server
npm install
npm run migrate
npm run seed
npm run dev

Create a .env file in /server with:
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret