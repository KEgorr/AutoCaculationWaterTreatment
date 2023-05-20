import React, { useState } from 'react';
import { IBoilerData, isBoilerDataValue } from '../../../types/data-types';
import { IAddBoilerProps } from '../../../types/props-types';
import {
  boilerDataInitial,
  inputBoilerInit,
} from '../data/input-boiler-data-initial';
import validation from '../tools/number-validation';
import InputBoilerData from './InputBoilerData';

export default function AddBoiler(addBoilerProps: IAddBoilerProps) {
  let chosenBoiler: undefined | IBoilerData;
  if (addBoilerProps.chosenBoiler) {
    chosenBoiler = addBoilerProps.chosenBoiler;
  }
  const [boilerData, setBoilerData] = useState<IBoilerData>(
    !chosenBoiler ? boilerDataInitial : chosenBoiler
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;

    if (key in boilerData) {
      if (key !== 'name' && !validation(e)) {
        return;
      }
      setBoilerData((prev) => ({
        ...prev,
        [key]: {
          value: e.target.value,
          isValid: true,
        },
      }));
    }
  }

  function isInputEmpty() {
    let empty = false;
    Object.keys(boilerData).forEach((key) => {
      const valueObj = boilerData[key];
      if (isBoilerDataValue(valueObj) && valueObj.value.trim().length === 0) {
        empty = true;
        setBoilerData((prev) => ({
          ...prev,
          [key]: {
            ...valueObj,
            isValid: false,
          },
        }));
      }
    });
    return empty;
  }

  function onDataChange() {
    if (isInputEmpty()) {
      return;
    }
    if (chosenBoiler) {
      addBoilerProps.onChangeBoiler(boilerData);
    } else addBoilerProps.onAddBoiler(boilerData);
  }

  return (
    <div className="add-boiler-block">
      <ul className="input-fields">
        {inputBoilerInit.map((input) => {
          const key = input.name;
          if (key in boilerData) {
            const valueObj = boilerData[key];
            if (isBoilerDataValue(valueObj)) {
              return (
                <InputBoilerData
                  key={input.id}
                  className={
                    valueObj.isValid
                      ? 'input-block__field'
                      : 'input-block__field input-block__field_invalid'
                  }
                  title={input.title}
                  value={valueObj.value}
                  name={input.name}
                  dimension={input.dimension}
                  onChange={handleChange}
                />
              );
            }
          }
          return null;
        })}
      </ul>
      <button className="common-button" onClick={onDataChange}>
        {!chosenBoiler ? 'Добавить котел' : 'Сохранить'}
      </button>
    </div>
  );
}
