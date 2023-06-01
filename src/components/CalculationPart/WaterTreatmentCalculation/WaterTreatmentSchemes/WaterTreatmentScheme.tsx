import { useEffect, useState } from 'react';
import { ICalcProps } from '../../../../types/data-types';
import AdditionalWaterScheme from './AdditionalWaterScheme';
import FeedWaterTreatmentScheme from './FeedWaterScheme';

export default function WaterTreatmentScheme({ calcCount }: ICalcProps) {
  const [isHidden, setHidden] = useState(true);

  function changeVisibility() {
    if (isHidden) {
      setHidden(false);
      return;
    }
    setHidden(true);
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
        3 Выбор схемы водоподготовительной установки
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className="calc-block__content">
          <FeedWaterTreatmentScheme />
          <AdditionalWaterScheme />
        </div>
      </div>
    </div>
  );
}
