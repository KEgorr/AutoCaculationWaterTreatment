import { useEffect, useState } from 'react';
import lightFilters from '../../../../modules/FiltersCalculation/LightFilters/LightFilters';
import { ICalcProps } from '../../../../types/data-types';
import LightFiltersChoosing from './LightFilterChoosing';

export default function LightFilters({ calcCount }: ICalcProps) {
  const filters = lightFilters.getFilter(3);

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
        8 Выбор и расчет осветительных фильтров
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className={isHide}>
          <LightFiltersChoosing filters={filters} />
        </div>
      </div>
    </div>
  );
}
