# web-scraper

### Challenge for Koombea

This project follows a hexagonal architecture (also known as Clean Architecture) to create a modular, scalable, and maintainable software application.

## Project Structure

### Folders

- **application**: This folder contains the application initiazilation.

- **domain**: In this folder, domain models and interfaces for ports (gateways) that allow interaction with the outside world are defined.

  - **models**: Classes representing domain entities and objects. These classes encapsulate business logic. In this case, the models are Pages and Users

  - **models/gateways**: Gateways are interfaces that define how interaction with other elements like databases, web services, or other data sources occurs.

- **infrastructure**: This folder houses concrete gateway implementations and adapters for interacting with infrastructure and other systems. It also includes entry-layer controllers.

  - **driven-adapters**: Concrete implementations of gateways connecting to databases or other data storage systems can be found here.

  - **entry-points**: Controllers and user interfaces for the entry layer reside here. These controllers handle incoming requests and send responses.

## Project setup

### Installation steps

- Clone the repository

```bash
git clone https://github.com/facuhrodriguez/web-scraper
```

- Navigate to Project Directory

```bash
cd web-scraper
```

- Install Dependencies

```bash
npm install
```

- Environment Configuration
  Create a .env file in the project root and configure environment variables:

```
PORT=3200

MONGO_URI_DEVELOPMENT=mongodb://127.0.0.1:27017/web-scrapper

JWT_SECRET=

```

- Start the application using Docker Compose:

```bash
docker-compose up -d
```

## API Endpoints

### Register User

- POST /api/v1/users/register
  Request Body:

```json
{
  "username": "example",
  "password": "yourpassword"
}
```

### User login

- POST /api/v1/users/login
  Request Body:

```json
{
  "username": "example",
  "password": "yourpassword"
}
```

### Web scrap

- POST /api/v1/pages/web-scraper
  Request Body:

```json
{
  "link": "https://www.facebook.com",
  "name": "Google"
}
```

### Get page

- GET /api/v1/pages/:pageId

### Get user pages

- GET /api/v1/pages
