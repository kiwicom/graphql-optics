# graphql-optics-tracer

[![CircleCI](https://circleci.com/gh/kiwicom/graphql-optics.svg?style=svg)](https://circleci.com/gh/kiwicom/graphql-optics)

Tracing library for GraphQL. Designed to work with graphql-express and apollo-tracing, but generic enough to use with other graphql servers and tracing packages.

## Usage with `graphql-express` and `apollo-tracing`

Install the package

```
yarn add graphql-optics-tracer
```

In the module where you instantiate and assign the graphqlHTTP middleware:

```javascript
import { formatEntry, logEntry } from 'graphql-optics-tracer'
import schema from './yourGraphQLSchema'
import {
  TraceCollector,
  instrumentSchemaForTracing,
  formatTraceData,
} from 'apollo-tracing'

app.use('/', (request, response) => {
  // start the timer
  const traceCollector = new TraceCollector()
  traceCollector.requestDidStart()

  graphqlHTTP((req, res, params) => ({
    schema: instrumentSchemaForTracing(schema),
    extensions: req => {
      traceCollector.requestDidEnd()
      const definitions = req.document.definitions
      const graphql = graphQLParams.query
      const metrics = formatTraceData(traceCollector)
      const entry = formatEntry({ request: { definitions, graphql }, metrics })
      logEntry({ entry })
      return {}
    },
  }))(request, response)
})
```

## API

#### formatEntry

Formats a graphQL query for logging.

##### Arguments: ({ request, metrics })

_request_

```
{
  definitions,  // from express-graphql
  graphql       // raw graphQL query as string
}
```

_metrics_  
Object in apollo-tracing format.  
Ex: return value of apolloTracing.formatTraceData.

Returns an object to be passed to logEntry

#### logEntry

Sends entry data to ElasticSearch for indexing

##### Arguments: ({ entry, options })

_entry_ (required)  
Return value of formatEntry

_options_  
ElasticSearch options.

Defaults:

```
{
  elasticIndex: 'graphql',
  elasticClient: {
    host: 'localhost:9200',
    log: 'trace',
  },
}
```

## Configuring elastic mappings

Before constructing the aggregations, you will need to run the following against your elasticsearch instance. If necessary, replace `graphql` with the name of the index you will use in your app.

```
PUT graphql
{}

PUT graphql/_mapping/graphql
{
  "properties": {
    "rootQuery": {
      "type": "keyword",
      "index": true
    }
  }
}
```
