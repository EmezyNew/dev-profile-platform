
#!/bin/bash

echo "Starting Developer Portfolio Platform..."

# Check if MongoDB is running
echo "Checking MongoDB status..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "MongoDB is not running. Starting MongoDB..."
    mongod --fork --logpath /tmp/mongodb.log
    echo "MongoDB started."
else
    echo "MongoDB is already running."
fi

# Start backend in background
echo "Starting backend server..."
cd backend
go run main.go &
BACKEND_PID=$!
cd ..

# Start frontend
echo "Starting frontend server..."
cd frontend
npm run dev

# When frontend is stopped, stop backend too
kill $BACKEND_PID
echo "Servers shut down."
