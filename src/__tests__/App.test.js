import React from 'react'
import { renderWithRouter } from './helpers'
import App from '../App'

import config from '../config.json'

jest.mock('../server', () => {
  const data = [
    {
      key: 'allLocations',
      doc_count: 442,
    },
    {
      key: 'allFlights',
      doc_count: 3342,
    },
    {
      key: 'allWhatever',
      doc_count: 2,
    },
  ]

  const _search_spy = jest.fn()

  const aggsResponse = {
    aggregations: {
      rootQueries: {
        buckets: data,
      },
    },
  }
  const queriesResponse = {
    hits: {
      hits: [{ _id: 'uuid', _source: { graphql: 'allLocations...' } }],
    },
  }

  return {
    search: query => {
      _search_spy(query)
      return {
        then: fn => fn(query.body.aggs ? aggsResponse : queriesResponse),
      }
    },
    _search_spy,
  }
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('App', () => {
  it('renders correctly (after data is returned from server)', () => {
    const tree = renderWithRouter({ children: <App /> })
    expect(tree).toMatchSnapshot()
  })

  it('requests aggregation list using the correct query', () => {
    const tree = renderWithRouter({ children: <App /> })
    const server = require.requireMock('../server')
    expect(server._search_spy).toHaveBeenCalledWith({
      index: config.elastic_index,
      body: {
        size: 0,
        aggs: {
          rootQueries: {
            terms: {
              field: 'rootQuery',
            },
          },
        },
      },
    })
  })

  it('requests query list using the rootQuery route param', () => {
    const tree = renderWithRouter({
      children: <App />,
      location: '/aggregations/allLocations',
    })
    const server = require.requireMock('../server')
    expect(server._search_spy.mock.calls[1][0]).toEqual({
      index: config.elastic_index,
      body: {
        query: {
          match: {
            rootQuery: 'allLocations',
          },
        },
      },
    })
  })
})
