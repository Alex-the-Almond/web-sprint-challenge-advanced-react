import React from 'react';
import AppClass from './AppClass';
import {screen, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

test('renders wihtout errors', () => {
  render(<AppClass />);
});

test('heading renders', () => {
  render(<AppClass />);

  expect(screen.getByText(/Coordinates/i)).toBeVisible();
  expect(screen.getByText(/You moved 0 times/i)).toBeVisible();
});

test('buttons appear', () => {
  render(<AppClass />);

  expect(screen.getAllByRole('button').length).toBe(6);
});

test('button text renders', () => {
  render(<AppClass/>);
  
  expect(screen.getByText(/LEFT/i)).toBeVisible();
  expect(screen.getByText(/RIGHT/i)).toBeVisible();
  expect(screen.getByText(/UP/i)).toBeVisible();
  expect(screen.getByText(/DOWN/i)).toBeVisible();
  expect(screen.getByText(/RESET/i)).toBeVisible();
})

test('one block has the letter B', () => {
  render(<AppClass />);

  expect(screen.getByText(/B/i)).toBeVisible();
})
