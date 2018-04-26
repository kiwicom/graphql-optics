import React from 'react'
import Resolvers from '../Resolvers/Resolvers'

const codeStyle = {
  fontFamily: 'monospace',
  whiteSpace: 'pre',
  backgroundColor: 'rgba(248, 248, 255, 1)',
  overflowX: 'auto',
  width: '100%',
  marginBottom: '20px',
}

const Query = ({ query, history, location, isActive }) => {
  return query._source.metrics ? (
    <div>
      <div style={codeStyle}>{query._source.graphql}</div>
      <Resolvers resolvers={query._source.metrics.execution.resolvers}></Resolvers>
    </div>
  ) : <div></div>
}

export default Query
