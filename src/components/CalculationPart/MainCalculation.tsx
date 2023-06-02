import RecalculationWater from './RecalculationsWaterQuality/RecalculationWater';
import WaterTreatmentScheme from './WaterTreatmentCalculation/WaterTreatmentSchemes/WaterTreatmentScheme';
import WaterTreatmentCalculation from './WaterTreatmentCalculation/WaterTreatmentCalculation';
import SteamBalanceBoilers from './SteamBalanceOfBoilers/SteamBalanceOfBoilers';
import NaCationsFiltersMain from './FiltersCalculation/NaCationsFilters/NaCationsMain';
import HCationFilters from './FiltersCalculation/HCationsFilters/HCationsFilters';
import DecarbonizesCalculation from './DecarbonizesCalculation/DecarbonizesCalculation';
import LightFilters from './FiltersCalculation/LightFilters/LightFilters';
import Brighteners from './BrightenersCalculation/Brighteners';
import Deaerators from './Deaerators/Deaerators';
import { ICalcProps } from '../../types/data-types';

export default function MainCalculation({ calcCount }: ICalcProps) {
  return (
    <>
      <div className="main-calc-block">
        <RecalculationWater calcCount={calcCount} />
        <WaterTreatmentCalculation calcCount={calcCount} />
        <WaterTreatmentScheme calcCount={calcCount} />
        <SteamBalanceBoilers calcCount={calcCount} />
        <NaCationsFiltersMain calcCount={calcCount} />
        <HCationFilters calcCount={calcCount} />
        <DecarbonizesCalculation calcCount={calcCount} />
        <LightFilters calcCount={calcCount} />
        <Brighteners calcCount={calcCount} />
        <Deaerators calcCount={calcCount} />
      </div>
      <button
        className="common-button main-button"
        onClick={() => window.print()}
      >
        Печать/Экспорт отчета в PDF
      </button>
    </>
  );
}
