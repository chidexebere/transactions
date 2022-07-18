import { useState } from 'react';
import { StyledButton } from '../../styles/Button.styled';
import { StyledLeftNav, StyledRightNav } from '../../styles/Layout.styled';
import GroupedTable from './GroupedTable';
import SortableTable from './SortableTable';

interface Props {
  data: jsonDataObject[];
}

const Table = ({ data }: Props) => {
  const [showGroupView, setShowGroupView] = useState(false);

  return (
    <section>
      {showGroupView === true ? (
        <>
          <StyledLeftNav>
            <StyledButton
              type="button"
              primary
              onClick={() => setShowGroupView(false)}
            >
              Back to Expenses
            </StyledButton>
          </StyledLeftNav>
          <GroupedTable tableData={data} />
        </>
      ) : (
        <>
          <StyledRightNav>
            <StyledButton
              type="button"
              primary
              onClick={() => setShowGroupView(true)}
            >
              View Grouped Data
            </StyledButton>
          </StyledRightNav>
          <SortableTable tableData={data} />
        </>
      )}
    </section>
  );
};

export default Table;
