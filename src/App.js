import React from 'react'
import AggregationList from './AggregationList'
import server from './server'
import config from './config.json'

class App extends React.Component {
  loadAggregations() {
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

  constructor(props) {
    super(props)
    this.state = {
      aggregations: [],
    }
  }

  componentDidMount() {
    this.loadAggregations()
  }

  render() {
    return (
      <div>
        <h1>graphql-optics</h1>
        <div>
          <h2>Aggregations</h2>
          <AggregationList aggregations={this.state.aggregations} />
        </div>
      </div>
    )
  }
}

export default App
