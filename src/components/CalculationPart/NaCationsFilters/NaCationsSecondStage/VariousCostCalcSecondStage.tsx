import { BlockMath, InlineMath } from 'react-katex';
import { secondStageNaCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import {
  delta,
  Ep_Na,
  F_na2,
  gamma_rr,
  n_Na,
  q_c,
  Q_c,
  Q_cc,
  Q_ch,
  Q_na2,
  Q_nr,
  q_ot,
  Q_ot,
  Q_rr,
  Q_vzr,
  t_vzr,
  V_k,
} from '../../textVariables/symbos';

export default function VariousCostCalcSecondStage({ filters }: IFilterProps) {
  const EpNa = secondStageNaCationFilter.getEpNa(
    FilterStage.NaCationSecondStage
  );
  const { qc, beta } = secondStageNaCationFilter.getParams(
    FilterStage.NaCationSecondStage
  );
  const nNa = secondStageNaCationFilter.getRegenerationNumber(
    FilterStage.NaCationSecondStage
  );

  const Qc = secondStageNaCationFilter.getQc(FilterStage.NaCationSecondStage);
  const QcFormula = `\\tag{5.7} ${Q_c} = \\frac{${Ep_Na}${V_k}${q_c}}{1000} \\ кг,`;
  const QcCalc = `${Q_c} = \\frac{${EpNa} * ${filters.filterLoadSize} * ${qc}}{1000} = ${Qc} \\ кг`;

  const Qnr = secondStageNaCationFilter.getQnr(FilterStage.NaCationSecondStage);
  const QnrFormula = `\\tag{5.8} ${Q_nr} = \\frac{${Q_c} * 100}{1000 * 1.2 * 26} \\ кг, `;
  const QnrCalc = `${Q_nr} = \\frac{${Q_c} * 100}{1000 * 1.2 * 26} = ${Qnr} \\ кг`;

  const Qcc = secondStageNaCationFilter.getQcc(FilterStage.NaCationSecondStage);
  const QccFormula = `\\tag{5.9} ${Q_cc} = \\frac{${Q_c}${n_Na} * a * 100}{96.5} \\ кг/сут,`;
  const QccCalc = `${Q_cc} = \\frac{${Qc} * ${nNa} * ${filters.numberOfFilters} * 100}{96.5} = ${Qcc} \\ кг/сут`;

  const Qvzr = secondStageNaCationFilter.getQvzr();
  const QvzrFormula = `\\tag{5.10} ${Q_vzr} = \\frac{i${F_na2} * 60${t_vzr}}{1000} \\ м^3,`;
  const QvzrCalc = `${Q_vzr} = \\frac{4 * ${filters.filtrationArea} * 60 * 15}{1000} = ${Qvzr} \\ м^3`;

  const Qrr = secondStageNaCationFilter.getQrr(FilterStage.NaCationSecondStage);
  const QrrFormula = `\\tag{5.11} ${Q_rr} = \\frac{100${Q_c}}{1000${delta}${gamma_rr}} \\ м^3,`;
  const QrrCalc = `${Q_rr} = \\frac{100 * ${Qc}}{1000 * ${beta} * 1.2} = ${Qrr} \\ м^3`;

  const Qot = secondStageNaCationFilter.getQot();
  const QotFormula = `\\tag{5.12} ${Q_ot} = ${q_ot}${V_k} \\ м^3,`;
  const QotCalc = `${Q_ot} = 4 * ${filters.filterLoadSize} = ${Qot} \\ м^3`;

  const Qch = secondStageNaCationFilter.getQch(FilterStage.NaCationSecondStage);
  const QchFormula = `\\tag{5.13} ${Q_ch} = ${Q_rr} + ${Q_ot} \\ м^3`;
  const QchCalc = `${Q_ch} = ${Qrr} + ${Qot} = ${Qch} \\ м^3`;

  const QchPerDay = secondStageNaCationFilter.getQchPerDay(
    FilterStage.NaCationSecondStage
  );
  const QchPerDayFormula = `\\tag{5.14} ${Q_na2} = ${Q_ch} ${n_Na} \\ м^3/сут`;
  const QchPerDayCalc = `${Q_na2} = ${Qch} * ${nNa} = ${QchPerDay} \\ м^3/сут`;

  return (
    <>
      <p>Расход соли на одну регенерацию определяется по формуле (5.7):</p>
      <BlockMath math={QcFormula} />
      <p>
        где <InlineMath math={q_c} /> - удельный расход соли на регенерацию,
        определяется исходя из жесткости обрабатываемой воды. Для натрий
        катионных фильтров второй ступени принимается равным 350 г/г.
      </p>
      <BlockMath math={QcCalc} />
      <p>
        Расход насыщенного раствора соли (26 %) на одну регенерацию находится по
        формуле (5.8):
      </p>
      <BlockMath math={QnrFormula} />
      <p>
        где 1.2 - удельный вес насыщенного (26%-го) раствора при 20 °С,{'  '}
        <InlineMath math="т/м^3" />.
      </p>
      <BlockMath math={QnrCalc} />
      <p>
        Расход технической соли в сутки на регенерацию фильтра второй ступени
        определяется по формуле (5.9):
      </p>
      <BlockMath math={QccFormula} />
      <p>где 96,5 – содержание NaCl в технической соли, %.</p>
      <BlockMath math={QccCalc} />
      <p>
        Расход воды на регенерацию Na-катионного фильтра второй ступени
        складывается из:
      </p>
      <p>
        1) расхода воды на взрыхляющую промывку, который определяется по формуле
        (5.10):
      </p>
      <BlockMath math={QvzrFormula} />
      <p>
        где <InlineMath math="i" /> – интенсивность взрыхляющей промывки
        фильтров, 4 <InlineMath math="л/с·м^2" />; <InlineMath math={t_vzr} /> –
        продолжительность взрыхляющей промывки, 15 мин.
      </p>
      <BlockMath math={QvzrCalc} />
      <p>
        2) расхода воды на приготовление регенерационного раствора, формула
        (5.11)
      </p>
      <BlockMath math={QrrFormula} />
      <p>
        где <InlineMath math={delta} /> - крепость регенерационного раствора,
        8%; <InlineMath math={gamma_rr} /> - удельный вес регенерационного
        раствора, 1.2 <InlineMath math="т/м^3" />.
      </p>
      <BlockMath math={QrrCalc} />
      <p>
        3) расхода воды на отмывку катионита от продуктов регенерации, формула
        (5.12)
      </p>
      <BlockMath math={QotFormula} />
      <p>
        где <InlineMath math={q_ot} /> - удельный расход воды на отмывку
        катионита, 4 <InlineMath math="м^3/м^3" />.
      </p>
      <BlockMath math={QotCalc} />
      <p>
        Расход воды на регенерацию Na-катионного фильтра II ступени с учетом
        использования отмывочных вод на взрыхляющую промывку определяется по
        формуле (5.13):
      </p>
      <BlockMath math={QchFormula} />
      <BlockMath math={QchCalc} />
      <p>То же в среднем за сутки определяется по формуле (5.14):</p>
      <BlockMath math={QchPerDayFormula} />
      <BlockMath math={QchPerDayCalc} />
    </>
  );
}
