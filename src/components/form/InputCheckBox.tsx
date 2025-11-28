import React from "react";

interface CheckboxProps {
  checked?: boolean;
  label?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  styles?: string;
  text: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, label, name, onChange, required, styles, text }) => (
  <div className="flex items-center gap-2 w-full">
    {label && (
      <label htmlFor={`select-${name}`} className="text-stone-800 dark:text-stone-200 capitalize">
        <span className="font-bold uppercase border-b-2 border-sky-700">{label}</span>: {text} {required && <span className="text-sky-600 text-xl m-0 p-0" title="campo requerido">*</span>}
      </label>
    )}
    <input
      checked={checked}
      className={`accent-blue-600 ${styles}`}
      id={`select-${name}`}
      name={name}
      onChange={onChange}
      type="checkbox"
    />
  </div>
);

export { Checkbox };
