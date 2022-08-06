import { rest } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../setupTests';
import { createWrapper } from './utils';
import { useJsonData, useSortableData } from '../hooks';
import sampleData from './sampleData.json';

const sampleTableData = [
  {
    ['departments']: 'IT',
    sum: 9220000,
  },
  {
    ['departments']: 'HR',
    sum: 14394900,
  },
  {
    ['departments']: 'Sales',
    sum: 20405800,
  },
];

describe('query data hook', () => {
  it('successful table data query hook', async () => {
    const { result } = renderHook(() => useJsonData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toStrictEqual(sampleData);
  });

  it('failure query hook', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const { result } = renderHook(() => useJsonData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});

// describe('sort data hook', () => {
//   it('successful sort table data', () => {
//     const { result } = renderHook(() => useSortableData(sampleTableData), {
//       wrapper: createWrapper(),
//     });

//     expect(result.current.sortedData).toStrictEqual(sampleTableData);
//   });
// });
