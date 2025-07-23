# Whatchamacallit

A movie recommendation chat bot powered by MongoDB and DigitalOcean

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- Docker and Docker Compose (for running MongoDB in a container)

### Installation

1. Clone the repository

2. Start MongoDB using Docker:
   ```bash
   # From the project root directory
   cd mongo
   docker-compose up -d
   ```
   This will start a MongoDB container with:
   - Port 27017 exposed on localhost
   - Data persisted in `$PWD/.mdb/`

3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

### Database Initialization

After starting the MongoDB container, you can import sample data (if available) using:
```bash
docker exec -i mongodb mongoimport --uri "mongodb://root:password@localhost:27017/sample_mflix?authSource=admin" --collection embedded_movies --jsonArray < path/to/sample_data.json
```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend && npm install && npm start
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd frontend && npm install && npm run dev
   ```

