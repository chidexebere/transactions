type JsonDataObject = {
  departments: string;
  project_name: string;
  amount: string;
  date: string;
  member_name: string;
  sum: number;
};

type TableProps = {
  tableData: jsonDataObject[];
};

type TableKey =
  | 'departments'
  | 'project_name'
  | 'amount'
  | 'date'
  | 'member_name';

type TableConfig = {
  key: TableKey;
  direction: string;
};

type TableHeader = {
  key: TableKey;
  label: string;
};

type StyledBtn = {
  primary?: boolean;
};

type GroupedFilteredData = {
  [key: string]: string;
  sum: number;
};

type SortableDataTypes = (GroupedFilteredData | JsonDataObject)[];
