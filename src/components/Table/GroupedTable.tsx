import { useState } from 'react';
import {
  getIconDirection,
  makeCurrency,
  filterData,
  getTotal,
} from '../../helpers';
import { useSortableData } from '../../hooks';
import { StyledButton } from '../../styles/Button.styled';
import { SelectWrapper, StyledSelect } from '../../styles/Select.styled';
import { StyledTable } from '../../styles/Table.styled';

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

  return (
    <>
      <SelectWrapper>
        <form>
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
        </form>
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
            <th style={{ textAlign: 'right' }}>
              <StyledButton type="button">Amount</StyledButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td>{data[selectOption]}</td>
              <td style={{ textAlign: 'right' }}>{makeCurrency(data.sum)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td> Total</td>
            <td style={{ textAlign: 'right' }}>
              {makeCurrency(getTotal(filteredData))}
            </td>
          </tr>
        </tfoot>
      </StyledTable>
    </>
  );
};

export default GroupedTable;
