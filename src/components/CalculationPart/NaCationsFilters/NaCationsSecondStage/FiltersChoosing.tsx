import { BlockMath, InlineMath } from 'react-katex';
import {
  getFiltrationArea,
  getFiltrationSpeed,
  getMaxFiltrationSpeed,
} from '../../../../modules/FiltersCalculation/filtersTools';
import steamBalanceBoiler from '../../../../modules/SteamBalanceOfBoiler/steamBalanceOfBoiller';
import { IFilterProps } from '../../../../types/props-types';
import { MChasDimension, TChasDimension } from '../../textVariables/dimensions';
import { F_na2, omega, Q_na2 } from '../../textVariables/symbos';
import FilterTable from '../filterTable';

export default function FilterChoosing({ filters }: IFilterProps) {
  const filterPerformance = steamBalanceBoiler.getWTP();
  const filtrationAreaCalculated = getFiltrationArea(40, filterPerformance);
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

  if (filters.numberOfFilters === 1 || filtrationMaxSpeed > 50) {
    reserveFilters = 1;
  }

  const filtrationAreaFormula = `\\tag{5.1} ${F_na2} = \\frac{${Q_na2}}{${omega}_н} \\ м^2,`;
  const filtrationAreaCalc = `${F_na2} = \\frac{${filterPerformance}}{40} = ${filtrationAreaCalculated} \\ м^2`;

  const filtrationSpeedFormula = `\\tag{5.2} ${omega}_н = \\frac{${Q_na2}}{${F_na2} * a} ${MChasDimension},`;
  const filtrationSpeedCalc = `${omega}_н = \\frac{${filterPerformance}}{${filters.filtrationArea} * ${filters.numberOfFilters}} = ${filtrationSpeed} \\ ${MChasDimension}`;

  const filtrationMaxSpeedFormula = `\\tag{5.3} ${omega}_м = \\frac{${Q_na2}}{${F_na2} * (a-1)} ${MChasDimension} ,`;
  const filtrationMaxSpeedCalc = `${omega}_н = \\frac{${filterPerformance}}{${filters.filtrationArea} * (${filters.numberOfFilters} - 1)} = ${filtrationMaxSpeed} \\ ${MChasDimension}, `;
  return (
    <>
      <p>
        На второй ступени катионирования устанавливают обычно два фильтра
        специальной конструкции с высотой слоя катионита 1,5 м.
      </p>
      <p>
        При этом в целях сокращения количества устанавливаемого оборудования и
        его унификации допускается установка одного основного фильтра и одного
        резервного для обеспечения нормальной работы установки при регенерации и
        ремонте основного фильтра.
      </p>
      <p>
        Подбор диаметра натрий-катионных фильтров начинают с расчета необходимой
        общей площади фильтрации, которая должна обеспечивать оптимальную
        скорость фильтрации по формуле (5.1):
      </p>
      <BlockMath math={filtrationAreaFormula} />
      <p>
        где <InlineMath math={Q_na2} /> - производительность натрий-катионных
        фильтров второй ступени, принято равным производительности ВПУ (
        {filterPerformance} <InlineMath math={TChasDimension} />
        ); {'  '}
        <InlineMath math={`${omega}_н`} /> - нормальная скорость фильтрации,{' '}
        <InlineMath math={MChasDimension} />.
      </p>
      <p>
        Для натрий-катионных фильтров второй ступени нормальная скорость
        фильтрации не должна превышать 40 <InlineMath math={MChasDimension} />,
        следовательно:
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
        (5.2) и (5.3) для нормальной и максимальной скорости фильтрации
        соответственно.
      </p>
      <BlockMath math={filtrationSpeedFormula} />
      <BlockMath math={filtrationMaxSpeedFormula} />
      <p>
        где <InlineMath math={'a'} /> - количество используемых фильтров.
      </p>
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
        Данные значения не должны превышать не должны превышать 40{' '}
        <InlineMath math={MChasDimension} /> и 50{' '}
        <InlineMath math={MChasDimension} /> для нормальной и максимальной
        скорости соответственно.
      </p>
      {filtrationMaxSpeed > 50 ? (
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
      <p>Характеристики фильтра {filters.name} представлены в таблице 5.1</p>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 5.1 характеристики {filters.name}
        </p>
        <FilterTable filters={filters} reserveFiltersNumber={reserveFilters} />
      </div>
    </>
  );
}
