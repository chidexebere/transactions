import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { generateJSON } from '../api/generateJSON';

// Get Table JSON Data
const useJsonData = () => {
  return useQuery('expenses', generateJSON);
};

// Sort Table Data
const useSortableData = (data: jsonDataObject[] | any) => {
  const [sortConfig, setSortConfig] = useState<TableConfig | null>(null);

  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      if (sortConfig.key === 'amount') {
        sortableData.sort((a, b) => {
          if (
            parseFloat(a[sortConfig.key].replace(/(^\$|,)/g, '')) <
            parseFloat(b[sortConfig.key].replace(/(^\$|,)/g, ''))
          ) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (
            parseFloat(a[sortConfig.key].replace(/(^\$|,)/g, '')) >
            parseFloat(b[sortConfig.key].replace(/(^\$|,)/g, ''))
          ) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      } else if (sortConfig.key === 'date') {
        sortableData.sort((a, b) => {
          if (new Date(a[sortConfig.key]) < new Date(b[sortConfig.key])) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (new Date(a[sortConfig.key]) > new Date(b[sortConfig.key])) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      } else {
        sortableData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key: TableKey) => {
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
