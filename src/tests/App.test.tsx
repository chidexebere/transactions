import { rest } from 'msw';
import App from '../App';
import { server } from '../setupTests';
import { renderWithClient } from './utils';

describe('<App />', () => {
  it('should display a loading state until JSON data is available', () => {
    const result = renderWithClient(<App />);

    expect(result.getByRole('alert', { name: 'loading' })).toBeInTheDocument();
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
