import { BlockMath, InlineMath } from 'react-katex';
import { getBeta } from '../../../../../modules/FiltersCalculation/filtersTools';
import { firstStageNaCationFilter } from '../../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import waterIonicComposition from '../../../../../modules/WaterIonicComposition/waterIonicComposition';
import { FilterStage } from '../../../../../types/data-types';
import { IFilterProps } from '../../../../../types/props-types';
import { Ca2, Mg2, Na } from '../../../textVariables/chemicalText';
import {
  alpha_e,
  beta_Na,
  Ep_Na1,
  E_p,
  H_0Na1,
  n_Na,
  Q_na1,
  V_k,
} from '../../../textVariables/symbols';

export default function RegenerationNumberFirstStage({
  filters,
}: IFilterProps) {
  const { alpha, filterPerformance, hardness, qc } =
    firstStageNaCationFilter.getParams(FilterStage.NaCationFirstStage);
  const beta = getBeta(hardness, waterIonicComposition.getNa());

  const A = firstStageNaCationFilter.getA(FilterStage.NaCationFirstStage);
  const EpNa = firstStageNaCationFilter.getEp(FilterStage.NaCationFirstStage);
  const RegenNumber = firstStageNaCationFilter.getRegenerationNumber(
    FilterStage.NaCationFirstStage
  );

  const nNaformula = `\\tag{5.20} ${n_Na} = \\frac{A}{${V_k}${Ep_Na1}a} \\ раз/сут,`;
  const nNaCalc = `${n_Na} = \\frac{${A}}{${filters.filterLoadSize} * ${EpNa} * ${filters.numberOfFilters}} = ${RegenNumber} \\ раз/сут`;

  const AFormula = `\\tag{5.21} A = 24${H_0Na1}${Q_na1} \\ г-экв/сут`;
  const ACalc = `A = 24 * ${hardness} * ${filterPerformance} = ${A} \\ г-экв/сут`;

  const EpNaFormula = `\\tag{5.22} ${Ep_Na1} = ${alpha_e}${beta_Na}${E_p} - 0.5${H_0Na1}q_c \\ г-экв/м^3,`;
  const EpNaCalc = `${Ep_Na1} = ${alpha} * ${beta} * 500 - 0.5 * ${hardness} * ${qc} = ${EpNa} \\ г-экв/м^3`;

  return (
    <>
      <p>Число регенераций фильтра в сутки, определяется по формуле (5.20):</p>
      <BlockMath math={nNaformula} />
      <p>
        где А - количество солей жесткости, удаленной из Na-катионитных фильтрах
        в сутки, вычисляется по формуле (5.21):
      </p>
      <BlockMath math={AFormula} />
      <BlockMath math={ACalc} />
      <p>
        <InlineMath math={Ep_Na1} /> - рабочая объемная способность катионита
        при Na-катионировании вычисляется по формуле (5.22):
      </p>
      <BlockMath math={EpNaFormula} />
      <p>
        где <InlineMath math={alpha_e} /> - коэффициент эффективности
        регенерации, учитывающий неполноту регенерации катионита, принимается
        равным в зависимости от удельного расхода соли на регенерацию (таблица
        5.2), принимается равным {alpha}; <InlineMath math={beta_Na} /> -
        коэффициент, учитывающий снижение обменной способности катионита по{' '}
        <InlineMath math={Ca2} /> и <InlineMath math={Mg2} /> за счет частичного
        задержания катионов <InlineMath math={Na} />
        (принимается исходя из таблицы 5.3) равен {beta};
        <InlineMath math={E_p} /> - полная обменная способность катионита, в
        расчетах принимается Еп = 500 <InlineMath math={'г·экв/м^3'} />;{' '}
        <InlineMath math="q_c" /> - удельный расход соли на соли на регенерацию,
        принимается в зависимости от жесткости фильтрата поступающего на
        фильтры, при <InlineMath math={H_0Na1} /> = {hardness}{' '}
        <InlineMath math="q_c" /> = {qc} <InlineMath math={'г/г·экв'} />.
      </p>
      <BlockMath math={EpNaCalc} />
      <p>Таким образом число регенераций в сутки будет равно:</p>
      <BlockMath math={nNaCalc} />
    </>
  );
}
