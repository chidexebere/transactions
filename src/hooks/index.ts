import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { generateJSON } from '../api/generateJSON';
import { sortData } from '../helpers';

// Get Table JSON Data
const useJsonData = () => {
  return useQuery('expenses', generateJSON);
};

// Sort Table Data
const useSortableData = <A extends SortableDataType>(data: A[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<keyof A> | null>(
    null,
  );

  const sortedData = useMemo(() => {
    const sortableData = [...data];

    if (sortConfig !== null) {
      sortData(sortableData, sortConfig);
      // if (sortConfig.key === 'amount') {
      //   sortAmount(sortableData, sortConfig);
      // } else if (sortConfig.key === 'date') {
      //   sortDate(sortableData, sortConfig);
      // } else {
      //   sortField(sortableData, sortConfig);
      // }
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key: keyof A) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { sortedData, handleSort, sortConfig };
};

export { useJsonData, useSortableData };
