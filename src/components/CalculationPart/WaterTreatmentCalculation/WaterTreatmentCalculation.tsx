/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import boilerData from '../../../modules/Basic data/BoilerData';
import waterData from '../../../modules/Basic data/WaterData';
import waterTreatmentCalculation from '../../../modules/WaterTreatmentCalculation/WaterTreatmentCalculation';
import decompositionNa2CO3Img from '../../../assets/imgs/decompositionNa2CO3.png';

export default function WaterTreatmentCalculation() {
  const S_ov = `S_{O.B}`;
  const P_k = `П_K`;
  const S_kv = `S_{K.B}`;
  const Alk_ot_kv = `Щ_{O.T.K.B}`;
  const Alk_ot_ov = `Щ_{O.T.O.B}`;
  const Alk_ov = `Щ_{O.B}`;
  const CO2 = `CO_2`;
  const alpha_ov = `\\alpha_{O.B}`;
  const sigma = `\\sigma`;
  const mgKgDimension = `\\frac{мг}{кг}`;

  const { dryResidue, alkalinity } = waterData;
  const { requiredDryResidue, steamLosses, pressure } = boilerData;

  const blowDownnFormula = `\\tag{1} p = \\frac {${S_ov} * ${P_k} * 100}{${S_kv} - ${S_ov} * ${P_k}},`;
  const blowDownCalc = `p = \\frac {${dryResidue} * ${steamLosses} * 100}{${requiredDryResidue} - ${dryResidue} * ${steamLosses}} = ${waterTreatmentCalculation.getBoilerBlowDown()} \\%`;
  const relativeAlkalinityFormula = `\\tag{2} ${Alk_ot_kv} = ${Alk_ot_ov} = \\frac {40 * ${Alk_ov} * 100}{${S_ov}},`;
  const relativeAlkalinityCalc = `${Alk_ot_kv} = ${Alk_ot_ov} = \\frac {40 * ${alkalinity} * 100}{${dryResidue}} = ${waterTreatmentCalculation.getRelativeAlkalinity()} \\%`;
  const decompositionNa2CO3Formula = `\\tag{3} ${CO2} = 22 * ${Alk_ov} * ${alpha_ov} * (1 + ${sigma}),`;
  const decompositionNa2CO3Calc = `${CO2} = 22 * ${alkalinity} * 0.5 * (1 + ${waterTreatmentCalculation.getDecompositionNa2CO3()}) = ${waterTreatmentCalculation.getCarbonDioxideConcentration()} ${mgKgDimension}`;
  const decompositionNa2CO3FormulaWithB = `\\tag{4} ${CO2} = 22 * ${Alk_ov} * ${alpha_ov} * (${sigma}_1 + ${sigma}),`;
  const decompositionNa2CO3CalcWithB = `${CO2} = 22 * ${alkalinity} * 0.5 * (0.4 + ${waterTreatmentCalculation.getDecompositionNa2CO3()}) = ${waterTreatmentCalculation.getCarbonDioxideConcentrationWithB()} ${mgKgDimension}`;

  const [isHidden, setHidden] = useState(true);

  function changeVisibility() {
    if (isHidden) {
      setHidden(false);
      return;
    }
    setHidden(true);
  }

  return (
    <div>
      <h2
        className={
          isHidden
            ? 'calc-block-tittle'
            : 'calc-block-tittle calc-block-tittle__rounded'
        }
        onClick={changeVisibility}
      >
        Расчетный метод выбора схем обработки воды
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className="calc-block__content">
          <p>
            Основными критериями выбора схем обработки воды для паровых котлов
            являются: величина продувки котлов, относительная щелочность
            котловой воды и концентрация углекислоты в паре.
          </p>
          <p>
            Величину продувки котлов по сухому остатку определяют в
            предварительных расчетах по выбору схем обработки воды по формуле 1:
          </p>
          <BlockMath math={blowDownnFormula} />
          <p>
            где p – величина продувки котлов по сухому остатку, %;{'  '}
            <InlineMath math={S_ov} /> – сухой остаток обработанной воды, мг/кг;
            {'  '}
            <InlineMath math={P_k} /> – суммарные потери пара и конденсата в
            долях от паропроизводительности котельной, в долях;{' '}
            <InlineMath math={S_kv} /> – сухой остаток котловой воды для
            принятого типа котла, мг/кг, принимают по эксплуатационным или
            паспортным данным.
          </p>
          <p>Величина продувки котла по сухому остатку равна:</p>
          <BlockMath math={blowDownCalc} />
          <p>
            Расчетная величина продувки котла не должна превышать для котлов с
            давлением: меньше или равным 13 атм. – 10 %, 14–20 атм. – 7 % и
            20–39 атм. – 5 % паропроизводительности котлов.
          </p>
          <span>Для котла с давлением {pressure} бар: </span>
          {waterTreatmentCalculation.isBlowDownValid() ? (
            <span className="calc-text_valid">Условие выполняется</span>
          ) : (
            <>
              <span className="calc-text_invalid">Условие не выполняется</span>
              <p>
                Для снижения величины продувки котлов рекомендуется улучшение
                сепарационных устройств – внутрибарабанные циклоны, ступенчатое
                испарение, ступенчатое испарение с выносными циклонами;
                усложнение схемы водоподготовки, обеспечивающее снижение
                солесодержания.
              </p>
            </>
          )}
          <p>
            Относительная щелочность котловой воды равна относительной
            щелочности обработанной воды (разбавление конденсатом и
            концентрирование солей в котле не изменяет величину относительной
            щелочности) и определяется по формуле 2:
          </p>
          <BlockMath math={relativeAlkalinityFormula} />
          <p>
            где <InlineMath math={Alk_ot_kv} /> – относительная щелочность
            котловой воды, %;{'  '}
            <InlineMath math={Alk_ot_ov} /> – относительная щелочность
            обработанной воды, %;{'  '}
            <InlineMath math={S_ov} /> – сухой остаток обработанной воды, мг/кг.
          </p>
          <p>Относительная щелочность котловой воды равна:</p>
          <BlockMath math={relativeAlkalinityCalc} />
          <p>
            Величина относительной щелочности котловой воды для котлов,
            работавших на давлении более 10 атм., не должна превышать 20 %
          </p>
          <span>Для котла с давлением {pressure} бар: </span>
          {waterTreatmentCalculation.isRelativeAlkalinityValid() ? (
            <span className="calc-text_valid">Условие выполняется</span>
          ) : (
            <>
              <span className="calc-text_invalid">Условие не выполняется</span>
              <p>
                При относительной щелочности более 20 %, следует предусматривать
                обработку воды нитратами или аналогичными пассиваторами.
              </p>
            </>
          )}
          <p>
            Концентрация углекислоты в паре в расчетах по выбору схем обработки
            воды допускается не более 20 мг/кг. Концентрацию углекислоты в паре
            определяют при отсутствии деаэрации питательной воды или при
            использовании деаэраторов без барботажа по формуле 3:
          </p>
          <BlockMath math={decompositionNa2CO3Formula} />
          <p>
            где <InlineMath math={CO2} /> – концентрация углекислоты в паре,
            мг/кг;{'  '}
            <InlineMath math={Alk_ov} /> – щелочность (бикарбонатная)
            обработанной воды, мг - экв/кг;{'  '}
            <InlineMath math={alpha_ov} /> = 0,5 – доля обра-ботанной воды в
            питательной;{'  '}
            <InlineMath math={sigma} /> – доля разложения Na2СO3 в котле,
            определяется по рисунку 1.
          </p>
          <img
            className="calc-img decomposition-Na2CO3-img"
            src={decompositionNa2CO3Img}
            alt=""
          />
          <p className="calc-img-title">
            Рисунок 1 – Разложение Na2СО3 в зависимости от давления
          </p>
          <p>
            Таким образом концентрация углекислоты в паре с деаэрацией без
            барботажа равна:
          </p>
          <BlockMath math={decompositionNa2CO3Calc} />
          <p>
            Концентрацию углекислоты в паре при деаэрации с барботажем
            определяют по формуле 4:
          </p>
          <BlockMath math={decompositionNa2CO3FormulaWithB} />
          <p>
            где <InlineMath math={`${sigma}_1`} /> – доля разложения NaHCO3 в
            котле, примерно равная 0,4 (60 % разложилось в барботажном
            деаэраторе).
          </p>
          <p>
            Таким образом концентрация углекислоты в паре с деаэрацией с
            барботажом равна:
          </p>
          <BlockMath math={decompositionNa2CO3CalcWithB} />
          <span>
            Концентрация углекислоты в паре в расчетах по выбору схем обработки
            воды допускается не более 20 мг/кг.
          </span>
          {waterTreatmentCalculation.isDecompositionNa2CO3Valid() ? (
            <span className="calc-text_valid">Условие выполняется</span>
          ) : (
            <>
              <span className="calc-text_invalid">Условие не выполняется</span>
              <p>
                Для предотвращения углекислотной коррозии пароиспользующей
                аппаратуры и пароконденсатного тракта, должны предусматриваться
                следующие мероприятия: дегазация конденсата в пароиспользующих
                аппаратах путем вентиляции их паровых объемов при содержании
                углекислоты в паре более 3–5 мг/кг; амминирование питательной
                воды из расчета 0,4 мг аммиака на 1 мг/кг свободной углекислоты
                (амминирование применяется при условии, если потребители пара
                допускают наличие в нем аммиака); применение схем обработки
                воды, позволяющих снизить содержание связанной углекислоты в
                исходной воде.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
