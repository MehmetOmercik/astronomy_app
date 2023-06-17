import React, { FC, useState } from "react";

interface DropdownWithLabelProps {
  label: string;
  options: string[];
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
