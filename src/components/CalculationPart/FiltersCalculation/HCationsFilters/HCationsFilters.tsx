import { useEffect, useState } from 'react';
import { hCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage, ICalcProps } from '../../../../types/data-types';
import HFilterChoosing from './HFilterChoosing';
import RegenerationNumberHStage from './RegenerationNumberHStage';
import TimesCalculationHFilter from './TimesCalculationHFilter';
import VariousCostCalcHStage from './VariousCostHStage';

export default function HCationFilters({ calcCount }: ICalcProps) {
  const filters = hCationFilter.setValidFilters(FilterStage.HCationStage);

  const [isHidden, setHidden] = useState(true);
  const [isHide, setHide] = useState('calc-block__content content-hide');

  function changeVisibility() {
    if (isHidden) {
      setHidden(false);
      setHide('calc-block__content');
      return;
    }
    setHidden(true);
    setTimeout(() => {
      setHide('calc-block__content content-hide');
    }, 500);
  }

  useEffect(() => setHidden(true), [calcCount]);
  return (
    <div>
      <h2
        className={
          isHidden
            ? 'calc-block-tittle'
            : 'calc-block-tittle calc-block-tittle__rounded'
        }
        onClick={changeVisibility}
      >
        6 Выбор и расчет H-катионных фильтров
      </h2>
      <div
        className={
          isHidden
            ? 'calc-block block-hidden'
            : 'calc-block calc-block_cation-filters'
        }
      >
        <div className={isHide}>
          <HFilterChoosing filters={filters} />
          <p>
            Далее осуществляется расчет фильтров второй ступени катионирования
            по следующей методике:
          </p>
          <RegenerationNumberHStage filters={filters} />
          <VariousCostCalcHStage filters={filters} />
          <TimesCalculationHFilter filters={filters} />
        </div>
      </div>
    </div>
  );
}
