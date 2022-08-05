import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import App from '../App';
import { server } from '../setupTests';
import { renderWithClient } from './utils';

describe('<App />', () => {
  it('should fetch data display on expense table after displaying loading', async () => {
    const result = renderWithClient(<App />);

    // Wait For Loading
    await waitForElementToBeRemoved(
      () => result.getByRole('alert', { name: 'loading' }),
      { timeout: 2000 },
    );

    // Display Expense data
    expect(
      result.getByRole('button', { name: 'View Grouped Data' }),
    ).toBeInTheDocument();
    expect(result.getByRole('table', { name: 'Expenses' })).toBeInTheDocument();
    expect(result.getAllByText(/IT/i)[0]).toBeInTheDocument();
  });

  it('should display select component and group table after View Grouped Data button has been clicked', async () => {
    const result = renderWithClient(<App />);

    // Wait For Loading
    await waitForElementToBeRemoved(
      () => result.getByRole('alert', { name: 'loading' }),
      { timeout: 2000 },
    );

    // Display Group Expense data after clicking on View Grouped Data button
    fireEvent.click(result.getByRole('button', { name: 'View Grouped Data' }));

    expect(result.getByLabelText('Total Expenses by:')).toBeInTheDocument();
    expect(
      result.getByRole('table', { name: 'Grouped Expenses' }),
    ).toBeInTheDocument();
    expect(result.getAllByText(/IT/i)[0]).toBeInTheDocument();
  });

  it('should change the header of the table with option selected from the select component', async () => {
    const result = renderWithClient(<App />);

    // Wait For Loading
    await waitForElementToBeRemoved(
      () => result.getByRole('alert', { name: 'loading' }),
      { timeout: 2000 },
    );

    fireEvent.click(result.getByRole('button', { name: 'View Grouped Data' }));

    const select = result.getByLabelText('Total Expenses by:');
    fireEvent.change(select, { target: { value: 'Date' } });
    expect(result.getByText(/Date/i)).toBeInTheDocument();
  });

  it('should display each table once respective buttons are clicked', async () => {
    const result = renderWithClient(<App />);

    // Wait For Loading
    await waitForElementToBeRemoved(
      () => result.getByRole('alert', { name: 'loading' }),
      { timeout: 2000 },
    );

    fireEvent.click(result.getByRole('button', { name: 'View Grouped Data' }));
    expect(
      result.getByRole('table', { name: 'Grouped Expenses' }),
    ).toBeInTheDocument();

    fireEvent.click(result.getByRole('button', { name: 'Back to Expenses' }));
    expect(result.getByRole('table', { name: 'Expenses' })).toBeInTheDocument();
  });

  it('should display error if fetching JSON data fails ', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const result = renderWithClient(<App />);

    expect(
      await result.findByText(/Something went wrong, can not load table data/i),
    ).toBeInTheDocument();
  });
});
