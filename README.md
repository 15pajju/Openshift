# Simple Voting App

A basic voting application built with Node.js, Express, and React. This application allows users to vote on two options and see the results in real-time.

## Features
- Two voting options
- Real-time vote count and percentage display
- Responsive design

## Technology Stack
- Backend: Node.js with Express
- Frontend: React
- Containerization: Docker

## Prerequisites
- Node.js (v14+)
- npm (v6+)
- Docker (for containerization)

## Local Development

1. Clone the repository:
```
git clone https://github.com/YOUR_USERNAME/voting-app.git
cd voting-app
```

2. Install dependencies:
```
npm install
cd client && npm install && cd ..
```

3. Run the development server:
```
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

1. Build the React client:
```
cd client && npm run build
```

2. Start the production server:
```
npm start
```

## Docker Deployment

1. Build the Docker image:
```
docker build -t voting-app .
```

2. Run the container:
```
docker run -p 8080:8080 voting-app
```

3. Access the application at `http://localhost:8080`

## Deploying to OpenShift

1. Login to OpenShift:
```
oc login <your-openshift-url>
```

2. Create a new project (if needed):
```
oc new-project voting-app
```

3. Create a new application from your GitHub repository:
```
oc new-app https://github.com/YOUR_USERNAME/voting-app.git
```

4. Expose the service to create a route:
```
oc expose service voting-app
```

5. Get the route URL:
```
oc get route voting-app
```

## License
MIT # voting-app
# voting-app
