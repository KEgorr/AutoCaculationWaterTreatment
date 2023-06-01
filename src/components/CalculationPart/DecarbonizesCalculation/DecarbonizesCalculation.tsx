import { useEffect, useState } from 'react';
import { ICalcProps } from '../../../types/data-types';
import CO2Calculation from './CO2Calculation/CO2Calculation';
import RashigCalculation from './RashigCalculation/RashigCalculation';

export default function DecarbonizesCalculation({ calcCount }: ICalcProps) {
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
        7 Расчет декарбонизатора
      </h2>
      <div
        className={
          isHidden
            ? 'calc-block block-hidden'
            : 'calc-block calc-block_cation-filters'
        }
      >
        <div className="calc-block__content">
          <p>
            Декарбонизаторы – аппараты скрубберного типа, служащие для удаления
            свободной углекислоты, выделяющейся в процессах
            водород-катионирования или подкисления воды. В ВПУ получили
            распространение декарбонизаторы двух типов: с насадкой из колец
            Рашига и с деревянной хордовой насадкой.
          </p>
          <p>
            Исходными данными для расчета декарбонизатора являются: количество и
            температура декарбонизируемой воды, содержание углекислоты до и
            после декарбонизатора.
          </p>
          <CO2Calculation />
          <RashigCalculation />
        </div>
      </div>
    </div>
  );
}
