import { getIconDirection } from '../../helpers';
import { useSortableData } from '../../hooks';
import { StyledButton } from '../../styles/Button.styled';
import { StyledTable } from '../../styles/Table.styled';

interface Props {
  tableData: jsonDataObject[];
}

const SortableTable = ({ tableData }: Props) => {
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
                <span>
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
            <td>{data.departments}</td>
            <td>{data.project_name}</td>
            <td>{data.amount}</td>
            <td>{data.date}</td>
            <td>{data.member_name}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default SortableTable;
