import React from 'react'
import Resolvers from '../Resolvers'
import { renderWithRouter } from '../../../__tests__/helpers'

it('renders correctly', () => {
  const data = [
    {fieldName: 'foo', duration: 3242322, path: ['a', 3, 'b']},
    {fieldName: 'bar', duration: 4545, path: ['foo']},
  ]
  const tree = renderWithRouter({ children: <Resolvers resolvers={data} /> })
  expect(tree).toMatchSnapshot()
})
