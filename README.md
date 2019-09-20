# RHTE 2019 RHMI Hackathon Node.js API Server

Fork this repository to use it as a starting point for your Parking Meters and
Junction Traffic API.

## Running on OpenShift via Nodeshift
To use this method of deployment you'll need:

* Node.js v10 or later
* An OpenShift instance
* An `openapi-spec.json` file

Nodeshift is a neat CLI that simplifies deployment of Node.js applications on
OpenShift. This project incldues Nodeshift in `devDependencies` so you can
simply run the following to deploy it on an OpenShift instance:

```
$ git clone git@github.com:evanshortiss/https://github.com/evanshortiss/rhte-2019-hackathon-on-rhmi-nodejs-api-server-template.git node-js-api

$ cd node-js-api

# Ensure you are logged into your openshift instance
$ oc login

# Choose the project you'd like to deploy this application into
# Use "oc projects" to list available projects
$ oc project $YOUR_PROJECT

# Add your openapi-spec to the repository
cp $PATH_TO_SPEC ./openapi-spec.json

# Build and deploy on OpenShift
$ npm run nodeshift
```

## Running Locally without Docker
To run this application locally you'll need:

* Node.js v10 or later
* npm v6 or later
* Git

Exectute the following commands to start the program locally after cloning it:

```
$ npm install
$ npm start
```

If you're developing locally you automated code watching and reloading via:

```
npm run start-dev
```

## Running Locally using Docker and s2i
To perform the following steps you'll need:

* [Docker](https://docs.docker.com/release-notes/) (v17.x tested)
* [s2i](https://github.com/openshift/source-to-image/releases) (v1.1.7 tested)

With both tools installed you can execute the following commands to run your
application locally in an environment that matches that it will use when
deployed on  OpenShift Online.

```
# Build the latest local commit into a container image
# If you have uncommitted changes add the "--copy" flag
$ s2i build . registry.access.redhat.com/rhscl/nodejs-10-rhel7 nodejs-api-server

# Run our container image
$ docker run -p 8080:8080 -dit --name nodejs-api-server nodejs-api-server
```

This instructs `s2i` to build our source code into an image that will be tagged
as "nodejs-api-server". The base image used the official Red Hat Node.js v10 image.
Once the build is complete we run it using Docker and expose its port 8080 to
our local port 8080.
