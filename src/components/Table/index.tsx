import { useState } from 'react';
import GroupedTable from './GroupedTable';
import SortableTable from './SortableTable';

interface Props {
  data: jsonDataObject[];
}

const Table = ({ data }: Props) => {
  const [showGroupView, setShowGroupView] = useState(false);
  return (
    <>
      {showGroupView === true ? (
        <GroupedTable tableData={data} />
      ) : (
        <SortableTable tableData={data} />
      )}
    </>
  );
};

export default Table;
