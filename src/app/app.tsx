import { useState } from 'react';
import MainCalculation from '../components/CalculationPart/MainCalculation';
import MainInput from '../components/Inputs/MainInput';

export default function App() {
  const [isCalculationVisible, setCalculation] = useState(false);
  const [newCalcCount, setNewCalcCount] = useState(0);

  function showCalculations() {
    setCalculation(true);
    setNewCalcCount((prev) => prev + 1);
  }
  return (
    <div className="wrapper">
      <h1 className="title">
        Автоматизированный расчет оборудования для водоподготовки паровых котлов
      </h1>
      <MainInput showCalculations={showCalculations} />
      {isCalculationVisible && <MainCalculation calcCount={newCalcCount} />}
    </div>
  );
}
