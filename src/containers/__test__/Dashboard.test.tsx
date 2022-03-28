import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

test('renders learn react link', () => {
  render(<Dashboard />);
  const linkElement = screen.getByRole('heading', {name: 'RKI Dashboard'});
  expect(linkElement).toBeInTheDocument();
});

test('should have cases element', () => { 
  render(<Dashboard/>);
  const el = screen.getByTitle('cases');
  expect(el).toBeInTheDocument();
});

test('should show cases total', async () => { 
  render(<Dashboard/>);
  const casesEl = await screen.findByTitle('cases');
  expect(Number(casesEl.textContent)).toBeGreaterThanOrEqual(0);
});

test('should show deaths total', async () => { 
  render(<Dashboard/>);
  const deathsEl = await screen.findByTitle('deaths');
  expect(Number(deathsEl.textContent)).toBeGreaterThanOrEqual(0);
});

test('should show incidences total', async () => { 
  render(<Dashboard/>);
  const incidenceEl = await screen.findByTitle('incidence');
  expect(Number(incidenceEl.textContent)).toBeGreaterThanOrEqual(0);
});

test('should contain option element(s) inside', async () => { 
  render(<Dashboard/>);
  const districtEl = await screen.findByTitle('districts');
  expect(districtEl).toContainHTML('option');
 });