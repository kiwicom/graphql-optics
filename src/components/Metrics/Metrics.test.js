import React from 'react'
import Metrics from './Metrics'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const data = {
    _source: {
      metrics: { duration: 1 },
    },
  }
  const tree = renderer.create(<Metrics trace={data} />).toJSON()
  expect(tree).toMatchSnapshot()
})
