import { useState } from 'react';
import { getIconDirection } from '../../helpers';
import { useSortableData } from '../../hooks';
import { StyledButton } from '../../styles/Button.styled';
import { SelectWrapper, StyledSelect } from '../../styles/Select.styled';
import { StyledTable } from '../../styles/Table.styled';

interface Props {
  tableData: jsonDataObject[];
}

const GroupedTable = ({ tableData }: Props) => {
  const [selectOption, setSelectOption] = useState<TableKey>('departments');

  const selectedDataCells = Array.from(
    new Set(tableData.map((data: jsonDataObject) => data[selectOption])),
  );

  const sumOfSelectedCells = (selectedDataCell: string) => {
    return tableData
      .filter((data) => data[selectOption] === selectedDataCell)
      .map((item) => parseFloat(item.amount.replace(/(^\$|,)/g, '')))
      .reduce((prev, cur) => prev + cur);
  };

  const filterData = (selectOption: TableKey) => {
    const filteredData = [] as any[];
    selectedDataCells.forEach((selectedDataCell) => {
      const newRow = {} as any;
      newRow[selectOption] = selectedDataCell;
      newRow.sum = sumOfSelectedCells(selectedDataCell);
      filteredData.push(newRow);
    });

    return filteredData;
  };

  console.log(filterData(selectOption));

  const getTotal = () => {
    return filterData(selectOption)
      .map((item) => item.sum)
      .reduce((prev, cur) => prev + cur);
  };

  const makeCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const { sortedData, handleSort, sortConfig } = useSortableData(
    filterData(selectOption),
  );

  const getHeader = (selectOption: TableKey): string => {
    if (selectOption === 'departments') return 'Departments';
    if (selectOption === 'project_name') return 'Project Name';
    if (selectOption === 'date') return 'Date';
    if (selectOption === 'member_name') return 'Name';
    return '';
  };

  return (
    <>
      <SelectWrapper>
        <label htmlFor="table-header-select">Total Expenses by:</label>
        <StyledSelect
          id="table-header-select"
          onChange={(e) => setSelectOption(e.target.value as TableKey)}
        >
          <option value="departments">Departments</option>
          <option value="project_name">Project Name</option>
          <option value="date">Date</option>
          <option value="member_name">Name</option>
        </StyledSelect>
      </SelectWrapper>
      <StyledTable>
        <caption>Grouped Expenses</caption>
        <thead>
          <tr>
            <th>
              <StyledButton
                type="button"
                onClick={() => handleSort(selectOption)}
              >
                {getHeader(selectOption)}
                <span>
                  {getIconDirection(selectOption, sortConfig) === 'ascending'
                    ? '▲'
                    : getIconDirection(selectOption, sortConfig) ===
                      'descending'
                    ? '▼'
                    : ''}
                </span>
              </StyledButton>
            </th>
            <th>
              <StyledButton type="button">Amount</StyledButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td>{data[selectOption]}</td>
              <td>{makeCurrency(data.sum)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td> Total</td>
            <td>{makeCurrency(getTotal())}</td>
          </tr>
        </tfoot>
      </StyledTable>
    </>
  );
};

export default GroupedTable;
