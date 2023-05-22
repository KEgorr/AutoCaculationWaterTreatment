import { useState } from 'react';
import getFeedWaterTreatmentScheme from '../../../modules/WaterTreatmentCalculation/FeedWaterTreatmentScheme';

export default function WaterTreatmentScheme() {
  const [isHidden, setHidden] = useState(true);

  function changeVisibility() {
    if (isHidden) {
      setHidden(false);
      return;
    }
    setHidden(true);
  }

  const { schemeImg, schemeText, schemeTittle } = getFeedWaterTreatmentScheme();

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
        Выбор схемы водоподготовительной установки
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className="calc-block__content">
          <h3 className="calc-block__title">
            Выбор схемы обработки питательной воды
          </h3>
          <p>
            Исходя из полученных данных для обработки питательной воды выбрана
            схема: `<span className="scheme-choice">{schemeTittle}</span>`
            представленная на рисунке 1.
          </p>
          <img
            className="calc-img feed-water-treatment-scheme-img"
            src={schemeImg}
            alt=""
          />
          <p className="calc-img-title">Рисунок 1 - {schemeTittle}</p>
          <p>{schemeText}</p>
        </div>
      </div>
    </div>
  );
}
