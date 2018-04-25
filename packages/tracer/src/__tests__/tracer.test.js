/* eslint-disable import/no-dynamic-require */

import fs from 'fs'
import path from 'path'
import { formatEntry, logEntry } from '../tracer'

const loadQuery = fname => ({
  query: fs.readFileSync(path.join(__dirname, fname)).toString(),
})

jest.mock('elasticsearch', () => {
  const elasticCreate = jest.fn()
  const elasticClient = jest.fn()

  return {
    Client: function(options) {
      elasticClient(options)
      return {
        create: elasticCreate,
      }
    },
    _client: elasticClient,
    _create: elasticCreate,
  }
})

jest.mock('uuid/v4', () => () => 'uuid/v4')

afterEach(() => {
  jest.resetAllMocks()
})

const formatTests = [
  {
    name: 'formats allFlights query',
    fixture: 'allFlights',
    rootQuery: 'allFlights',
  },
  {
    name: 'formats allLocations query',
    fixture: 'allLocations',
    rootQuery: 'allLocations',
  },
]

describe('formatEntry', () => {
  formatTests.forEach(test => {
    const graphql = loadQuery(
      `./fixtures/${test.fixture}/${test.fixture}_graphql.txt`,
    )
    const spec = {
      input: {
        request: {
          definitions: require(`./fixtures/${test.fixture}/${
            test.fixture
          }_defs.json`),
          graphql,
        },
        metrics: require(`./fixtures/${test.fixture}/${
          test.fixture
        }_metrics.json`),
      },
      output: {
        rootQuery: test.rootQuery,
        graphql,
        metrics: require(`./fixtures/${test.fixture}/${
          test.fixture
        }_metrics.json`),
      },
    }
    it(test.name, () => {
      const entry = formatEntry(spec.input)
      expect(entry).toEqual(spec.output)
    })
  })
})

describe('logEntry', () => {
  const definitions = require(`./fixtures/allFlights/allFlights_defs.json`)
  const graphql = loadQuery(`./fixtures/allFlights/allFlights_graphql.txt`)
  const metrics = require(`./fixtures/allFlights/allFlights_metrics.json`)
  const entry = formatEntry({ request: { definitions, graphql }, metrics })

  it('calls elastic.Client with default options', async () => {
    const elasticClient = require.requireMock('elasticsearch')._client

    const elasticOptions = { host: 'localhost:9200', log: 'trace' }
    logEntry({ entry })

    expect(elasticClient).toHaveBeenCalledWith(elasticOptions)
  })

  it('calls elastic.Client with options object', async () => {
    const elasticClient = require.requireMock('elasticsearch')._client

    const elasticOptions = { host: '192.168.4.2:9500', log: 'foo' }
    const options = { elasticClient: elasticOptions }
    logEntry({ entry, options })

    expect(elasticClient).toHaveBeenCalledWith(options.elasticClient)
  })

  it('calls elastic.create', async () => {
    const elasticCreate = require.requireMock('elasticsearch')._create
    logEntry({ entry })
    expect(elasticCreate).toHaveBeenCalled()
  })

  it('throws an error if no entry is defined', async () => {
    expect(() => logEntry()).toThrow()
  })

  it('calls elastic.create with default options', async () => {
    const elasticCreate = require.requireMock('elasticsearch')._create
    const uuid = require.requireMock('uuid/v4')
    logEntry({ entry })
    expect(elasticCreate).toHaveBeenCalledWith({
      id: uuid(),
      index: 'graphql',
      body: expect.anything(),
      type: 'graphql',
    })
  })
})
