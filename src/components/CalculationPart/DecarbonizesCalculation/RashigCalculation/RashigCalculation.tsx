import { BlockMath, InlineMath } from 'react-katex';
import decarbonizes from '../../../../modules/Decarbonizes/Decarbonizes';
import { CO2 } from '../../textVariables/chemicalText';
import { delta_sr, k_H, V_kr } from '../../textVariables/symbols';
import desorptionFromTemperatureGraph from '../../../../assets/imgs/desorption-from-temperature-graph.png';
import averageDrivingForceDesorptionGraph from '../../../../assets/imgs/average-driving-force-desorption-graph.png';
import { hCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../types/data-types';
import { TChasDimension } from '../../textVariables/dimensions';

export default function RashigCalculation() {
  const G = decarbonizes.getG();
  const kH = decarbonizes.getKH();
  const CO2Calc = decarbonizes.getCO2();
  const deltaSr = decarbonizes.getDeltaSr(CO2Calc);
  const F = decarbonizes.getF();
  const FFormula = `\\tag{7.4} F = \\frac{G}{${k_H}${delta_sr}} \\ м^2,`;
  const FCalc = `F = \\frac{${G}}{${kH}${deltaSr}} = ${F} \\ м^2,`;

  const Vkr = decarbonizes.getVkr();
  const VkrFormula = `\\tag{7.5} ${V_kr} = \\frac{F}{204} \\ м^3,`;
  const VkrCalc = `${V_kr} = \\frac{${F}}{204} = ${Vkr} \\ м^3`;

  const { filterPerformance } = hCationFilter.getParams(
    FilterStage.HCationStage
  );
  const f = decarbonizes.getf();
  const fFormula = `\\tag{7.6} f = \\frac{Q}{60} \\ м^2,`;
  const fCalc = `f = \\frac{${filterPerformance}}{60} \\ м^2`;

  const D = decarbonizes.getD();
  const DFormula = `\\tag{7.7} D = \\sqrt{\\frac{4f}{\\pi}} \\ м`;
  const DCalc = `D = \\sqrt{\\frac{4 * ${f}}{3.14}} = ${D} \\ м`;

  const h = decarbonizes.geth();
  const hFormula = `\\tag{7.8} h = \\frac{${V_kr}}{f} \\ м`;
  const hCalc = `h = \\frac{${Vkr}}{${f}} = ${h} \\ м`;

  return (
    <>
      <p>Поверхность насадки из колец Рашига определяется по формуле (7.4):</p>
      <BlockMath math={FFormula} />
      <p>
        где <InlineMath math={k_H} /> = {kH} м/ч - коэффициент десорбции
        углекислоты, определяется для 20 °C по графику, представленном на
        рисунке 7.2;
      </p>
      <p>
        <InlineMath math={delta_sr} /> - средняя движущая сила десорбции,
        определяется по графику, представленном на рисунке (7.3),
        <InlineMath math={CO2} /> = {CO2Calc} мг/л, тогда{' '}
        <InlineMath math={delta_sr} /> = {deltaSr} <InlineMath math="кг/м^3" />.
      </p>
      <div className="calc-img__container">
        <img
          className="calc-img desorption-temperature-img"
          src={desorptionFromTemperatureGraph}
          alt=""
        />
        <p className="calc-img-title">
          Рисунок 7.2 - График зависимости коэффициента десорбции от температуры
        </p>
      </div>
      <div className="calc-img__container">
        <img
          className="calc-img average-driving-force-desorption-img"
          src={averageDrivingForceDesorptionGraph}
          alt=""
        />
        <p className="calc-img-title">
          Рисунок 7.3 - График зависимости средней движущей силы десорбции от
          концентрации углекислоты в воде до декарбонизатора
        </p>
      </div>
      <p>Таким образом поверхность насадки из колец Рашига будет равно:</p>
      <BlockMath math={FCalc} />
      <p>Объем колец Рашига определяется по формуле (7.5):</p>
      <BlockMath math={VkrFormula} />
      <p>
        где 204 – поверхность насадки из колец Рашига 25 × 25 × 3 при
        беспорядочной загрузке, <InlineMath math="м^3/м^3" />
      </p>
      <BlockMath math={VkrCalc} />
      <p>
        Площадь поперечного сечения декарбонизатора определяется по формуле
        (7.6)
      </p>
      <BlockMath math={fFormula} />
      <p>
        где <InlineMath math="Q" /> = {filterPerformance}{' '}
        <InlineMath math={TChasDimension} /> - производительность
        декарбонизатора, принятая как производительность H-катионных фильтров с
        учетом расхода воды на собственные нужды Na-катионных фильтров первой и
        второй ступеней.
      </p>
      <BlockMath math={fCalc} />
      <p>Диаметр декарбонизатора определяется по формуле (7.7):</p>
      <BlockMath math={DFormula} />
      <BlockMath math={DCalc} />
      <p>Высота насадки из колец Рашига находится по формуле (7.8):</p>
      <BlockMath math={hFormula} />
      <BlockMath math={hCalc} />
    </>
  );
}
