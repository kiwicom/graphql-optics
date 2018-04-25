import React from 'react'

export default ({ aggregations }) => (
  <ul>
    {aggregations.map(aggregation => (
      <li key={aggregation.key}>
        {aggregation.key} - {aggregation.doc_count}
      </li>
    ))}
  </ul>
)
