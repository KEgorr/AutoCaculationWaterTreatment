import { firstStageNaCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../types/data-types';
import FirstStageFilterChoosing from './FirstStageFilterChoosing';
import RegenerationNumberFirstStage from './RegenerationNumberFirstStage';
import VariousCostCalcFirstStage from './VariousCostFirstStage';

export default function NaCationFirstStage() {
  const filters = firstStageNaCationFilter.setValidFilters(
    FilterStage.NaCationFirstStage
  );

  return (
    <>
      <h3 className="calc-block__title">
        Выбор и расчет Na-катионных фильтров первой ступени
      </h3>
      <FirstStageFilterChoosing filters={filters} />
      <p>
        Далее осуществляется расчет фильтров первой ступени катионирования по
        следующей методике:
      </p>
      <RegenerationNumberFirstStage filters={filters} />
      <VariousCostCalcFirstStage filters={filters} />
    </>
  );
}
