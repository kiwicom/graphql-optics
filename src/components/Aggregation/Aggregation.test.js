import React from 'react'
import Aggregation from './Aggregation'
import { renderWithRouter } from '../../__tests__/helpers'

it('renders correctly', () => {
  const data = {
    key: 'allLocations',
    doc_count: 6,
  }
  const tree = renderWithRouter({
    children: <Aggregation aggregation={data} />,
  })
  expect(tree).toMatchSnapshot()
})
