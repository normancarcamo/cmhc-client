type SelectOption = { value: string | number; label: string };

type InputSelectProps = {
  id: string;
  name: string;
  options?: SelectOption[];
  defaultValue?: SelectOption;
};

const InputSelect = (props: InputSelectProps) => (
  <select
    name={props.name}
    id={props.id}
    required
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
    defaultValue={props.defaultValue ? props.defaultValue.value : ""}
  >
    {props.options?.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

type InputNumberProps = {
  id: string;
  name: string;
  step?: number;
  autoComplete?: "on" | "off";
};

const InputNumber = (props: InputNumberProps) => (
  <input
    type="number"
    id={props.id}
    name={props.name}
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
    placeholder="0"
    required
    step={props.step || 1}
    autoComplete={props.autoComplete}
  />
);

type InputProps = {
  id: string;
  name: string;
  label: string;
  step?: number;
  autoComplete?: "on" | "off";
  type: "number" | "select";
  options?: SelectOption[];
  defaultValue?: SelectOption;
};

export const Input = (props: InputProps) => (
  <div>
    <label
      htmlFor={props.id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {props.label}
    </label>
    {props.type === "number" ? (
      <InputNumber
        id={props.id}
        name={props.name}
        step={props.step}
        autoComplete={props.autoComplete}
      />
    ) : (
      <InputSelect
        id={props.id}
        name={props.name}
        options={props.options}
        defaultValue={props.defaultValue}
      />
    )}
  </div>
);
