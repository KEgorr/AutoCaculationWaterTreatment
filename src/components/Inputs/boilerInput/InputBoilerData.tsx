import { InputBoilerDataProps } from '../../../types/props-types';

export default function InputBoilerData(
  inputBoilerDataProps: InputBoilerDataProps
) {
  const { title, value, name, dimension, className, type, checkedValue, hint } =
    inputBoilerDataProps;
  return (
    <li className="input-block">
      <label title={hint}>
        <span className="input-block__text">{title}</span>
        <input
          type={type}
          className={className}
          value={value}
          onChange={(e) => inputBoilerDataProps.onChange(e)}
          name={name}
          checked={title === checkedValue}
        />
        <span className="input-block__text dimension">
          {dimension && dimension}
        </span>
      </label>
    </li>
  );
}
