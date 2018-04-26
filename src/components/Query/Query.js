import React from 'react'

const codeStyle = {
  fontFamily: 'monospace',
  whiteSpace: 'pre',
  backgroundColor: 'rgba(248, 248, 255, 1)',
  overflowX: 'auto',
  width: '100%',
  marginBottom: '20px',
}

const Query = ({ query, history, location, isActive }) => (
  <div style={codeStyle}>{query._source.graphql}</div>
)

export default Query
