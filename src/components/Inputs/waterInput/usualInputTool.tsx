import React from 'react';
import { InputProps } from '../../../types/props-types';
import validation from '../tools/number-validation';

function WaterUsualInput({ waterData, update, className, value }: InputProps) {
  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isValid = validation(event);
    if (!isValid) {
      return;
    }

    update(waterData.id, event.target.value);
  }

  return (
    <li className="input-block">
      <label>
        <span className="input-block__text">
          {waterData.name}
          {waterData.sub && <sub>{waterData.sub}</sub>}
          {waterData.sup && <sup>{waterData.sup}</sup>}
        </span>
        <input
          type="text"
          className={className}
          value={value}
          onChange={inputChange}
        />
        <span className="input-block__text dimension">
          {waterData.dimension}
        </span>
      </label>
    </li>
  );
}

export default WaterUsualInput;
