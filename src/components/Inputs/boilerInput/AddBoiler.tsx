import React, { useState } from 'react';
import { IBoilerData, isBoilerDataValue } from '../../../types/data-types';
import { IAddBoilerProps } from '../../../types/props-types';
import {
  boilerDataInitial,
  boilerTypes,
  inputBoilerInit,
  separationTypes,
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
      if (
        key !== 'name' &&
        key !== 'boilerType' &&
        key !== 'separationType' &&
        !validation(e)
      ) {
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
    let empty = true;
    Object.keys(boilerData).forEach((key) => {
      const valueObj = boilerData[key];
      if (
        isBoilerDataValue(valueObj) &&
        valueObj.value.trim().length === 0 &&
        key !== 'steamLosses' &&
        key !== 'requiredDryResidue'
      ) {
        empty = false;
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

  function isSteamLossesValid() {
    let valid = true;
    if (Number(boilerData.steamLosses.value) > 1) {
      valid = false;
      setBoilerData({
        ...boilerData,
        steamLosses: {
          ...boilerData.steamLosses,
          isValid: false,
        },
      });
    }
    return valid;
  }

  function onDataChange() {
    const isEmpty = isInputEmpty();
    const isLosses = isSteamLossesValid();
    if (!isEmpty || !isLosses) {
      return;
    }
    if (chosenBoiler) {
      addBoilerProps.onChangeBoiler(boilerData);
    } else addBoilerProps.onAddBoiler(boilerData);
  }

  return (
    <div className="add-boiler-block">
      <h2 className="water-input__subtitle">Основные характеристики котла</h2>
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
                  hint={input.hint}
                />
              );
            }
          }
          return null;
        })}
      </ul>
      <ul className="input-fields">
        <h2 className="water-input__subtitle">Тип котла</h2>
        {boilerTypes.map((type) => (
          <InputBoilerData
            key={type.id}
            type="radio"
            className="radio-button"
            title={type.tittle}
            value={type.tittle}
            name="boilerType"
            onChange={handleChange}
            checkedValue={boilerData.boilerType.value}
          />
        ))}
      </ul>
      <ul className="input-fields">
        <h2 className="water-input__subtitle">Тип сепарационного устройства</h2>
        {separationTypes.map((type) => (
          <InputBoilerData
            key={type.id}
            type="radio"
            className="radio-button"
            title={type.tittle}
            value={type.tittle}
            name="separationType"
            onChange={handleChange}
            checkedValue={boilerData.separationType.value}
          />
        ))}
      </ul>
      <button className="common-button" onClick={onDataChange}>
        {!chosenBoiler ? 'Добавить котел' : 'Сохранить'}
      </button>
      {!boilerData.steamLosses.isValid && (
        <p className="boiler-error-massage">
          Суммарные потери пара не могут быть больше единицы
        </p>
      )}
    </div>
  );
}
