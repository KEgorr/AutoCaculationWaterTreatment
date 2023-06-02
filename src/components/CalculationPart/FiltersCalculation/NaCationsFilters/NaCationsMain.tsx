import { useEffect, useState } from 'react';
import { ICalcProps } from '../../../../types/data-types';
import NaCationFirstStage from './NaCationFirstStage/NaCationFirstStage';
import NaCationsSecondStageFilters from './NaCationsSecondStage/NaCationsSecondStage';

export default function NaCationsFiltersMain({ calcCount }: ICalcProps) {
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
        5 Выбор и расчет Na-катионных фильтров
      </h2>
      <div
        className={
          isHidden
            ? 'calc-block block-hidden'
            : 'calc-block calc-block_cation-filters'
        }
      >
        <div className={isHide}>
          <NaCationsSecondStageFilters />
          <NaCationFirstStage />
        </div>
      </div>
    </div>
  );
}
