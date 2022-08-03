import { StyledSelect } from '../../styles/Select.styled';

interface SelectProps {
  selectLabel: string;
  options: TableHeader[];
  setSelectOption: React.Dispatch<React.SetStateAction<TableKey>>;
}

const Select = ({ selectLabel, options, setSelectOption }: SelectProps) => {
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as TableKey;
    setSelectOption(value);
  };

  return (
    <form>
      <label htmlFor="select">{selectLabel}:</label>
      <StyledSelect id="select" onChange={selectChange}>
        {options.map((option, index) => (
          <option key={index} value={option.key}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </form>
  );
};

export default Select;
