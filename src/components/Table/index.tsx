import { useState } from 'react';
import { StyledButton } from '../../styles/Button.styled';
import { StyledLeftNav, StyledRightNav } from '../../styles/Layout.styled';
import GroupedTable from './GroupedTable';
import SortableTable from './SortableTable';

const Table = ({ tableData }: TableProps) => {
  const [showGroupView, setShowGroupView] = useState(false);

  const toggleView = () => setShowGroupView(!showGroupView);

  return (
    <section>
      {showGroupView ? (
        <>
          <StyledLeftNav>
            <StyledButton
              data-testid="back-to-expenses"
              type="button"
              primary
              onClick={toggleView}
            >
              Back to Expenses
            </StyledButton>
          </StyledLeftNav>
          <GroupedTable tableData={tableData} />
        </>
      ) : (
        <>
          <StyledRightNav>
            <StyledButton
              data-testid="view-grouped-data"
              type="button"
              primary
              onClick={toggleView}
            >
              View Grouped Data
            </StyledButton>
          </StyledRightNav>
          <SortableTable tableData={tableData} />
        </>
      )}
    </section>
  );
};

export default Table;
