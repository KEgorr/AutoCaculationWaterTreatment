import { useEffect, useState } from 'react';
import { InlineMath } from 'react-katex';
import getDeaerators from '../../../modules/Deaerators/deaeratorsChosing';
import steamBalanceBoiler from '../../../modules/SteamBalanceOfBoiler/steamBalanceOfBoiller';
import { ICalcProps } from '../../../types/data-types';
import { TChasDimension } from '../textVariables/dimensions';
import DeaeratorsTable from './DeaeratorTable';

export default function Deaerators({ calcCount }: ICalcProps) {
  const [isHidden, setHidden] = useState(true);

  function changeVisibility() {
    if (isHidden) {
      setHidden(false);
      return;
    }
    setHidden(true);
  }

  const deaerator = getDeaerators(1);
  const performance = steamBalanceBoiler.getWTP();

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
        10 Выбор деаэратора
      </h2>
      <div
        className={
          isHidden
            ? 'calc-block block-hidden'
            : 'calc-block calc-block_cation-filters'
        }
      >
        <div className="calc-block__content">
          <div className="calc-block__table-container">
            <p>Деаэраторы должны обеспечивать:</p>
            <p>– устойчивую работу в судовых условиях;</p>
            <p>
              – массовую концентрацию кислорода в конденсате после деаэрации не
              более 0,02 мг/дм³, при массовой концентрации кислорода до
              деаэрации не более 2 мг/дм³.
            </p>
            <p>
              В энергетических установках давление в деаэраторах определяется
              принципиальной тепловой схемой силовой установки и находится в
              пределах от 0.025 до 0.250 МПа.
            </p>
            <p>
              На судах морского флота наибольшее применение получили термические
              Деаэраторы, в которых конденсат нагревается, смешиваясь с паром, а
              растворенные газы выделяются и отводятся вместе с паром. Очищенная
              вода собирается в баке Деаэратора. Емкость бака обеспечивает
              работу в течение 12–15 мин. без поступлений конденсата и пара,
              благодаря чему регулируется питание котла на переменных режимах.
            </p>
            <p>
              К данной схеме ВПУ предложен деаэратор {deaerator.name}{' '}
              атмосферного давления, на основании производительности деаэратора,
              близкой к производительности ВПУ = {performance}{' '}
              <InlineMath math={TChasDimension} />, а также возможности удаления
              из воды излишки кислорода до нормативных значений. Характеристики
              предложенного деаэратора представлены в таблице 10.1.
            </p>
            <p className="table-tittle">
              Таблица 10.1 Характеристики осветителя {deaerator.name}
            </p>
            <DeaeratorsTable deaerator={deaerator} />
          </div>
        </div>
      </div>
    </div>
  );
}
