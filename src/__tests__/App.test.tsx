import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  const comp = render(<App />);
  expect(comp).toBeTruthy();
});

describe('App functionality', () => {
  it('should render the components correctly', () => {
    const comp = render(<App />);
    expect(comp).toMatchSnapshot();
  })

  it('should change the value of button to START', () => {
    const { getByText } = render(<App />);
    const buttonStop = getByText("STOP")
    fireEvent.click(buttonStop)

    expect(getByText("START")).toBeTruthy();
  })
})
