import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IBoilerData } from '../../types/data-types';
import BoilersTable from './boilerInput/BoilerTable';
import waterDataInitial from './data/usual-input-data-initial';
import WaterInputs from './waterInput/WaterInputs';
import newWaterData from '../../modules/Basic data/WaterData';
import boilerData from '../../modules/Basic data/BoilerData';
import {
  changeWaterDataByQueryString,
  changeQueryStringWaterData,
  setQueryStringBoiler,
} from '../../modules/DataByQueryString/DataByQueryString';

interface IMainInputProps {
  showCalculations: () => void;
}

export default function MainInput({ showCalculations }: IMainInputProps) {
  const [waterData, setWaterData] = useState(waterDataInitial);
  const [chosenBoiler, setChosenBoiler] = useState<IBoilerData>();
  const [isBoilerChecked, setBoilerChecked] = useState(true);
  const [waterDataSearchParams] = useSearchParams();

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
    changeQueryStringWaterData(waterData);
  }

  useEffect(() => {
    const newData = changeWaterDataByQueryString(waterData);
    setWaterData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waterDataSearchParams]);

  function onChangeBoiler(boiler: IBoilerData) {
    setChosenBoiler(boiler);
    setBoilerChecked(true);
    setQueryStringBoiler(boiler);
  }

  function removeBoiler() {
    setQueryStringBoiler(chosenBoiler, true);
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
    newWaterData.setWaterData(waterData);
    if (chosenBoiler) {
      boilerData.setBoilerData(chosenBoiler);
    }
    showCalculations();
  }
  return (
    <>
      <WaterInputs waterData={waterData} update={update} />
      <BoilersTable
        onChangeBoiler={onChangeBoiler}
        removeBoiler={removeBoiler}
        chosenBoiler={chosenBoiler}
      />
      <button className="common-button main-button" onClick={showInput}>
        Выполнить расчет
      </button>
      {!isBoilerChecked && (
        <p className="boiler-error-massage">
          Необходимо выбрать котел для расчета
        </p>
      )}
    </>
  );
}
