#!/bin/bash

# Check if we're in an Nx workspace
if [ ! -f "nx.json" ]; then
    echo "Error: This script must be run from the root of an Nx workspace"
    exit 1
fi

echo "Building and deploying Nx monorepo production containers..."

# Build containers
docker-compose -f docker-compose.prod.yml build

echo "Starting production services..."
docker-compose -f docker-compose.prod.yml up -d

echo "Production deployment completed!"
echo "Backend API: http://localhost:3000"
echo "Frontend App: http://localhost:80"
echo "Health check: http://localhost:3000/api/health"

# Show logs
echo "Showing logs (Ctrl+C to exit)..."
docker-compose -f docker-compose.prod.yml logs -f
