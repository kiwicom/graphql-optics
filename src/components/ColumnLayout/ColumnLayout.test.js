import React from 'react'
import ColumnLayout from './ColumnLayout'
import renderer from 'react-test-renderer'

it('renders children', () => {
  const children = <div>Hello!</div>
  const tree = renderer.create(<ColumnLayout>{children}</ColumnLayout>).toJSON()
  expect(tree).toMatchSnapshot()
})
