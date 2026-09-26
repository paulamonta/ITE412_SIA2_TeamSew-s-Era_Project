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

  ## 6. High-Level System Overview

### Major Modules/Subsystems

| Module Name | Function/Responsibility |
| :--- | :--- |
| **Customer Module** | Handle customer registration, profile management, browsing tailor profiles, comparing services/prices, and booking appointments. |
| **Tailor Module** | Allow tailors to showcase services, manage appointments, update availability, and receive customer bookings. |
| **Booking Module** | Manage appointment scheduling, confirmation, cancellation, and notifications. |
| **Order Tracking Module** | Track order progress and provide real-time status updates to customers. |
| **Chat/Messaging Module** | Enable in-app communication between customers and tailors. |
| **Central Hub (API Gateway)** | Route all communication, handle authentication, manage message queuing, and provide a single integration point. |
| **Central Database** | Store persistent data including user accounts, tailor profiles, bookings, orders, and messages. |

### External Systems/Interfaces

- **GPS/Map API** – Para sa distance-based tailor search at location mapping.
- **Push Notification Service** – Para sa booking confirmations, reminders, at order status updates.
- **MySQL Database** – Central data storage para sa lahat ng modules.

### Data Flow Summary

Sa Sew’sEra system, ang lahat ng communication sa pagitan ng modules ay dumadaan sa isang **Central Hub (API Gateway)**. Kapag ang isang customer ay nag-browse ng tailor profiles o nag-book ng appointment, ang **Customer Module** ay nagpapadala ng request sa Hub sa pamamagitan ng REST API. Ang Hub ay nag-ruroute ng request sa appropriate module, tulad ng **Booking Module**, na nagpo-proseso ng appointment at nag-iimbak ng detalye sa **Central Database**.

Kapag ang booking ay confirmed, ang Hub ay nagpapasa ng confirmation sa **Tailor Module** para makita at ma-manage ng tailor ang appointment. Ang **Order Tracking Module** ay tumatanggap ng status updates mula sa Tailor Module sa pamamagitan ng Hub at nagpapadala ng progress notifications pabalik sa Customer Module. Samantala, ang **Chat/Messaging Module** ay humahawak ng real-time communication sa pagitan ng customers at tailors, kung saan ang mga messages ay niruroute sa Hub at iniimbak sa Central Database.

Ang **GPS/Map API** ay isang external service na konektado sa Hub. Kapag ang customer ay nag-search ng malapit na tailor, ang Customer Module ay nagpapadala ng location data sa Hub, na siyang kumokonekta sa GPS API para sa distance-based search. Ang resulta ay ibinabalik sa Customer Module.

Ang **Push Notification Service** ay isa pang external service na ginagamit ng Hub para magpadala ng notifications sa customers at tailors. Ang lahat ng notifications ay dumadaan sa Hub bago maipadala sa tamang recipient.

---

## 7. Messaging Workflow

Ang Sew’sEra system ay gumagamit ng **message queue** para sa asynchronous communication sa pagitan ng **Booking Module** (Producer) at **Tailor/Approval Module** (Consumer). Kapag ang isang customer ay nag-book ng appointment, ang Booking Module ay nagpapadala ng mensahe sa queue na naglalaman ng booking details (customer name, tailor name, service, date, time).

Ang Consumer (Tailor Module) ay nagpo-proseso ng mga mensahe mula sa queue nang asynchronous. Halimbawa, kung ang booking ay para sa isang available na slot, ito ay awtomatikong na-a-approve. Kung hindi available, ito ay ire-reject at magpapadala ng notification pabalik sa customer.

