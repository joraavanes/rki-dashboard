import { render, screen } from '@testing-library/react';
import Card from '../index';

test('should render a Card', () => { 
    render(<Card stats={casesData.stats} theme={casesData.theme} title={casesData.title} />);
    const casesCardEl = screen.getByTitle(casesData.title);
    expect(casesCardEl).toBeInTheDocument();
});

test('should give total number of stats', () => { 
    render(<Card stats={casesData.stats} theme={casesData.theme} title={casesData.title} />);
    const casesCardEl = screen.getByTitle(casesData.title);
    expect(casesCardEl).toHaveTextContent(casesData.stats.reduce((acc, curr) => acc + curr).toString());
});

const casesData = {
    stats: [23, 34, 12],
    theme: 'primary',
    title: 'cases'
};