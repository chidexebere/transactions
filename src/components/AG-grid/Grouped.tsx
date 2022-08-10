import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { makeCurrency, filterData, getTotal } from '../../helpers';
import { SelectWrapper } from '../../styles/Select.styled';
import Select from '../Select';

const Grouped = ({ tableData }: TableProps) => {
  const [selectOption, setSelectOption] = useState<TableKey>('departments');

  const filteredData = filterData(tableData, selectOption);

  const getHeader = (selectOption: TableKey): string => {
    if (selectOption === 'departments') return 'Departments';
    if (selectOption === 'project_name') return 'Project Name';
    if (selectOption === 'date') return 'Date';
    if (selectOption === 'member_name') return 'Name';
    return '';
  };

  const options: TableHeader[] = [
    { key: 'departments', label: 'Departments' },
    { key: 'project_name', label: 'Project Name' },
    { key: 'date', label: 'Date' },
    { key: 'member_name', label: 'Name' },
  ];

  const columnDefs = [
    { field: selectOption, headerName: getHeader(selectOption), width: 400 },
    { field: 'sum', headerName: 'Amount', width: 200 },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    [],
  );

  const pinnedBottomRowData = [
    { [selectOption]: 'Total', sum: makeCurrency(getTotal(filteredData)) },
  ];

  return (
    <>
      <SelectWrapper>
        <Select
          selectLabel="Total Expenses by"
          options={options}
          setSelectOption={setSelectOption}
        />
      </SelectWrapper>

      <div className="ag-theme-alpine" style={{ width: 600, height: 350 }}>
        <h1>Grouped Expenses</h1>
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedBottomRowData={pinnedBottomRowData}
        />
      </div>
    </>
  );
};

export default Grouped;
