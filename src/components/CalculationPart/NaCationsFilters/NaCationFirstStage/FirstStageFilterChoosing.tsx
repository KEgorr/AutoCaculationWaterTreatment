import { BlockMath, InlineMath } from 'react-katex';
import waterData from '../../../../modules/Basic data/WaterData';
import { firstStageNaCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import {
  getFiltrationSpeed,
  getMaxFiltrationSpeed,
} from '../../../../modules/FiltersCalculation/filtersTools';
import { FilterStage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import { MChasDimension, TChasDimension } from '../../textVariables/dimensions';
import {
  F_na1,
  HardnessK,
  H_0Na1,
  H_o,
  omega,
  Q_na1,
  Q_na2,
} from '../../textVariables/symbos';
import FilterTable from '../filterTable';

export default function FirstStageFilterChoosing({ filters }: IFilterProps) {
  const { filtrationArea, filterPerformance, maxSpeed, normalSpeed, hardness } =
    firstStageNaCationFilter.getParams(FilterStage.NaCationFirstStage);

  const filtrationSpeed = getFiltrationSpeed(
    filterPerformance,
    filters.filtrationArea,
    filters.numberOfFilters
  );
  const filtrationMaxSpeed = getMaxFiltrationSpeed(
    filterPerformance,
    filters.filtrationArea,
    filters.numberOfFilters
  );
  let reserveFilters = 0;

  if (filters.numberOfFilters === 1 || filtrationMaxSpeed > maxSpeed) {
    reserveFilters = 1;
  }

  const filterPerformanceFormula = `\\tag{5.15} ${Q_na1} = ${Q_na2} + 0.285 = ${filterPerformance} \\ ${TChasDimension}`;

  const filtrationAreaFormula = `\\tag{5.16} ${F_na1} = \\frac{${Q_na1}}{${omega}_н} \\ м^2`;
  const filtrationAreaCalc = `${F_na1} = \\frac{${filterPerformance}}{${normalSpeed}} = ${filtrationArea} \\ м^2`;

  const hardnessFormula = `\\tag{5.17} ${H_0Na1} = ${H_o} - ${HardnessK} + 0.4 \\ мг·экв/кг`;
  const hardnessCalc = `${H_0Na1} = ${waterData.totalHardness} - ${waterData.carbonateHardness} + 0.4 = ${hardness} \\ мг·экв/кг`;

  const filtrationSpeedFormula = `\\tag{5.18} ${omega}_н = \\frac{${Q_na2}}{${F_na1} * a} ${MChasDimension}`;
  const filtrationSpeedCalc = `${omega}_н = \\frac{${filterPerformance}}{${filters.filtrationArea} * ${filters.numberOfFilters}} = ${filtrationSpeed} \\ ${MChasDimension}`;

  const filtrationMaxSpeedFormula = `\\tag{5.19} ${omega}_м = \\frac{${Q_na2}}{${F_na1} * (a-1)} ${MChasDimension}`;
  const filtrationMaxSpeedCalc = `${omega}_м = \\frac{${filterPerformance}}{${filters.filtrationArea} * (${filters.numberOfFilters} - 1)} = ${filtrationMaxSpeed} \\ ${MChasDimension} `;
  return (
    <>
      <p>
        Количество основных натрий-катионитных фильтров первой ступени, если
        установка работает круглосуточно, принимают не менее двух.
      </p>
      <p>
        Производительность фильтров зависит от производительности фильтров
        второй ступени Na-катионирования и вычисляется по формуле (5.15):
      </p>
      <BlockMath math={filterPerformanceFormula} />
      <p>
        Подбор диаметра натрий-катионных фильтров начинают с расчета необходимой
        общей площади фильтрации, которая должна обеспечивать оптимальную
        скорость фильтрации по формуле (5.16):
      </p>
      <BlockMath math={filtrationAreaFormula} />
      <p>
        При этом скорость фильтрации зависит от общей жесткости фильтрата,
        поступающего на фильтры первой ступени, которая вычисляется по формуле
        (5.17):
      </p>
      <BlockMath math={hardnessFormula} />
      <BlockMath math={hardnessCalc} />
      <p>
        <InlineMath math={H_0Na1} /> = {hardness}, поэтому нормальная скорость
        фильтрации не должна превышать {normalSpeed}{' '}
        <InlineMath math={MChasDimension} />, следовательно:
      </p>
      <BlockMath math={filtrationAreaCalc} />
      <p>
        Исходя из этого выбран фильтр {filters.name} в количестве{'  '}
        {filters.numberOfFilters} шт. Со следующей площадью фильтрации:{' '}
        {filters.filtrationArea} <InlineMath math={'м^2'} />.
      </p>
      {filters.numberOfFilters === 1 ? (
        <p>
          А также рекомендуется установить 1 резервный фильтр того же
          наименования для исправной работы установки при регенерации и ремонте
          основного фильтра.
        </p>
      ) : null}
      <p>
        Проверка фактической скорости фильтрования осуществляется по формулам
        (5.18) и (5.19) для нормальной и максимальной скорости фильтрации
        соответственно.
      </p>
      <BlockMath math={filtrationSpeedFormula} />
      <BlockMath math={filtrationMaxSpeedFormula} />
      {filters.numberOfFilters === 1 ? (
        <>
          <p>
            Так как предложен фильтр в количестве 1шт. максимальная скорость
            фильтрации будет равна нормальной.
          </p>
          <p>Таким образом:</p>
          <BlockMath math={filtrationSpeedCalc} />
        </>
      ) : (
        <>
          <p>Таким образом:</p>
          <BlockMath math={filtrationSpeedCalc} />
          <BlockMath math={filtrationMaxSpeedCalc} />
        </>
      )}
      <p>
        Данные значения не должны превышать не должны превышать {normalSpeed}{' '}
        <InlineMath math={MChasDimension} /> и {maxSpeed}{' '}
        <InlineMath math={MChasDimension} /> для нормальной и максимальной
        скорости соответственно.
      </p>
      {filtrationMaxSpeed > maxSpeed ? (
        <p className="calc-text_invalid">
          Максимальная скорость превышает допустимые нормы, для достижения
          оптимальных показателей рекомендуется установить дополнительный
          резервный фильтр того же наименования.
        </p>
      ) : (
        <p className="calc-text_valid">
          Подобранные фильтры удовлетворяют условиям.
        </p>
      )}
      <p>Характеристики фильтра {filters.name} представлены в таблице 5.4</p>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 5.4 характеристики {filters.name}
        </p>
        <FilterTable filters={filters} reserveFiltersNumber={reserveFilters} />
      </div>
    </>
  );
}
