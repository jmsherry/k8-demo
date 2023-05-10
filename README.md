# Kubernetes Demo (Prep)

You will need to create a few different images of the app in the `app` directory. To do so, make an inital image:

```shell
docker build -t basic-node-server:0.0.1 ./app
```

then, make a small but obvious change (like background/foreground colour in the CSS), and repeat (bumping the version number)

```shell
docker build -t basic-node-server:0.0.2 ./app
```

3 different version should do. This just represents you making changes to your app.
