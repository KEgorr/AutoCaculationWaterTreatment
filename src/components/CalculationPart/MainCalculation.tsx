import RecalculationWater from './RecalculationsWaterQuality/RecalculationWater';
import WaterTreatmentScheme from './WaterTreatmentCalculation/WaterTreatmentSchemes/WaterTreatmentScheme';
import WaterTreatmentCalculation from './WaterTreatmentCalculation/WaterTreatmentCalculation';
import SteamBalanceBoilers from './SteamBalanceOfBoilers/SteamBalanceOfBoilers';
import NaCationsFiltersMain from './FiltersCalculation/NaCationsFilters/NaCationsMain';

export default function MainCalculation() {
  return (
    <div className="main-calc-block">
      <RecalculationWater />
      <WaterTreatmentCalculation />
      <WaterTreatmentScheme />
      <SteamBalanceBoilers />
      <NaCationsFiltersMain />
    </div>
  );
}
