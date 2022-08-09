// Gets the direction of the table header icon either ascending or descending
export const getIconDirection = <A extends object>(
  key: keyof A,
  sortConfig: SortConfig<keyof A> | null,
) => {
  if (!sortConfig) {
    return;
  }
  return sortConfig.key === key ? sortConfig.direction : undefined;
};

// Converts amount to currency in Euros (Dutch)
export const makeCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

// Filters tableData based on selected option and gets the sum of amount selected
export const filterData = (
  tableData: JsonDataObject[],
  selectOption: TableKey,
) => {
  const filteredData = [] as GroupedFilteredData[];

  const selectedDataCells = Array.from(
    new Set(tableData.map((data: JsonDataObject) => data[selectOption])),
  );

  const sumOfSelectedCells = (selectedDataCell: string) => {
    return tableData
      .filter((data) => data[selectOption] === selectedDataCell)
      .map((item) => parseFloat(item.amount.replace(/(^\$|,)/g, '')))
      .reduce((prev, cur) => prev + cur);
  };
  selectedDataCells.forEach((selectedDataCell) => {
    const newRow = {} as GroupedFilteredData;
    newRow[selectOption] = selectedDataCell;
    newRow.sum = sumOfSelectedCells(selectedDataCell);
    filteredData.push(newRow);
  });

  return filteredData;
};

// Gets the total sum of amount
export const getTotal = (filteredData: GroupedFilteredData[]) => {
  return filteredData.map((item) => item.sum).reduce((prev, cur) => prev + cur);
};

// Sort table data fields
const sortField = <A extends SortableDataType>(
  sortableData: A[],
  sortConfig: SortConfig<keyof A>,
) => {
  sortableData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};

const sortAmount = <A extends SortableDataType>(
  sortableData: A[],
  sortConfig: SortConfig<keyof A>,
) => {
  sortableData.sort((a, b) => {
    if (
      parseFloat(a['amount'].replace(/(^\$|,)/g, '')) <
      parseFloat(b['amount'].replace(/(^\$|,)/g, ''))
    ) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (
      parseFloat(a['amount'].replace(/(^\$|,)/g, '')) >
      parseFloat(b['amount'].replace(/(^\$|,)/g, ''))
    ) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};

const sortDate = <A extends SortableDataType>(
  sortableData: A[],
  sortConfig: SortConfig<keyof A>,
) => {
  sortableData.sort((a, b) => {
    if (new Date(a['date']) < new Date(b['date'])) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (new Date(a['date']) > new Date(b['date'])) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};

export const sortData = <A extends SortableDataType>(
  sortableData: A[],
  sortConfig: SortConfig<keyof A>,
) => {
  if (sortConfig.key === 'amount') {
    sortAmount(sortableData, sortConfig);
  } else if (sortConfig.key === 'date') {
    sortDate(sortableData, sortConfig);
  } else {
    sortField(sortableData, sortConfig);
  }
};
