import RecalculationWater from './RecalculationsWaterQuality/RecalculationWater';
import WaterTreatmentCalculation from './WaterTreatmentCalculation/WaterTreatmentCalculation';

export default function MainCalculation() {
  return (
    <div className="main-calc-block">
      <RecalculationWater />
      <WaterTreatmentCalculation />
    </div>
  );
}
