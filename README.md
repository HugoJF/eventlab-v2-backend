## Introduction

`eventlab-v2-backend` is the backend project for `eventlab-v2`, a *realish* hello-world project written in NestJS. It supports Amazon ECS and Lambda with a fully automated deployment pipeline.

## Features
- **AWS Lambda ready**: buildspec-serverless.yml tests, builds and packages the deployment CloudFormation template;
- **AWS ECS ready**: buildspec.yml builds and publishes images used in ECS to ECR;
- **Serverless framework ready**: for both deployment and/or offline development;
- Ready to use Docker image;
- Dockerized NestJS E2E testing;
- JWT authentication;
- Custom validation decorators.

## What is this

Full documentation on what this project is supposed to be can be found [here](https://github.com/HugoJF/eventlab-v2).