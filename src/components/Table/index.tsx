import { useState } from 'react';
import { StyledButton } from '../../styles/Button.styled';
import { StyledRightNav } from '../../styles/Layout.styled';
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
        <>
          <StyledRightNav>
            <StyledButton type="button" primary>
              View Grouped Data
            </StyledButton>
          </StyledRightNav>
          <SortableTable tableData={data} />
        </>
      )}
    </>
  );
};

export default Table;
