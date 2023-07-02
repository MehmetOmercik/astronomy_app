import { FC, Dispatch, SetStateAction } from "react";

interface DropdownWithLabelProps {
  label: string;
  options: string[];
  onChange: Dispatch<SetStateAction<string>>;
}
export const DropdownWithLabel: FC<DropdownWithLabelProps> = ({ label, options, onChange }) => {
  return (
    <fieldset className="flex flex-col">
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </fieldset>
  );
};
