import RecalculationWater from './RecalculationsWaterQuality/RecalculationWater';
import WaterTreatmentScheme from './WaterTreatmentCalculation/WaterTreatmentSchemes/WaterTreatmentScheme';
import WaterTreatmentCalculation from './WaterTreatmentCalculation/WaterTreatmentCalculation';
import SteamBalanceBoilers from './SteamBalanceOfBoilers/SteamBalanceOfBoilers';
import NaCationsFiltersMain from './FiltersCalculation/NaCationsFilters/NaCationsMain';
import HCationFilters from './FiltersCalculation/HCationsFilters/HCationsFilters';
import DecarbonizesCalculation from './DecarbonizesCalculation/DecarbonizesCalculation';
import LightFilters from './FiltersCalculation/LightFilters/LightFilters';
import Brighteners from './BrightenersCalculation/Brighteners';

export default function MainCalculation() {
  return (
    <div className="main-calc-block">
      <RecalculationWater />
      <WaterTreatmentCalculation />
      <WaterTreatmentScheme />
      <SteamBalanceBoilers />
      <NaCationsFiltersMain />
      <HCationFilters />
      <DecarbonizesCalculation />
      <LightFilters />
      <Brighteners />
    </div>
  );
}
