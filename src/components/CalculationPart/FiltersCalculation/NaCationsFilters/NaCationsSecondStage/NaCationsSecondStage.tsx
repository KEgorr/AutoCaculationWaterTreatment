import { secondStageNaCationFilter } from '../../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../../types/data-types';
import FilterChoosing from './FiltersChoosing';
import RegenerationNumberCalculation from './RegenerationNumberCalculationSecondStage';
import VariousCostCalcSecondStage from './VariousCostCalcSecondStage';

export default function NaCationsSecondStageFilters() {
  const filters = secondStageNaCationFilter.setValidFilters(
    FilterStage.NaCationSecondStage
  );

  return (
    <>
      <h3 className="calc-block__title">
        Выбор и расчет Na-катионных фильтров второй ступени
      </h3>
      <FilterChoosing filters={filters} />
      <p>
        Далее осуществляется расчет фильтров второй ступени катионирования по
        следующей методике:
      </p>
      <RegenerationNumberCalculation filters={filters} />
      <VariousCostCalcSecondStage filters={filters} />
    </>
  );
}
