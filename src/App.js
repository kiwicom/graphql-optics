import React from 'react'
import { Route, withRouter, matchPath } from 'react-router-dom'
import server from './server'

import Aggregation from './components/Aggregation/Aggregation'
import DataColumn from './components/DataColumn/DataColumn'
import ColumnLayout from './components/ColumnLayout/ColumnLayout'
import Query from './components/Query/Query'
import Metrics from './components/Metrics/Metrics'

import config from './config.json'
import './styles/globals.css'

const aggPath = '/:_?/:rootQuery?'
const metricsPath = '/aggregations/:rootQuery/:queryId?'
const queryPath = '/aggregations/:rootQuery/:queryId'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aggregations: undefined,
      queries: {},
    }
  }

  loadAggregations() {
    if (this.state.aggregations !== undefined) {
      return
    }
    server
      .search({
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
      .then(data => {
        this.setState({
          aggregations: data.aggregations.rootQueries.buckets,
        })
      })
  }

  loadQueries() {
    const match = matchPath(this.props.location.pathname, { path: metricsPath })
    if (!match) {
      return
    }
    const rootQuery = match.params.rootQuery
    const query = this.state.queries[rootQuery]
    if (query) {
      return
    }
    server
      .search({
        index: config.elastic_index,
        body: {
          sort: [
            {
              'metrics.duration': {
                order: 'desc',
              },
            },
          ],
          query: {
            match: {
              rootQuery,
            },
          },
        },
      })
      .then(data => {
        this.setState({
          queries: {
            ...this.state.queries,
            [rootQuery]: data.hits.hits,
          },
        })
      })
  }

  loadData() {
    this.loadAggregations()
    this.loadQueries()
  }

  componentDidUpdate() {
    this.loadData()
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
      <ColumnLayout>
        <Route
          path={aggPath}
          render={({ match }) => (
            <DataColumn>
              {(this.state.aggregations || []).map(aggregation => (
                <Aggregation
                  key={aggregation.key}
                  aggregation={aggregation}
                  isActive={match.params.rootQuery === aggregation.key}
                />
              ))}
            </DataColumn>
          )}
        />
        <Route
          path={metricsPath}
          render={({ match, location }) => {
            const queries = this.state.queries[match.params.rootQuery]
            return (
              <DataColumn>
                {queries
                  ? queries.map(query => (
                      <Metrics
                        key={query._id}
                        trace={query}
                        isActive={match.params.queryId === query._id}
                      />
                    ))
                  : 'loading...'}
              </DataColumn>
            )
          }}
        />
        <Route
          path={queryPath}
          render={({ match }) => {
            const queries = this.state.queries[match.params.rootQuery]
            if (!queries) {
              return 'loading...'
            }
            const query = queries.find(t => t._id === match.params.queryId)
            return (
              <DataColumn>
                {query ? <Query query={query} /> : 'loading...'}
              </DataColumn>
            )
          }}
        />
      </ColumnLayout>
    )
  }
}

export default withRouter(App)
