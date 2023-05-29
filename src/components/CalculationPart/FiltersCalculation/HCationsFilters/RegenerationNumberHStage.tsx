import { BlockMath, InlineMath } from 'react-katex';
import { hCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import waterIonicComposition from '../../../../modules/WaterIonicComposition/waterIonicComposition';
import { FilterStage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import {
  alpha_h,
  C_k,
  Ep_H,
  E_p,
  H_g_h,
  n_H,
  Q_h,
  q_k,
  V_k,
} from '../../textVariables/symbols';
import AlphaTableH from './AlphaTabeH';

export default function RegenerationNumberHStage({ filters }: IFilterProps) {
  const { alpha, filterPerformance, hardness, q, qc } = hCationFilter.getParams(
    FilterStage.HCationStage
  );
  const cationsSum = waterIonicComposition.getCationsSum();
  const A = hCationFilter.getA(FilterStage.HCationStage);
  const EpH = hCationFilter.getEp(FilterStage.HCationStage);
  const RegenNumber = hCationFilter.getRegenerationNumber(
    FilterStage.HCationStage
  );

  const nHFormula = `\\tag{6.6} ${n_H} = \\frac{A}{${V_k}${Ep_H}a} \\ раз/сут,`;
  const nHCalc = `${n_H} = \\frac{${A}}{${filters.filterLoadSize} * ${EpH} * ${filters.numberOfFilters}} = ${RegenNumber} \\ раз/сут`;

  const AFormula = `\\tag{6.7} A = 24${H_g_h}${Q_h} \\ г-экв/сут`;
  const ACalc = `A = 24 * ${hardness} * ${filterPerformance} = ${A} \\ г-экв/сут`;

  const EpHFormula = `\\tag{6.8} ${Ep_H} = ${alpha_h}${E_p} - 0.5q${C_k} \\ г-экв/м^3,`;
  const EpHCalc = `${Ep_H} = ${alpha} * 500 - 0.5 * ${q} * ${cationsSum} = ${EpH} \\ г-экв/м^3`;

  return (
    <>
      <p>Число регенераций фильтра в сутки, определяется по формуле (6.6):</p>
      <BlockMath math={nHFormula} />
      <p>
        где А - количество солей жесткости, удаленной из H-катионных фильтрах в
        сутки, вычисляется по формуле (6.7):
      </p>
      <BlockMath math={AFormula} />
      <BlockMath math={ACalc} />
      <p>
        <InlineMath math={Ep_H} /> - рабочая объемная способность катионита при
        H-катионировании вычисляется по формуле (6.8):
      </p>
      <BlockMath math={EpHFormula} />
      <p>
        где <InlineMath math={alpha_h} /> - коэффициент эффективности
        регенерации водород-катионита, зависящий от удельного расхода серной
        кислоты на регенерацию, принимается равным в зависимости от удельного
        расхода серной кислоты на регенерацию (таблица 6.2), при{' '}
        <InlineMath math={q_k} /> = {qc} г/г · экв <InlineMath math={alpha_h} />{' '}
        = {alpha}; <InlineMath math={E_p} /> - полная обменная способность
        катионита, в расчетах принимается Еп = 500{' '}
        <InlineMath math={'г·экв/м^3'} />; <InlineMath math="q" /> - удельный
        расход воды на отмывку катионита,
        <InlineMath math="q" /> = {q} <InlineMath math={'м^3/м^3'} />.
      </p>
      <div className="calc-block__table-container">
        <p>
          Таблица 6.2 - Коэффициент эффективности регенерации H-катионитных
          фильтров
        </p>
        <AlphaTableH />
      </div>
      <BlockMath math={EpHCalc} />
      <p>Таким образом число регенераций в сутки будет равно:</p>
      <BlockMath math={nHCalc} />
    </>
  );
}
