import { BlockMath, InlineMath } from 'react-katex';
import waterData from '../../../../modules/Basic data/WaterData';
import { hCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import {
  getFiltrationSpeed,
  getMaxFiltrationSpeed,
} from '../../../../modules/FiltersCalculation/filtersTools';
import { FilterStage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import { MChasDimension, TChasDimension } from '../../textVariables/dimensions';
import {
  F_h,
  HardnessK,
  H_g_h,
  H_ost_k,
  omega,
  Q_h,
  Q_na1,
  Q_na2,
} from '../../textVariables/symbols';
import FilterTable from '../filterTable';

export default function HFilterChoosing({ filters }: IFilterProps) {
  const { filtrationArea, filterPerformance, maxSpeed, normalSpeed, hardness } =
    hCationFilter.getParams(FilterStage.HCationStage);

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

  const filterPerformanceFormula = `\\tag{6.1} ${Q_h} = ${Q_na1} + ${Q_na2}= ${filterPerformance} \\ ${TChasDimension}`;

  const filtrationAreaFormula = `\\tag{6.2} ${F_h} = \\frac{${Q_h}}{${omega}_н} \\ м^2`;
  const filtrationAreaCalc = `${F_h} = \\frac{${filterPerformance}}{${normalSpeed}} = ${filtrationArea} \\ м^2`;

  const hardnessFormula = `\\tag{6.3} ${H_g_h} = ${HardnessK} - ${H_ost_k} \\ мг·экв/кг`;
  const hardnessCalc = `${H_g_h} = ${waterData.carbonateHardness} - 1.1 = ${hardness} \\ мг·экв/кг,`;

  const filtrationSpeedFormula = `\\tag{6.4} ${omega}_н = \\frac{${Q_h}}{${F_h} * a} ${MChasDimension}`;
  const filtrationSpeedCalc = `${omega}_н = \\frac{${filterPerformance}}{${filters.filtrationArea} * ${filters.numberOfFilters}} = ${filtrationSpeed} \\ ${MChasDimension}`;

  const filtrationMaxSpeedFormula = `\\tag{6.5} ${omega}_м = \\frac{${Q_h}}{${F_h} * (a-1)} ${MChasDimension}`;
  const filtrationMaxSpeedCalc = `${omega}_м = \\frac{${filterPerformance}}{${filters.filtrationArea} * (${filters.numberOfFilters} - 1)} = ${filtrationMaxSpeed} \\ ${MChasDimension} `;
  return (
    <>
      <p>
        Количество основных H-катионных фильтров принимают не менее трех. Однако
        в маломощных установках допускается меньшее количество фильтров для
        поддержания оптимальных скоростей фильтрации.
      </p>
      <p>
        Производительность водород-катионных фильтров с учетом расхода воды на
        собственные нужды натрий-катионных фильтров первой и второй ступеней
        определяется по формуле (6.1):
      </p>
      <BlockMath math={filterPerformanceFormula} />
      <p>
        Подбор диаметра водород-катионных фильтров начинают с расчета
        необходимой общей площади фильтрации, которая должна обеспечивать
        оптимальную скорость фильтрации по формуле (6.2):
      </p>
      <BlockMath math={filtrationAreaFormula} />
      <p>
        При этом скорость фильтрации зависит от общей жесткости фильтрата,
        поступающего на фильтры по формуле (6.3):
      </p>
      <BlockMath math={hardnessFormula} />
      <p>
        где <InlineMath math={H_ost_k} /> - остаточная карбонатная жесткость,
        принимается в соответствии с требованиями, предъявляемыми к
        водород-катионированной воде, находится в интервале 0,7-1,5 мг-экв/кг.
        Принято равным 1.1 мг-экв/кг
      </p>
      <BlockMath math={hardnessCalc} />
      <p>
        <InlineMath math={H_g_h} /> = {hardness}, поэтому нормальная скорость
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
        (6.4) и (6.5) для нормальной и максимальной скорости фильтрации
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
      <p>Характеристики фильтра {filters.name} представлены в таблице 6.1</p>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 6.1 характеристики {filters.name}
        </p>
        <FilterTable filters={filters} reserveFiltersNumber={reserveFilters} />
      </div>
    </>
  );
}
