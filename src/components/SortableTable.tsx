import { useSortableData } from '../hooks';

interface Props {
  tableData: jsonDataObject[];
}

const SortableTable = ({ tableData }: Props) => {
  const { sortedData, handleSort } = useSortableData(tableData);

  const tableHeaders: TableHeader[] = [
    { key: 'departments', label: 'Departments' },
    { key: 'project_name', label: 'Project Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'member_name', label: 'Name' },
  ];

  return (
    <table>
      <caption>Our products</caption>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header.key}>
              <button type="button" onClick={() => handleSort(header.key)}>
                {header.label}
              </button>
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
    </table>
  );
};

export default SortableTable;
