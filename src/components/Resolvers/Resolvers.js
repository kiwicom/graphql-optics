import React from 'react'

const Resolvers = ({ resolvers }) => (
  <table>
    <thead>
      <tr>
        <th>Field name</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>{
      resolvers.map(({ fieldName, duration, path }) => (
        <tr key={fieldName + path.join()}>
          <td>{fieldName}</td>
          <td>{parseInt(duration * 100 / 10 ** 6) / 100} ms</td>
        </tr>
      ))
    }</tbody>
  </table>
)

export default Resolvers
