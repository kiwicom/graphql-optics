import React from 'react'
import Metrics from './Metrics'
import { renderWithRouter } from '../../__tests__/helpers'

it('renders correctly', () => {
  const data = {
    _source: {
      metrics: { duration: 1 },
    },
  }
  const tree = renderWithRouter({ children: <Metrics trace={data} /> })
  expect(tree).toMatchSnapshot()
})
