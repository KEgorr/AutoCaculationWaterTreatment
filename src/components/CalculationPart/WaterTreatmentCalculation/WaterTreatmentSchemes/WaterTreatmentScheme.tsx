import { useEffect, useState } from 'react';
import { ICalcProps } from '../../../../types/data-types';
import AdditionalWaterScheme from './AdditionalWaterScheme';
import FeedWaterTreatmentScheme from './FeedWaterScheme';

export default function WaterTreatmentScheme({ calcCount }: ICalcProps) {
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
        3 Выбор схемы водоподготовительной установки
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className={isHide}>
          <FeedWaterTreatmentScheme />
          <AdditionalWaterScheme />
        </div>
      </div>
    </div>
  );
}
