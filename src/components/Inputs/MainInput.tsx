import { useState } from 'react';
import { IBoilerData } from '../../types/data-types';
import BoilersTable from './boilerInput/BoilerTable';
import waterDataInitial from './data/usual-input-data';
import WaterInputs from './waterInput/WaterInputs';

export default function MainInput() {
  const [waterData, setWaterData] = useState(waterDataInitial);
  const [chosenBoiler, setChosenBoiler] = useState<IBoilerData>();
  const [isBoilerChecked, setBoilerChecked] = useState(true);

  function update(id: number, value: string) {
    setWaterData(
      waterData.map((data) => {
        const newDataEl = data;
        if (data.id === id) {
          newDataEl.value = value;
          newDataEl.isValid = true;
          return newDataEl;
        }
        return data;
      })
    );
  }
  function onChangeBoiler(boiler: IBoilerData) {
    setChosenBoiler(boiler);
    setBoilerChecked(true);
  }

  function removeBoiler() {
    setChosenBoiler(undefined);
  }

  function isAllSelected() {
    let allSelected = true;
    setWaterData(
      waterData.map((data) => {
        if (data.isValid !== undefined && data.value.trim().length === 0) {
          allSelected = false;
          const newDataEl = data;
          newDataEl.isValid = false;
          return newDataEl;
        }
        return data;
      })
    );
    if (!chosenBoiler) {
      setBoilerChecked(false);
      allSelected = false;
    }
    return allSelected;
  }

  function showInput() {
    if (!isAllSelected()) {
      return;
    }
    console.log(waterData);
    console.log(chosenBoiler);
  }
  return (
    <>
      <WaterInputs waterData={waterData} update={update} />
      <button onClick={showInput}>click me</button>
      <BoilersTable
        onChangeBoiler={onChangeBoiler}
        removeBoiler={removeBoiler}
        chosenBoiler={chosenBoiler}
      />
      {!isBoilerChecked && <p>Необходимо выбрать котел для расчета</p>}
    </>
  );
}
