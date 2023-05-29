import { BlockMath, InlineMath } from 'react-katex';
import { firstStageNaCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import {
  delta,
  Ep_Na1,
  F_na1,
  gamma_rr,
  n_Na,
  q_c,
  Q_c,
  Q_cc,
  Q_ch,
  Q_chNa1,
  Q_na1,
  Q_nr,
  q_ot,
  Q_ot,
  Q_rr,
  Q_vzr,
  t_vzr,
  V_k,
} from '../../textVariables/symbols';

export default function VariousCostCalcFirstStage({ filters }: IFilterProps) {
  const EpNa = firstStageNaCationFilter.getEp(FilterStage.NaCationFirstStage);
  const { qc, beta } = firstStageNaCationFilter.getParams(
    FilterStage.NaCationFirstStage
  );
  const nNa = firstStageNaCationFilter.getRegenerationNumber(
    FilterStage.NaCationFirstStage
  );

  const Qc = firstStageNaCationFilter.getQc(FilterStage.NaCationFirstStage);
  const QcFormula = `\\tag{5.23} ${Q_c} = \\frac{${Ep_Na1}${V_k}${q_c}}{1000} \\ кг`;
  const QcCalc = `${Q_c} = \\frac{${EpNa} * ${filters.filterLoadSize} * ${qc}}{1000} = ${Qc} \\ кг`;

  const Qnr = firstStageNaCationFilter.getQnr(FilterStage.NaCationFirstStage);
  const QnrFormula = `\\tag{5.24} ${Q_nr} = \\frac{${Q_c} * 100}{1000 * 1.2 * 26} \\ кг`;
  const QnrCalc = `${Q_nr} = \\frac{${Qc} * 100}{1000 * 1.2 * 26} = ${Qnr} \\ кг`;

  const Qcc = firstStageNaCationFilter.getQcc(FilterStage.NaCationFirstStage);
  const QccFormula = `\\tag{5.25} ${Q_cc} = \\frac{${Q_c}${n_Na} * a * 100}{96.5} \\ кг/сут,`;
  const QccCalc = `${Q_cc} = \\frac{${Qc} * ${nNa} * ${filters.numberOfFilters} * 100}{96.5} = ${Qcc} \\ кг/сут`;

  const Qvzr = firstStageNaCationFilter.getQvzr();
  const QvzrFormula = `\\tag{5.26} ${Q_vzr} = \\frac{i${F_na1} * 60${t_vzr}}{1000} \\ м^3`;
  const QvzrCalc = `${Q_vzr} = \\frac{4 * ${filters.filtrationArea} * 60 * 15}{1000} = ${Qvzr} \\ м^3`;

  const Qrr = firstStageNaCationFilter.getQrr(FilterStage.NaCationFirstStage);
  const QrrFormula = `\\tag{5.27} ${Q_rr} = \\frac{100${Q_c}}{1000${delta}${gamma_rr}} \\ м^3,`;
  const QrrCalc = `${Q_rr} = \\frac{100 * ${Qc}}{1000 * ${beta} * 1.2} = ${Qrr} \\ м^3`;

  const Qot = firstStageNaCationFilter.getQot();
  const QotFormula = `\\tag{5.28} ${Q_ot} = ${q_ot}${V_k} \\ м^3`;
  const QotCalc = `${Q_ot} = 4 * ${filters.filterLoadSize} = ${Qot} \\ м^3`;

  const Qch = firstStageNaCationFilter.getQch(FilterStage.NaCationFirstStage);
  const QchFormula = `\\tag{5.29} ${Q_ch} = ${Q_rr} + ${Q_ot} \\ м^3`;
  const QchCalc = `${Q_ch} = ${Qrr} + ${Qot} = ${Qch} \\ м^3`;

  const QchPerDay = firstStageNaCationFilter.getQchPerDay(
    FilterStage.NaCationFirstStage
  );
  const QchPerDayFormula = `\\tag{5.30} ${Q_na1} = a${Q_ch} ${n_Na} \\ м^3/сут`;
  const QchPerDayCalc = `${Q_na1} = ${filters.numberOfFilters} * ${Qch} * ${nNa} = ${QchPerDay} \\ м^3/сут`;

  const QchPerHour = firstStageNaCationFilter.getQchPerHour(
    FilterStage.NaCationFirstStage
  );
  const QchPerHourFormula = `\\tag{5.31} ${Q_chNa1} = \\frac{${Q_na1}}{24} \\ м^3/час`;
  const QchPerHourCalc = `${Q_chNa1} = \\frac{${QchPerDay}}{24} = ${QchPerHour} \\ м^3/час`;

  return (
    <>
      <p>Расход соли на одну регенерацию определяется по формуле (5.23):</p>
      <BlockMath math={QcFormula} />
      <BlockMath math={QcCalc} />
      <p>
        Расход насыщенного раствора соли (26 %) на одну регенерацию находится по
        формуле (5.24):
      </p>
      <BlockMath math={QnrFormula} />
      <BlockMath math={QnrCalc} />
      <p>
        Расход технической соли в сутки на регенерацию фильтра первой ступени
        определяется по формуле (5.25):
      </p>
      <BlockMath math={QccFormula} />
      <p>где 96,5 – содержание NaCl в технической соли, %.</p>
      <BlockMath math={QccCalc} />
      <p>
        Расход воды на регенерацию Na-катионного фильтра первой ступени
        складывается из:
      </p>
      <p>
        1) расхода воды на взрыхляющую промывку, который определяется по формуле
        (5.26):
      </p>
      <BlockMath math={QvzrFormula} />
      <BlockMath math={QvzrCalc} />
      <p>
        2) расхода воды на приготовление регенерационного раствора, формула
        (5.27)
      </p>
      <BlockMath math={QrrFormula} />
      <p>
        где <InlineMath math={delta} /> - крепость регенерационного раствора,
        {beta}%; <InlineMath math={gamma_rr} /> - удельный вес регенерационного
        раствора, 1.2 <InlineMath math="т/м^3" />.
      </p>
      <BlockMath math={QrrCalc} />
      <p>
        3) расхода воды на отмывку катионита от продуктов регенерации, формула
        (5.28)
      </p>
      <BlockMath math={QotFormula} />
      <BlockMath math={QotCalc} />
      <p>
        Расход воды на регенерацию Na-катионного фильтра I ступени с учетом
        использования отмывочных вод на взрыхляющую промывку определяется по
        формуле (5.29):
      </p>
      <BlockMath math={QchFormula} />
      <BlockMath math={QchCalc} />
      <p>
        Расход воды на регенерацию фильтров первой ступени в сутки определяется
        по выражению (5.30):
      </p>
      <BlockMath math={QchPerDayFormula} />
      <BlockMath math={QchPerDayCalc} />
      <p>
        Расход воды на регенерацию фильтров первой ступени в час определяется по
        выражению (5.31):
      </p>
      <BlockMath math={QchPerHourFormula} />
      <BlockMath math={QchPerHourCalc} />
    </>
  );
}
