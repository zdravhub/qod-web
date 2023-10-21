# qod-web
### Quote of the Day web front end

---

### Important

This fork is used for ___Kubernetes deployment___

For _OpenShift deployment_ use original repo at [https://github.com/dpkshetty/qod-web](https://github.com/dpkshetty/qod-web)

---

### Ports
This web service listens on port `8080`. Please set the service for this deployment to use port 8080, and to open any route or ingress to use this port too.

### Environment Variables
This deployment requires a single environment variable to access the qod-api deployment:
* __QOD_API_URL__ - the URL of the API service for the Quote of the Day application, usually 'http://' or 'https://' then the name of the service and the port (ie `http://qod-api:8080`) - DO NOT USE trailing slash at the end (ie `http://qod-api:8080/`).

### Notes
* Works with [quay.io/zzdravkov/qod-web](https://quay.io/repository/zzdravkov/qod-web) image

