import { useState } from 'react';
import MainCalculation from '../components/CalculationPart/MainCalculation';
import MainInput from '../components/Inputs/MainInput';

export default function App() {
  const [isCalculationVisible, setCalculation] = useState(false);

  function showCalculations() {
    setCalculation(true);
  }
  return (
    <div className="wrapper">
      <h1 className="title">
        Автоматизированный расчет оборудования для водоподготовки паровых котлов
      </h1>
      <MainInput showCalculations={showCalculations} />
      {isCalculationVisible && <MainCalculation />}
    </div>
  );
}
