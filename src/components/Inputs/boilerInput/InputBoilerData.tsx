import { InputBoilerDataProps } from '../../../types/props-types';

export default function InputBoilerData(
  inputBoilerDataProps: InputBoilerDataProps
) {
  const { title, value, name, dimension, className } = inputBoilerDataProps;
  return (
    <li>
      <span>{title}</span>
      <input
        className={className}
        value={value}
        onChange={(e) => inputBoilerDataProps.onChange(e)}
        name={name}
      />
      {dimension && <span>{dimension}</span>}
    </li>
  );
}
