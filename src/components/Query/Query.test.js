import React from 'react'
import Query from './Query'
import { renderWithRouter } from '../../__tests__/helpers'

it('renders correctly', () => {
  const data = {
    _source: {
      graphql: '{allLocations(search: "Boulder")})',
    },
  }
  const tree = renderWithRouter({ children: <Query query={data} /> })
  expect(tree).toMatchSnapshot()
})
