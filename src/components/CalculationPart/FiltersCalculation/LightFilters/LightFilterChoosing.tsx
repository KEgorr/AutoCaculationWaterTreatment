import { BlockMath, InlineMath } from 'react-katex';
import lightFilters from '../../../../modules/FiltersCalculation/LightFilters/LightFilters';
import steamBalanceBoiler from '../../../../modules/SteamBalanceOfBoiler/steamBalanceOfBoiller';
import { IFilterProps } from '../../../../types/props-types';
import { MChasDimension } from '../../textVariables/dimensions';
import { omega } from '../../textVariables/symbols';
import FilterTable from '../filterTable';
import FilterDiggingDataTable from './FilterDiggingDataTable';

export default function LightFiltersChoosing({ filters }: IFilterProps) {
  const maxSpeed = lightFilters.getRequiredMaxSpeed();
  const normalSpeed = lightFilters.getRequiredNormalSpeed();

  const filtrationMaxSpeed = lightFilters.getForceSpeed(filters);
  const reserveFilters = 0;

  const filtrationArea = lightFilters.getMaxFiltrationArea();
  const a = lightFilters.geta();
  const filterPerformance = steamBalanceBoiler.getWTP();
  const filtrationAreaFormula = `\\tag{8.1} F = \\frac{Qa}{${omega}_н} \\ м^2,`;
  const filtrationAreaCalc = `F = \\frac{${filterPerformance} * ${a}}{${normalSpeed}} = ${filtrationArea} \\ м^2`;

  const oneFilterArea = lightFilters.getOneFilterArea();
  const oneFilterAreaFormula = `\\tag{8.2} f' = \\frac{F}{n - 1} \\ м^2,`;
  const oneFilterAreaCalc = `f' = \\frac{${filtrationArea}}{${filters.numberOfFilters} - 1} = ${oneFilterArea} \\ м^2`;

  const q = lightFilters.getq(filters);
  const d = lightFilters.getd(filters);
  const qFormula = `\\tag{8.5} q = \\frac{drn}{24} \\ м^3/ч,`;
  const qCalc = `q = \\frac{${d} * 1 * ${filters.numberOfFilters}}{24} = ${q} \\ м^3/ч`;

  const filtrationSpeed = lightFilters.getNormalSpeed(filters);
  const filtrationSpeedFormula = `\\tag{8.3} ${omega}_н = \\frac{Q + q}{f(n - 1)} ${MChasDimension},`;
  const filtrationSpeedCalc = `${omega}_н = \\frac{${filterPerformance} + ${q}}{${filters.filtrationArea} * (${filters.numberOfFilters} - 1)} = ${filtrationSpeed} \\ ${MChasDimension}`;

  const filtrationMaxSpeedFormula = `\\tag{8.4} ${omega}_ф = \\frac{Q + q}{f(n - 2)} ${MChasDimension},`;
  const filtrationMaxSpeedCalc = `${omega}_ф = \\frac{${filterPerformance} + ${q}}{${filters.filtrationArea} * (${filters.numberOfFilters} - 2)} = ${filtrationMaxSpeed} \\ ${MChasDimension} `;
  return (
    <>
      <p>Количество основных осветительных фильтров принимают не менее трех.</p>
      <p>
        В расчете рассматриваются два режима работы фильтров: нормальный,
        предусматривающий работу фильтров с периодическим отключением одного из
        них на промывку; форсированный, предусматривающий отключение одного
        фильтра на ремонт и периодическое отключение другого фильтра на
        промывку.
      </p>
      <p>
        Подбор диаметра осветительных фильтров начинают с расчета необходимой
        общей площади фильтрации, которая должна обеспечивать оптимальную
        скорость фильтрации по формуле (8.1):
      </p>
      <BlockMath math={filtrationAreaFormula} />
      <p>
        где Q = {filterPerformance} - производительность фильтров по осветленной
        воде, принято равной производительности ВПУ;
      </p>
      <p>
        <InlineMath math="a" /> = {a} - коэффициент, учитывающий расход
        осветленной воды на собственные нужды осветлительных фильтров;для
        фильтров, промываемых осветленной водой и загруженных антрацитом, в
        зависимости от числа промывок в сутки (1 – 2 раза).
      </p>
      <BlockMath math={filtrationAreaCalc} />
      <p>
        Расчетную площадь фильтрования каждого фильтра определяется по формуле
        (8.2):
      </p>
      <BlockMath math={oneFilterAreaFormula} />
      <p>
        где <InlineMath math="n" /> - число фильтров, необходимых для
        удовлетворения условий скорости для нормального и форсированного режима
        фильтрации.
      </p>
      <BlockMath math={oneFilterAreaCalc} />
      <p>
        Исходя из этого выбран фильтр {filters.name} в количестве{'  '}
        {filters.numberOfFilters} шт. Со следующей площадью фильтрации:{' '}
        {filters.filtrationArea} <InlineMath math={'м^2'} />.
      </p>
      <p>
        Проверка фактической скорости фильтрования осуществляется по формулам
        (8.3) и (8.4) для нормального и форсированного режима фильтрации
        соответственно.
      </p>
      <BlockMath math={filtrationSpeedFormula} />
      <BlockMath math={filtrationMaxSpeedFormula} />
      <p>
        где <InlineMath math="q" /> - среднечасовой расход воды на собственные
        нужды осветлительных фильтров, который определяется по формуле (8.5):
      </p>
      <BlockMath math={qFormula} />
      <p>
        где <InlineMath math="d" /> = {d} <InlineMath math="м^3" /> - расход
        воды на одну промывку фильтра, при взрыхляющей промывке осветительной
        водой, принимается по таблице 8.1;
      </p>
      <p>
        <InlineMath math="r" /> = 1 - число промывок каждого фильтра в сутки;
      </p>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 8.1 Расчетные показатели для взрыхления однопоточных
          антрацитных осветлительных фильтров
        </p>
        <FilterDiggingDataTable />
      </div>
      <p>Тогда среднечасовой расход воды будет равен:</p>
      <BlockMath math={qCalc} />
      <p>Таким образом:</p>
      <BlockMath math={filtrationSpeedCalc} />
      <BlockMath math={filtrationMaxSpeedCalc} />
      <p>
        Данные значения не должны превышать не должны превышать {normalSpeed}{' '}
        <InlineMath math={MChasDimension} /> и {maxSpeed}{' '}
        <InlineMath math={MChasDimension} /> для нормальной и максимальной
        скорости соответственно.
      </p>
      <p>Характеристики фильтра {filters.name} представлены в таблице 8.2</p>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 8.2 характеристики {filters.name}
        </p>
        <FilterTable filters={filters} reserveFiltersNumber={reserveFilters} />
      </div>
    </>
  );
}
