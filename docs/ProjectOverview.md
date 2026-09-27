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
- User, Tailor, Service, Availability, Booking, and Order Tables
- Data Validation and Integrity

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

**Order Status:**

`Pending → Confirmed → In Progress → Ready → Completed`

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

### Rationale

- **Centralized Communication:** The Hub provides a single point of integration, making maintenance and monitoring easier.
- **Loose Coupling:** It reduces direct dependencies between modules, making it easier to update or replace one module without affecting the others.
- **Scalability:** New modules or external services can be easily added by connecting them to the Hub.
- **Security:** All authentication and authorization pass through the Hub, providing a consistent security layer.
- **Testability:** REST API endpoints can be easily tested using Postman.

## 6. High-Level System Overview

### Major Modules/Subsystems

**Customer Module**  
Handles customer registration, profile management, browsing tailor profiles, comparing services and prices, and booking appointments.

**Tailor Module**  
Allows tailors to showcase their services, manage appointments, update availability, and receive customer bookings.

**Booking Module**  
Manages appointment scheduling, confirmation, cancellation, and notifications.

**Order Tracking Module**  
Tracks order progress and provides real-time status updates to customers.

**Chat/Messaging Module**  
Enables in-app communication between customers and tailors.

**Central Hub (API Gateway)**  
Routes all communication, handles authentication, manages message queuing, and provides a single integration point.

**Central Database**  
Stores persistent data, including user accounts, tailor profiles, bookings, orders, and messages.

### External Systems/Interfaces

- **GPS/Map API** – Used for distance-based tailor search and location mapping.
- **Push Notification Service** – Used for booking confirmations, reminders, and order status updates.
- **MySQL Database** – Provides central data storage for all modules.

### Data Flow Summary

In the Sew’sEra system, all communication between modules passes through the **Central Hub (API Gateway)**. When a customer browses tailor profiles or books an appointment, the **Customer Module** sends a request to the Hub through the REST API. The Hub routes the request to the appropriate module, such as the **Booking Module**, which processes the appointment and stores the details in the **Central Database**.

When a booking is confirmed, the Hub forwards the confirmation to the **Tailor Module** so that the tailor can view and manage the appointment. The **Order Tracking Module** receives status updates from the Tailor Module through the Hub and sends progress notifications back to the Customer Module. Meanwhile, the **Chat/Messaging Module** handles real-time communication between customers and tailors, with messages routed through the Hub and stored in the Central Database.

The **GPS/Map API** is an external service connected to the Hub. When a customer searches for a nearby tailor, the Customer Module sends location data to the Hub, which connects to the GPS API for distance-based search. The results are then returned to the Customer Module.

The **Push Notification Service** is another external service used by the Hub to send notifications to customers and tailors. All notifications pass through the Hub before being delivered to the appropriate recipient.

---

## 7. Messaging Workflow

The Sew’sEra system uses a **message queue** for asynchronous communication between the **Booking Module** (Producer) and the **Tailor/Approval Module** (Consumer). When a customer books an appointment, the Booking Module sends a message to the queue containing the booking details, including the customer name, tailor name, service, date, and time.

The Consumer (**Tailor Module**) processes messages from the queue asynchronously. For example, if the booking is for an available slot, it is automatically approved. If the slot is unavailable, the booking is rejected and a notification is sent back to the customer.
