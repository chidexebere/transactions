import { getIconDirection } from '../../helpers';
import { useSortableData } from '../../hooks';
import { StyledButton } from '../../styles/Button.styled';
import { StyledTable } from '../../styles/Table.styled';

const SortableTable = ({ tableData }: TableProps) => {
  const { sortedData, handleSort, sortConfig } = useSortableData(tableData);

  const tableHeaders: TableHeader[] = [
    { key: 'departments', label: 'Departments' },
    { key: 'project_name', label: 'Project Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'member_name', label: 'Name' },
  ];

  return (
    <StyledTable>
      <caption>Expenses</caption>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header.key}>
              <StyledButton
                type="button"
                onClick={() => handleSort(header.key)}
              >
                {header.label}
                <span data-testid="sort-icon">
                  {getIconDirection(header.key, sortConfig) === 'ascending'
                    ? '▲'
                    : getIconDirection(header.key, sortConfig) === 'descending'
                    ? '▼'
                    : ''}
                </span>
              </StyledButton>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((data, index) => (
          <tr key={index}>
            <td id="departments">{data.departments}</td>
            <td id="project_name">{data.project_name}</td>
            <td id="amount">{data.amount}</td>
            <td id="date">{data.date}</td>
            <td id="member_name">{data.member_name}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default SortableTable;
