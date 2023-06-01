import { useState } from 'react';
import waterData from '../../../modules/Basic data/WaterData';
import LimingCalculation from './LimingCalculation';
import CoagulationCalculation from './CoagulationCalculation';
import BrightenersChoosing from './BrightenersChoosing';
import { BrightenersType } from '../../../types/data-types';

export default function Brighteners() {
  const [isHidden, setHidden] = useState(true);
  const { carbonateHardness } = waterData;

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
        9 Выбор и расчет осветителей
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
            Основные расчетные параметры осветлителей зависят от таких факторов:
            свойств исходной воды, методов ее обработки, температуры подогрева
            воды, размеров аппарата и других данных, определяемых
            экспериментальным путем или при технологических испытаниях
            аналогичных аппаратов, работающих в определенных условиях; поэтому
            осветлители следует подбирать по производительности, определяемой по
            среднечасовому расходу воды, который учитывает полную
            производительность водоподготовительной установки и расход
            осветленной воды на собственные нужды с учетом продувки самого
            осветлителя.
          </p>
          <p>
            В водоподготовительных установках котельных, как правило, применяют
            конструкции осветлителей типа ЦНИИ МПС, работающих со взвешенным
            шламовым фильтром, количество которого определяется в зависимости от
            качества исходной воды и схемы ее обработки.
          </p>
          {carbonateHardness > 2 ? (
            <>
              <LimingCalculation />
              <BrightenersChoosing brightenersType={BrightenersType.liming} />
            </>
          ) : (
            <>
              <CoagulationCalculation />
              <BrightenersChoosing
                brightenersType={BrightenersType.coagulation}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
