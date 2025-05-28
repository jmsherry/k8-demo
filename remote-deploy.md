1. Do the following to build docker:
```shell
docker build -t basic-node-server:0.0.17 ./app # build locally
docker tag basic-node-server:0.0.17 jmsherry/basic-node-server:0.0.17 #tag for dockerhub (use your username, not jmsherry, if you don't want my files!)
docker login # auth before push
docker push basic-node-server:0.0.17 # push
```
2. register with Google Cloud
3. register with GKE (Google Kubernetes Engine) API
4. Create cluster (and fleet) - just accept the defaults
5. Set up gcloud CLI:

```shell
gcloud auth login # gke login
gcloud components update # update your CLI components to the latest
gcloud projects list # list your projects
gcloud config set project kube-demo-310004 # pick one
gcloud container clusters get-credentials autopilot-cluster-1 --region us-central1 --project kube-demo-310004 # get creds (and sets context in docker desktop K8)
```
6. Set the following as your deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: basic-server
  # namespace: demo
  labels:
    app: web
spec:
  replicas: 3
  strategy:
    type: RollingUpdate # default is RollingUpdate
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: front-end
          image: jmsherry/basic-node-server:0.0.17
          # image: basic-node-server:0.0.2
          imagePullPolicy: Always 
          # ^^ For remote deploy
          ports:
            - containerPort: 3000  # <--- THIS...
          resources:
            # You must specify requests for CPU to autoscale
            # based on CPU utilization
            requests:
              cpu: "250m"
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"
      # imagePullSecrets:
      #   - name: regcred

```
7. Select the context from your docker desktop 
8. `k apply -f deployment.yml` (presuming k has been set as an alias for `kubernetes`)
9. Set the following for your service (`gke-service.yml):

```yaml
---
apiVersion: "v1"
kind: "Service"
metadata:
  name: "basic-server-service"
  # namespace: "demo"
  labels:
    app: "web"
spec:
  ports:
  - protocol: "TCP"
    port: 60000 # <-- Final external port on the cluster
    targetPort: 3000 # <--- MUST MATCH THIS
  selector:
    app: "web"
  type: "LoadBalancer"
  loadBalancerIP: ""

```
10. Create the service `k apply -f gke-service.yml` (or use dashboard buttons)
11. Go to the service and go to the external IP link for the load-balancer
12. Enjoy.