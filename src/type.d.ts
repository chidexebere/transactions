type JsonDataObject = {
  departments: string;
  project_name: string;
  amount: string;
  date: string;
  member_name: string;
};

type TableProps = {
  tableData: JsonDataObject[];
};

type TableKey = keyof JsonDataObject;

type SortConfig<T> = {
  key: T;
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

type SortableDataType = GroupedFilteredData | JsonDataObject;
