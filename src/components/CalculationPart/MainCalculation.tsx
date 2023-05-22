import RecalculationWater from './RecalculationsWaterQuality/RecalculationWater';
import WaterTreatmentScheme from './WaterTreatmentCalculation/WaterTreatmentScheme';
import WaterTreatmentCalculation from './WaterTreatmentCalculation/WaterTreatmentCalculation';

export default function MainCalculation() {
  return (
    <div className="main-calc-block">
      <RecalculationWater />
      <WaterTreatmentCalculation />
      <WaterTreatmentScheme />
    </div>
  );
}
