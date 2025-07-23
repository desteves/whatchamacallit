# Movie Search App (Vue/Vite + Express + MongoDB)

## Prerequisites
- Docker
- Node.js (for local dev)

## 1. Start MongoDB with Docker

```
cd ../mongo
# Start MongoDB
docker compose up -d
```

## 2. Import the mflix sample dataset

1. Download the dataset:
   https://github.com/mongodb/docs-assets/blob/primer-dataset/dataset/mflix.zip
2. Unzip it. Inside you'll find `movies.json`.
3. Import into MongoDB:
   ```
   mongoimport --uri "mongodb://root:password@localhost:27017/mflix?authSource=admin" --collection movies --file movies.json --jsonArray
   ```

## 3. Start the backend

```
cd ../backend
npm install
npm start
```

Or with Docker:
```
docker build -t movie-backend .
docker run --rm -p 3001:3001 --network=host movie-backend
```

## 4. Start the frontend

```
cd ../frontend
npm install
npm run dev
```

Or build and run with Docker:
```
docker build -t movie-frontend .
docker run --rm -p 8080:80 movie-frontend
```

## 5. Usage
- Open http://localhost:5173 (dev) or http://localhost:8080 (Docker)
- Search for a movie title and see results as cards.
