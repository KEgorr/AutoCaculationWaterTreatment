import getFeedWaterTreatmentScheme from '../../../../modules/WaterTreatmentCalculation/feedWaterTreatmentScheme';

export default function FeedWaterTreatmentScheme() {
  const { schemeImg, schemeText, schemeTittle } = getFeedWaterTreatmentScheme();

  return (
    <>
      <h3 className="calc-block__title">
        Выбор схемы обработки питательной воды
      </h3>
      <p>
        Выбор схемы обработки водопроводной воды для паровых котлов сводится к
        проверке возможности применения наиболее простой схемы
        натрий-катионирования по приведенным выше трем показателям.
      </p>
      <p>
        Исходя из полученных данных для обработки питательной воды выбрана
        схема: `<span className="scheme-choice">{schemeTittle}</span>`
        представленная на рисунке 3.1
      </p>
      <div className="calc-img__container">
        <img
          className="calc-img feed-water-treatment-scheme-img"
          src={schemeImg}
          alt=""
        />
        <p className="calc-img-title">Рисунок 3.1 - {schemeTittle}</p>
      </div>
      <p>{schemeText}</p>
    </>
  );
}
