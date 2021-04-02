# Golang+Gin+React

## Overview
This is a template project to use golang with gin and react as monolith application easier for Full Stack Developer. Don't need to deploy frontend and backend as separate service, gin will serve static content from React either it is on development (with hot reload) or production.

## Main Tech Stack
### Backend
1. [Golang](https://golang.org/) -> Programming Language
2. [Gin Gonic](https://github.com/gin-gonic) -> Backend framework

### Frontend
1. [React](https://reactjs.org/) -> Frontend library
2. [Webpack](https://webpack.js.org/) -> Module bundler

## Prerequesites
1. Golang v1.16
2. Node Js v14

## Getting Started
1. Clone the repository from Github
2. Add `.env` file in root directory of this project
```The template for `.env` file can be found at `.env.example`.```
3. Install backend and frontend dependencies, use
```make init```
4. Or if you want to install backend dependencies only, use ```make init-server```
5. And if you want to install frontend dependencies only, use ```make init-client```

## Local Development (Hot Reload)
Both backend and frontend will served by hot reload, so when change the code and then save file, backend or frontend will restart automatically.
1. To run backend only, open new terminal and run ```fresh``` at root folder
2. To run frontend and backend concurrently, open terminal and run ```make run``` at root folder

It will run on `localhost:3000` for the frontend, and `localhost:3000/api/v1` for the backend, it depends on what port was set in the ENV

## Staging & Production Build
1. Build the frontend and backend by ```make build```
2. Run the build version inside `bin` folder
```./bin/app```

## Important Notes
1. Use `HashRoutes` from `react-router-dom` to avoid conflicted route between react router and gin router
2. To make client can read the ENV value, you need to add that into `client/config/webpack.config.js`
```
new webpack.DefinePlugin({
    'process.env.APPLICATION_SERVER': JSON.stringify(process.env.APPLICATION_SERVER),
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    'process.env.YOUR_ENV_VALUE_TO_BE_READ': JSON.stringify(process.env.YOUR_ENV_VALUE),
  }),
```
