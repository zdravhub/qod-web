# qod-web

Quote of the Day web front end

### Ports
This web service listens on port `3001`. Please set the service for this deployment to use port 3001, and to open any route or ingress to use this port too.

### Environment Variables
This deployment requires a single environment variable to access the qod-api deployment:
- **QOD_API_URL** - the URL of the API service for the Quote of the Day application, usually 'http://' then the name of the service and the port (ie `http://qod-api:3000`)
