import { useState } from 'react';
import NaCationFirstStage from './NaCationFirstStage/NaCationFirstStage';
import NaCationsSecondStageFilters from './NaCationsSecondStage/NaCationsSecondStage';

export default function NaCationsFiltersMain() {
  const [isHidden, setHidden] = useState(true);

  function changeVisibility() {
    if (isHidden) {
      setHidden(false);
      return;
    }
    setHidden(true);
  }

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
        <div className="calc-block__content">
          <NaCationsSecondStageFilters />
          <NaCationFirstStage />
        </div>
      </div>
    </div>
  );
}
