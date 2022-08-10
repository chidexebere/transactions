import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

const Sortable = ({ tableData }: TableProps) => {
  const columnDefs = [
    { field: 'departments', headerName: 'Departments', width: 250 },
    { field: 'project_name', headerName: 'Project Name', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'member_name', headerName: 'Name', width: 200 },
  ];

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    [],
  );

  return (
    <div className="ag-theme-alpine" style={{ width: 1000, height: 500 }}>
      <h1>Expenses</h1>
      <AgGridReact
        rowData={tableData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Sortable;
