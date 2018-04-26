import React from 'react'
import DataColumn from './DataColumn'
import renderer from 'react-test-renderer'

it('renders children', () => {
  const children = <div>Hello!</div>
  const tree = renderer.create(<DataColumn>{children}</DataColumn>).toJSON()
  expect(tree).toMatchSnapshot()
})
