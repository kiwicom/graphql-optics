import React from 'react'
import App from '../App'
import renderer from 'react-test-renderer'
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

  return {
    search: query => {
      _search_spy(query)
      return {
        then: fn =>
          fn({
            aggregations: {
              rootQueries: {
                buckets: data,
              },
            },
          }),
      }
    },
    _search_spy,
  }
})

describe('App', () => {
  it('renders correctly (after data is returned from server)', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('requests aggregation list using the correct query', () => {
    const tree = renderer.create(<App />).toJSON()
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
})
