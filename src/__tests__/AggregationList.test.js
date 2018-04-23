import React from 'react';
import AggregationList from '../AggregationList';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const data = [ 
    {
      "key" : "allLocations",
      "doc_count" : 6
    },
    {
      "key" : "allFlights",
      "doc_count" : 3
    },
    {
      "key" : "allWhatever",
      "doc_count" : 2
    }
  ];
  const tree = renderer
    .create(<AggregationList aggregations={data}>Facebook</AggregationList>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
