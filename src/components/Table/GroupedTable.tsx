import { useState } from 'react';
import {
  getIconDirection,
  makeCurrency,
  filterData,
  getTotal,
} from '../../helpers';
import { useSortableData } from '../../hooks';
import { StyledButton } from '../../styles/Button.styled';
import { SelectWrapper } from '../../styles/Select.styled';
import { StyledTable } from '../../styles/Table.styled';
import Select from '../Select';

const GroupedTable = ({ tableData }: TableProps) => {
  const [selectOption, setSelectOption] = useState<TableKey>('departments');

  const filteredData = filterData(tableData, selectOption);

  const { sortedData, handleSort, sortConfig } = useSortableData(filteredData);

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

  return (
    <>
      <SelectWrapper>
        <Select
          selectLabel="Total Expenses by"
          options={options}
          setSelectOption={setSelectOption}
        />
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
                <span data-testid="sort-icon">
                  {getIconDirection(selectOption, sortConfig) === 'ascending'
                    ? '▲'
                    : getIconDirection(selectOption, sortConfig) ===
                      'descending'
                    ? '▼'
                    : ''}
                </span>
              </StyledButton>
            </th>
            <th style={{ textAlign: 'right' }}>
              <StyledButton type="button" onClick={() => handleSort('sum')}>
                Amount
                <span data-testid="sort-icon">
                  {getIconDirection('sum', sortConfig) === 'ascending'
                    ? '▲'
                    : getIconDirection('sum', sortConfig) === 'descending'
                    ? '▼'
                    : ''}
                </span>
              </StyledButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td id={selectOption}>{data[selectOption]}</td>
              <td id="sum" style={{ textAlign: 'right' }}>
                {makeCurrency(data.sum)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td> Total</td>
            <td id="totalValue" style={{ textAlign: 'right' }}>
              {makeCurrency(getTotal(filteredData))}
            </td>
          </tr>
        </tfoot>
      </StyledTable>
    </>
  );
};

export default GroupedTable;
