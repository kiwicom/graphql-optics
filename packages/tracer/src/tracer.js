// @flow
import elastic from 'elasticsearch'
import deepmerge from 'deepmerge'
import uuid from 'uuid/v4'

const defaultOptions = {
  elasticIndex: 'graphql',
  elasticClient: {
    host: 'localhost:9200',
    log: 'trace',
  },
}

export function formatEntry({
  request,
  metrics,
}: {
  request: Object,
  metrics: Object,
}) {
  const metricsConv = { ...metrics }
  metricsConv.execution.resolvers = metricsConv.execution.resolvers.map(
    res => ({
      ...res,
      path: res.path.map(p => p.toString()),
    }),
  )
  return {
    rootQuery: request.definitions[0].selectionSet.selections[0].name.value,
    graphql: request.graphql,
    metrics: metricsConv,
  }
}

export function logEntry({
  entry,
  options,
}: {
  entry: Object,
  options: Object,
} = {}) {
  if (!entry || typeof entry !== 'object') {
    throw new Error(
      'entry must be an object of shape { rootQuery, graphql, metrics }',
    )
  }
  const _options = options ? deepmerge(defaultOptions, options) : defaultOptions
  const elasticClient = new elastic.Client({ ..._options.elasticClient })
  elasticClient.create({
    index: _options.elasticIndex,
    type: 'graphql',
    id: uuid(),
    body: entry,
  })
}
