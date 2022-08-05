import { waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import App from '../App';
import { server } from '../setupTests';
import { renderWithClient } from './utils';

describe('<App />', () => {
  it('should fetch data display on table after displaying loading', async () => {
    const result = renderWithClient(<App />);

    // Wait For Loading
    await waitForElementToBeRemoved(
      () => result.getByRole('alert', { name: 'loading' }),
      { timeout: 2000 },
    );

    expect(
      result.getByRole('button', { name: 'View Grouped Data' }),
    ).toBeInTheDocument();
    expect(result.getByRole('table', { name: 'Expenses' })).toBeInTheDocument();
    expect(result.getAllByText(/IT/i)[0]).toBeInTheDocument();
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
