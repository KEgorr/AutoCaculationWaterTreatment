import { BlockMath, InlineMath } from 'react-katex';

import {
  getAlpha,
  getBeta,
} from '../../../../modules/FiltersCalculation/filtersTools';
import secondStageNaCationFilter from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import steamBalanceBoiler from '../../../../modules/SteamBalanceOfBoiler/steamBalanceOfBoiller';
import waterIonicComposition from '../../../../modules/WaterIonicComposition/waterIonicComposition';
import { FilterStage, UnitSaltUsage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import { Ca2, Mg2, Na } from '../../textVariables/chemicalText';
import {
  alpha_e,
  beta_Na,
  Ep_Na,
  E_p,
  H_0ost2,
  n_Na,
  Q_na2,
  V_k,
} from '../../textVariables/symbos';
import AlphaTable from '../AlphaTable';
import BetaTable from '../BetaTable';

export default function RegenerationNumberCalculation({
  filters,
}: IFilterProps) {
  const filterPerformance = steamBalanceBoiler.getWTP();
  const alpha = getAlpha(UnitSaltUsage.secondStage);
  const beta = getBeta(
    secondStageNaCationFilter.getHardnessNaSecondStage(),
    waterIonicComposition.getNa()
  );

  const A = secondStageNaCationFilter.getA(FilterStage.NaCationSecondStage);
  const EpNa = secondStageNaCationFilter.getEpNa(
    FilterStage.NaCationSecondStage
  );
  const RegenNumber = secondStageNaCationFilter.getRegenerationNumber(
    FilterStage.NaCationSecondStage
  );
  const HardnessNa = secondStageNaCationFilter.getHardnessNaSecondStage();

  const nNaformula = `\\tag{5.4} ${n_Na} = \\frac{A}{${V_k}${Ep_Na}a} \\ раз/сут,`;
  const nNaCalc = `${n_Na} = \\frac{${A}}{${filters.filterLoadSize} * ${EpNa} * ${filters.numberOfFilters}} = ${RegenNumber} \\ раз/сут`;

  const AFormula = `\\tag{5.5} A = 24${H_0ost2}${Q_na2} \\ г-экв/сут,`;
  const ACalc = `A = 24 * ${HardnessNa} * ${filterPerformance} = ${A} \\ г-экв/сут`;

  const EpNaFormula = `\\tag{5.6} ${Ep_Na} = ${alpha_e}${beta_Na}${E_p} - 0.5${H_0ost2}q \\ г-экв/м^3,`;
  const EpNaCalc = `${Ep_Na} = ${alpha} * ${beta} * 500 - 0.5 * ${HardnessNa} * 4 = ${EpNa} \\ г-экв/м^3`;

  return (
    <>
      <p>Число регенераций фильтра в сутки, определяется по формуле (5.4):</p>
      <BlockMath math={nNaformula} />
      <p>
        где А - количество солей жесткости, удаленной из Na-катионитных фильтрах
        в сутки, вычисляется по формуле (5.5):
      </p>
      <BlockMath math={AFormula} />
      <p>
        где <InlineMath math={H_0ost2} /> - жесткость фильтрата после второй
        ступени катионирования принимают равной в зависимости от типа котла (
        {HardnessNa}) мг-экв/л.
      </p>
      <BlockMath math={ACalc} />
      <p>
        <InlineMath math={Ep_Na} /> - рабочая объемная способность катионита при
        Na-катионировании вычисляется по формуле (5.6):
      </p>
      <BlockMath math={EpNaFormula} />
      <p>
        где <InlineMath math={alpha_e} /> - коэффициент эффективности
        регенерации, учитывающий неполноту регенерации катионита, принимается
        равным в зависимости от удельного расхода соли на регенерацию (таблица
        5.2), принимаем равным {alpha};
      </p>
      <p className="table-tittle">
        Таблица 5.2 - Коэффициент эффективности регенерации катионита
      </p>
      <AlphaTable />
      <p>
        <InlineMath math={beta_Na} /> - коэффициент, учитывающий снижение
        обменной способности катионита по <InlineMath math={Ca2} /> и{' '}
        <InlineMath math={Mg2} /> за счет частичного задержания катионов{' '}
        <InlineMath math={Na} />
        (принимается исходя из таблицы 5.3) равен {beta};
      </p>
      <p className="table-tittle">
        Таблица 5.3 - Коэффициент снижения обменной способности катионита
      </p>
      <BetaTable />
      <p>
        <InlineMath math={E_p} /> - полная обменная способность катионита, в
        расчетах принимается Еп = 500 <InlineMath math={'г·экв/м^3'} />;
      </p>
      <p>
        q - удельный расход воды на отмывку катионита, q = 4{' '}
        <InlineMath math={'м^3/м^3'} />.
      </p>
      <BlockMath math={EpNaCalc} />
      <p>Таким образом число регенераций в сутки будет равно:</p>
      <BlockMath math={nNaCalc} />
    </>
  );
}
