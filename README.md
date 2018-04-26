# graphql-optics

[![CircleCI](https://circleci.com/gh/kiwicom/graphql-optics.svg?style=svg)](https://circleci.com/gh/kiwicom/graphql-optics)

Tracing library and analyitcs dashboard for GraphQL. Engineered as an extensible replacement for ApolloEnging.

## Getting started

#### Elasticsearch

If you don't have an elasticsearch instance you can use for staging, try the [zero-configuration Docker image](https://www.docker.elastic.co/). The default settings there match the default configuration in the dashboard app and tracer package.

#### Tracing data

Follow the installation and usage instructions in the [graphql-optics-tracing](packages/tracer) package. Then send some requests to your graphql server, perhaps using the [graphiql IDE](https://github.com/graphql/graphiql).

## Launching the dashboard

Configure your app in `src/config.json`. If you're using [graphql-optics-tracing](packages/tracer), these should match the options you pass to [logEntry](packages/tracer#logentry).

Install dependencies and launch the app.

```
yarn install
yarn dev
```

## Packages

[graphql-optics-tracing](packages/tracer)
