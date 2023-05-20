import { InputBoilerDataProps } from '../../../types/props-types';

export default function InputBoilerData(
  inputBoilerDataProps: InputBoilerDataProps
) {
  const { title, value, name, dimension, className } = inputBoilerDataProps;
  return (
    <li className="input-block">
      <span className="input-block__text">{title}</span>
      <input
        className={className}
        value={value}
        onChange={(e) => inputBoilerDataProps.onChange(e)}
        name={name}
      />

      <span className="input-block__text dimension">
        {dimension && dimension}
      </span>
    </li>
  );
}
