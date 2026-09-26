# Project Overview

## 1. System Objectives

The Sew’sEra system aims to provide a centralized digital marketplace that connects customers with independent tailors and small tailoring shops. It will make it easier for customers to find nearby tailors, compare services and prices, check availability, book appointments, and track their orders. It also aims to improve the visibility and booking opportunities of local tailors.

## 2. Proposed Scope

The system will allow customers to browse tailor profiles, compare services and prices, locate nearby tailors using GPS mapping, check availability, book appointments, communicate through in-app chat, and track order progress. Tailors will be able to showcase their services, manage appointments, and receive customer bookings. The initial MVP will focus on search, booking, profile browsing, and order tracking, while full payment integration and advanced analytics will not be included in the early stage.

### Modules/Systems to Integrate

- User Account / Login System
- Tailor Marketplace / Search System
- Tailor Profile Management
- Availability / Schedule Management
- Booking / Appointment System
- GPS / Map Integration
- Order Tracking Module
- Chat/Messaging Module
- Notification System

### In-Scope Features

- Tailor Search
- GPS-Enabled Tailor Location
- Tailor Profile Browsing
- GPS-Enabled Tailor Location
- Availability Checking
- Booking Management
- Order Status Tracking
- In-App Chat (Basic)
- Booking Notifications

### Out-of-Scope

- Full Payment Integration
- Advanced Analytics
- Full Messaging Infrastructure
- Loyalty & Customer Retention Services
- Enterprise Partnerships / Uniform Supplier Integration

### Database
- MySQL
- Database Design / ERD
- User, Tailor, Service, Availability, Booking, and Order tables
- Data validation and integrity

## 3. Stakeholders

- Customers
- Independent Tailors
- Small Tailoring Shops / Alteration Businesses
- Staff

## 4. Tools & Technologies

### Languages/Frameworks
- Node.js + Express (Backend REST API)
- JavaScript (Programming Language)
- HTML/CSS (Frontend for MVP)

### Integration Approach
- REST API
- Message Queue (Middleware)
- WebSocket (Messaging)

### Repository/Services
- GitHub
- Git

### Testing Tools
- Jest (Unit Testing)
- Postman (API Testing)

### Database
- MySQL
- ERD (Entity Relationship Diagram)

  ### Order Management
- Create order after confirmed booking
- Order status tracking
- Update order status
- Customer order history
- Tailor order management

Order Status:
Pending → Confirmed → In Progress → Ready → Completed


### Notification System
- Booking confirmation
- Booking reminder
- Booking cancellation notification
- Order status updates
- Availability/appointment notifications

  ### GPS / Map Integration
- Browser/device geolocation
- Map display
- Tailor location markers
- Distance-based tailor search
- Location permission handling

## 5. Integration Pattern & Rationale

The Sew’sEra system will use a REST API integration pattern to allow its core modules to communicate through HTTP requests and JSON responses. The REST API will provide endpoints for retrieving and adding customer and order records. REST was selected because it uses standard HTTP methods, is simple to implement using Node.js and Express, and can be tested using Postman. This approach provides a simple communication layer between the system modules.

**Rationale:**
- **Centralized Communication:** Ang Hub ay nagbibigay ng single point of integration, na nagpapadali sa maintenance at monitoring.
- **Loose Coupling:** Binabawasan ang direct dependencies sa pagitan ng modules, kaya mas madaling i-update o palitan ang isang module nang hindi naaapektuhan ang iba.
- **Scalability:** Madaling magdagdag ng bagong modules o external services sa pamamagitan ng pagkonekta sa Hub.
- **Security:** Ang lahat ng authentication at authorization ay dumadaan sa Hub, na nagbibigay ng consistent security layer.
- **Testability:** Ang REST API endpoints ay madaling i-test gamit ang Postman.

