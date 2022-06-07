# qod-web

Quote of the Day web front end

### Ports
This web service listens on port `8080`. Please set the service for this deployment to use port 8080, and to open any route or ingress to use this port too. This is the default for deployments through OpenShift.

### Environment Variables
This deployment requires a single environment variable to access the qod-api deployment:
- **QOD_API_URL** - the URL of the API service for the Quote of the Day application, usually 'http://' or 'https://' then the name of the service and the port (ie `http://qod-api:8080`) - DO NOT USE trailing slash at the end (ie `http://qod-api:8080/`). Typically, in case of OpenShift this URL will be the route URL of the QOD API service.
