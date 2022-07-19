import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import App from '../App';
import { server } from '../setupTests';
import { renderWithClient } from './utils';

const waitForLoading = () => {
  return waitForElementToBeRemoved(() =>
    screen.getByRole('alert', { name: 'loading' }),
  );
};

describe('<App />', () => {
  it('sucessful JSON data fetch', async () => {
    const result = renderWithClient(<App />);

    await waitForLoading();
    expect(
      result.getByRole('button', { name: 'View Grouped Data' }),
    ).toBeInTheDocument();
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
