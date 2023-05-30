import { BlockMath, InlineMath } from 'react-katex';
import waterData from '../../../../modules/Basic data/WaterData';
import decarbonizes from '../../../../modules/Decarbonizes/Decarbonizes';
import { CO2, CO2_IV, CO2_ov, CO2_tab } from '../../textVariables/chemicalText';
import { alpha, HardnessK, Q_h } from '../../textVariables/symbols';
import AlphaCorrectionTable from './AlphaCorrectionTable';
import NomogramFreeCO2 from '../../../../assets/imgs/NomogramFreeCO2.png';
import { hCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../types/data-types';

export default function CO2Calculation() {
  const CO2Calculated = decarbonizes.getCO2();
  const CO2KGM = decarbonizes.getCO2KGM();
  const { carbonateHardness, dryResidue, alkalinity } = waterData;
  const { filterPerformance } = hCationFilter.getParams(
    FilterStage.HCationStage
  );
  const CO2IV = decarbonizes.getCO2IV();
  const CO2tab = decarbonizes.getCO2tab();
  const alphaCalculated = decarbonizes.getAlpha();
  const G = decarbonizes.getG();

  const CO2Formula = `\\tag{7.1} ${CO2} = 44${HardnessK} + ${CO2_IV} \\ мг/л,`;
  const CO2Calc = `${CO2} = 44 * ${carbonateHardness} + ${CO2IV} = ${CO2Calculated} \\ мг/л`;

  const CO2IVFormula = `\\tag{7.2} ${CO2_IV} = ${CO2_tab} ∙ ${alpha} \\ мг/кг,`;
  const CO2IVCalc = `${CO2_IV} = ${CO2tab} * ${alphaCalculated} = ${CO2IV} \\ мг/кг`;

  const GFormula = `\\tag{7.3} G = ${Q_h}(${CO2} - ${CO2_ov}) \\ кг/час,`;
  const GCalc = `G = ${filterPerformance}(${CO2KGM} - 0.005) = ${G} \\ кг/час`;

  return (
    <>
      <p>
        Концентрация растворенной в воде углекислоты, поступающей на
        декарбонизатор определяется по формуле (7.1):
      </p>
      <BlockMath math={CO2Formula} />
      <p>
        <InlineMath math={HardnessK} /> = {carbonateHardness} мг·экв/кг -
        карбонатная жесткость исходной воды;
      </p>
      <p>
        <InlineMath math={CO2_IV} /> мг/л - концентрация растворенной свободной
        углекислоты в исходной воде, определяется по формуле (7.2):
      </p>
      <BlockMath math={CO2IVFormula} />
      <p>
        где <InlineMath math={CO2_tab} /> мг/л - концентрация свободной
        углекислоты, определяемая по номограмме, представленная на рисунке 7.1,
        щелочность исходной воды = {alkalinity}, тогда{' '}
        <InlineMath math={CO2_tab} /> = {CO2tab} мг/л;
      </p>
      <p>
        <InlineMath math={alpha} /> - поправочный коэффициент на сухой остаток
        исходной воды, определяется по данным таблицы 7.1, сухой остаток
        исходной воды равен = {dryResidue}, тогда <InlineMath math={alpha} /> ={' '}
        {alphaCalculated}.
      </p>
      <div className="calc-img__container">
        <img
          className="calc-img nomogram-free-CO2-img"
          src={NomogramFreeCO2}
          alt=""
        />
        <p className="calc-img-title">
          Рисунок 7.1 - Номограмма для определения в воде свободной углекислоты
        </p>
      </div>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 7.1 Данные для выбора поправочного коэффициента на сухой
          остаток исходной воды
        </p>
        <AlphaCorrectionTable />
      </div>
      <p>
        Таким образом <InlineMath math={CO2_IV} /> будет равно:
      </p>
      <BlockMath math={CO2IVCalc} />
      <p>А концентрация растворенной в воде углекислоты будет рана:</p>
      <BlockMath math={CO2Calc} />
      <p>
        Количество углекислоты, подлежащей удалению в декарбонизаторе, находится
        по формуле (7.3):
      </p>
      <BlockMath math={GFormula} />
      <p>
        где <InlineMath math={CO2_ov} /> = 0.005 <InlineMath math="кг/м^3" /> -
        концентрация углекислоты в декарбонизированной воде;{' '}
        <InlineMath math={CO2} /> неоходимо перевести из{' '}
        <InlineMath math="мг/л" /> в <InlineMath math="кг/м^3" />, поэтому{' '}
        <InlineMath math={CO2} /> = {CO2KGM}
      </p>
      <BlockMath math={GCalc} />
    </>
  );
}
