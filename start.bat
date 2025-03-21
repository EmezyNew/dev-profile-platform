
@echo off
echo Starting Developer Portfolio Platform...

echo Starting backend server...
start cmd /k "cd backend && go run main.go"

echo Starting frontend server...
start cmd /k "cd frontend && npm run dev"

echo Both servers are now running.
echo Press Ctrl+C in each terminal window to stop the servers when done.
