interface InputFieldProps {
  accept?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  styles?: string;
  title?: string;
  type?: "text" | "number" | "search" | "date" | "checkbox" | "file";
  value?: string | number | readonly string[] | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  accept,
  checked,
  defaultChecked,
  disabled = false,
  label,
  max,
  maxLength,
  min,
  minLength,
  name,
  onChange,
  pattern,
  placeholder,
  required,
  styles,
  title,
  type = "text",
  value
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={`select-${name}`} className="text-stone-800 dark:text-stone-200 capitalize">
          <span className="font-bold uppercase border-b-2 border-sky-700">{label}</span> {required && <span className="text-sky-600 text-xl m-0 p-0" title="campo requerido">*</span>}
        </label>
      )}
      <input
        accept={accept}
        checked={checked}
        className={`bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 outline outline-2 outline-stone-700 focus:outline-sky-900 p-1 md:px-2 rounded-lg ${styles}`}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={`select-${name}`}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        name={name}
        onChange={(e) => onChange?.(e)}
        pattern={pattern}
        placeholder={placeholder}
        required={required}
        title={title}
        type={type}
        value={value !== null ? value : ""}
      />
    </div>
  )
}

export { InputField };
