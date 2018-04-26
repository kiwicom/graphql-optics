import React from 'react';
import Query from './Query';
import {renderWithRouter} from '../../__tests__/helpers';

it('renders correctly', () => {
  const data = {
    _source: {
      graphql: '{allLocations(search: "Boulder")})',
      metrics: {
        execution: {
          resolvers: [
            {
              fieldName: 'foo',
              duration: 42542,
              path: []
            },
          ],
        },
      },
    },
  };
  const tree = renderWithRouter({children: <Query query={data} />});
  expect(tree).toMatchSnapshot();
});

it("renders correctly when there' no data", () => {
  const data = {
    _source: {},
  };
  const tree = renderWithRouter({children: <Query query={data} />});
  expect(tree).toMatchSnapshot();
});
