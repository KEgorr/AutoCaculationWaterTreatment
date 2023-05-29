import { BlockMath, InlineMath } from 'react-katex';
import { hCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import { H2SO4 } from '../../textVariables/chemicalText';
import {
  delta,
  Ep_H,
  F_h,
  gamma_rr,
  n_H,
  Q_ch_h,
  q_k,
  q_ot,
  Q_ot,
  Q_pk,
  Q_rr,
  Q_sr,
  Q_syt,
  Q_tk,
  Q_vzr,
  t_vzr,
  V_k,
} from '../../textVariables/symbols';

export default function VariousCostCalcHStage({ filters }: IFilterProps) {
  const EpH = hCationFilter.getEp(FilterStage.HCationStage);
  const { qc, beta, gamma } = hCationFilter.getParams(FilterStage.HCationStage);
  const nH = hCationFilter.getRegenerationNumber(FilterStage.HCationStage);

  const Qpk = hCationFilter.getQc(FilterStage.HCationStage);
  const QpkFormula = `\\tag{6.9} ${Q_pk} = \\frac{${Ep_H}${V_k}${q_k}}{1000} \\ кг,`;
  const QpkCalc = `${Q_pk} = \\frac{${EpH} * ${filters.filterLoadSize} * ${qc}}{1000} = ${Qpk} \\ кг`;

  const Qtk = hCationFilter.getQtk(FilterStage.HCationStage);
  const QtkFormula = `\\tag{6.10} ${Q_tk} = \\frac{${Q_pk}${n_H} * a * 100}{92} \\ кг/сут`;
  const QtkCalc = `${Q_tk} = \\frac{${Qpk} * ${nH} * ${filters.numberOfFilters} * 100}{96.5} = ${Qtk} \\ кг/сут`;

  const Qvzr = hCationFilter.getQvzr();
  const QvzrFormula = `\\tag{6.11} ${Q_vzr} = \\frac{i${F_h} * 60${t_vzr}}{1000} \\ м^3,`;
  const QvzrCalc = `${Q_vzr} = \\frac{4 * ${filters.filtrationArea} * 60 * 15}{1000} = ${Qvzr} \\ м^3`;

  const Qrr = hCationFilter.getQrr(FilterStage.HCationStage);
  const QrrFormula = `\\tag{6.12} ${Q_rr} = \\frac{100${Qpk}}{1000${delta}${gamma_rr}} \\ м^3,`;
  const QrrCalc = `${Q_rr} = \\frac{100 * ${Qpk}}{1000 * ${beta} * ${gamma}} = ${Qrr} \\ м^3`;

  const Qot = hCationFilter.getQot();
  const QotFormula = `\\tag{6.13} ${Q_ot} = ${q_ot}${V_k} \\ м^3,`;
  const QotCalc = `${Q_ot} = 4 * ${filters.filterLoadSize} = ${Qot} \\ м^3`;

  const Qch = hCationFilter.getQch(FilterStage.HCationStage);
  const QchFormula = `\\tag{6.14} ${Q_ch_h} = ${Q_rr} + ${Q_ot} \\ м^3`;
  const QchCalc = `${Q_ch_h} = ${Qrr} + ${Qot} = ${Qch} \\ м^3`;

  const QchPerDay = hCationFilter.getQchPerDay(FilterStage.HCationStage);
  const QchPerDayFormula = `\\tag{6.15} ${Q_syt} = a${Q_ch_h} ${n_H} \\ м^3/сут`;
  const QchPerDayCalc = `${Q_syt} = ${filters.numberOfFilters} * ${Qch} * ${nH} = ${QchPerDay} \\ м^3/сут`;

  const QchPerHour = hCationFilter.getQchPerHour(FilterStage.HCationStage);
  const QchPerHourFormula = `\\tag{6.16} ${Q_sr} = \\frac{${Q_syt}}{24} \\ м^3/час`;
  const QchPerHourCalc = `${Q_sr} = \\frac{${QchPerDay}}{24} = ${QchPerHour} \\ м^3/час`;

  return (
    <>
      <p>
        Расход 100-% серной кислоты на одну регенерацию определяется по формуле
        (6.9):
      </p>
      <BlockMath math={QpkFormula} />
      <p>
        где <InlineMath math={q_k} /> - удельный расход{' '}
        <InlineMath math={H2SO4} />, принято равным {qc} /г-экв.
      </p>
      <BlockMath math={QpkCalc} />
      <p>
        Расход технической 92%-й серной кислоты определяется по выражению
        (6.10):
      </p>
      <BlockMath math={QtkFormula} />
      <BlockMath math={QtkCalc} />
      <p>
        Расход воды на регенерацию водород-катионного фильтра складывается из:
      </p>
      <p>
        1) расхода воды на взрыхляющую промывку, который определяется по формуле
        (6.11):
      </p>
      <BlockMath math={QvzrFormula} />
      <p>
        где <InlineMath math="i" /> - интенсивность взрыхляющей промывки,
        принято равным 4 <InlineMath math="л/с·м^2" />;{' '}
        <InlineMath math={t_vzr} /> = 15 мин - продолжительность взрыхляющей
        промывки.
      </p>
      <BlockMath math={QvzrCalc} />
      <p>
        2) расхода воды на приготовление регенерационного раствора, формула
        (6.12)
      </p>
      <BlockMath math={QrrFormula} />
      <p>
        где <InlineMath math={delta} /> - крепость регенерационного раствора,
        {beta}%; <InlineMath math={gamma_rr} /> - удельный вес регенерационного
        раствора, {gamma} <InlineMath math="т/м^3" />.
      </p>
      <BlockMath math={QrrCalc} />
      <p>
        3) расхода воды на отмывку катионита от продуктов регенерации, формула
        (6.13)
      </p>
      <BlockMath math={QotFormula} />
      <p>
        где <InlineMath math={q_ot} /> = 4 <InlineMath math="м^3/м^3" /> -{' '}
        удельный расход воды на отмывку катионита.
      </p>
      <BlockMath math={QotCalc} />
      <p>
        Расход воды на регенерацию H-катионного фильтра с учетом использования
        отмывочных вод на взрыхляющую промывку определяется по формуле (6.14):
      </p>
      <BlockMath math={QchFormula} />
      <BlockMath math={QchCalc} />
      <p>
        Расход воды на регенерацию фильтров в сутки определяется по выражению
        (6.15):
      </p>
      <BlockMath math={QchPerDayFormula} />
      <BlockMath math={QchPerDayCalc} />
      <p>
        Расход воды на регенерацию фильтров в час определяется по выражению
        (6.16):
      </p>
      <BlockMath math={QchPerHourFormula} />
      <BlockMath math={QchPerHourCalc} />
    </>
  );
}
