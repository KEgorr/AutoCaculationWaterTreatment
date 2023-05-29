import { BlockMath, InlineMath } from 'react-katex';
import { hCationFilter } from '../../../../modules/FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';
import { FilterStage } from '../../../../types/data-types';
import { IFilterProps } from '../../../../types/props-types';
import {
  F_h,
  n_H,
  n_or,
  Q_ot,
  Q_pk,
  tH_ot,
  tH_reg,
  tH_rr,
  t_vzr,
} from '../../textVariables/symbols';

export default function TimesCalculationHFilter({ filters }: IFilterProps) {
  const treg = hCationFilter.getTreg(FilterStage.HCationStage);
  const trr = hCationFilter.getTrr(FilterStage.HCationStage);
  const tot = hCationFilter.getTot();

  const Qpk = hCationFilter.getQc(FilterStage.HCationStage);
  const Qot = hCationFilter.getQot();
  const { filtrationArea, numberOfFilters } = filters;

  const tregFormula = `\\tag{6.17} ${tH_reg} = \\frac{${t_vzr} + ${tH_rr} + ${tH_ot}}{60} \\ ч,`;
  const tregCalc = `${tH_reg} = \\frac{15 + ${trr} + ${tot}}{60} = ${treg} \\ ч`;

  const trrFormula = `\\tag{6.18} ${tH_rr} = \\frac{6${Q_pk}}{${F_h}} \\ мин`;
  const trrCalc = `${tH_rr} = \\frac{6 * ${Qpk}}{${filtrationArea}} = ${trr} \\ мин`;

  const totFormula = `\\tag{6.19} ${tH_ot} = \\frac{6${Q_ot}}{${F_h}} \\ мин`;
  const totCalc = `${tH_ot} = \\frac{6 * ${Qot}}{${filtrationArea}} = ${tot} \\ мин`;

  const nor = hCationFilter.getNor(FilterStage.HCationStage);
  const nH = hCationFilter.getRegenerationNumber(FilterStage.HCationStage);
  const norFormula = `\\tag{6.20} ${n_or} = \\frac{${n_H}a${tH_reg}}{24} \\ шт`;
  const norCalc = `${n_or} = \\frac{${nH} * ${numberOfFilters} * ${treg}}{24} = ${nor} \\ шт`;

  return (
    <>
      <p>
        Время регенерации водород-катионного фильтра, находится по формуле
        (6.17):
      </p>
      <BlockMath math={tregFormula} />
      <p>
        где <InlineMath math={tH_rr} /> - время пропуска регенерационного
        раствора, определяется по формуле (6.18):
      </p>
      <BlockMath math={trrFormula} />
      <BlockMath math={trrCalc} />
      <p>
        <InlineMath math={tH_ot} /> - время отмывки фильтра от продуктов
        регенерации, определяется по формуле (6.19):
      </p>
      <BlockMath math={totFormula} />
      <BlockMath math={totCalc} />
      <p>Таким образом время регенерации фильтра будет равно:</p>
      <BlockMath math={tregCalc} />
      <p>
        Количество одновременно регенерируемых фильтров, определяется по формуле
        (6.20)
      </p>
      <BlockMath math={norFormula} />
      <BlockMath math={norCalc} />
    </>
  );
}
