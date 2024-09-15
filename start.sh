#!/bin/bash
npm i -g pnpm
# Apply migrations
pnpm run migration:run

# Start the application
exec node dist/main
