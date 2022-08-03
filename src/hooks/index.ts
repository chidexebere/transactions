import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { generateJSON } from '../api/generateJSON';
import { sortAmount, sortDate, sortField } from '../helpers';

// Get Table JSON Data
const useJsonData = () => {
  return useQuery('expenses', generateJSON);
};

// Sort Table Data
const useSortableData = (data: SortableDataTypes) => {
  const [sortConfig, setSortConfig] = useState<TableConfig | null>(null);

  const sortedData = useMemo(() => {
    const sortableData = [...data];

    if (sortConfig !== null) {
      if (sortConfig.key === 'amount') {
        sortAmount(sortableData, sortConfig);
      } else if (sortConfig.key === 'date') {
        sortDate(sortableData, sortConfig);
      } else {
        sortField(sortableData, sortConfig);
      }
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key: TableKey | GroupKey) => {
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
