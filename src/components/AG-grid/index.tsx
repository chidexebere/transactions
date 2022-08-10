import { useState } from 'react';
import { StyledButton } from '../../styles/Button.styled';
import { StyledLeftNav, StyledRightNav } from '../../styles/Layout.styled';
import Grouped from './Grouped';
import Sortable from './Sortable';

const AgDataGrid = ({ tableData }: TableProps) => {
  const [showGroupView, setShowGroupView] = useState(false);

  const toggleView = () => setShowGroupView((currView) => !currView);

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
          <Grouped tableData={tableData} />
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
          <Sortable tableData={tableData} />
        </>
      )}
    </section>
  );
};

export default AgDataGrid;
