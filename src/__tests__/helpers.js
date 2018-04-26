import React from 'react'
import renderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'

export const renderWithRouter = ({ children, location }) =>
  renderer
    .create(
      <StaticRouter location={location || '/'} context={{}}>
        {children}
      </StaticRouter>,
    )
    .toJSON()
