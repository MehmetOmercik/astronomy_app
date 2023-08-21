import { FC } from "react";

interface DropdownWithLabelProps {
  label: string;
  options: string[];
  onChange: (value: string, property?: string) => void;
  property?: string;
}
export const DropdownWithLabel: FC<DropdownWithLabelProps> = ({
  label,
  options,
  onChange,
  property,
  ...props
}) => {
  const handleDropDownWithLabelChange = (value: any, property?: string) => {
    // Allows both useState and useReducer/Redux to be used
    if (property) {
      return onChange(value, property);
    }
    return onChange(value);
  };
  return (
    <fieldset className="flex flex-col">
      <label>{label}</label>
      <select {...props} onChange={(e) => handleDropDownWithLabelChange(e.target.value, property)}>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </fieldset>
  );
};
