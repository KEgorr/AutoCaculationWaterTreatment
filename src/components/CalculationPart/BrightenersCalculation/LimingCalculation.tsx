import { BlockMath, InlineMath } from 'react-katex';
import waterData from '../../../modules/Basic data/WaterData';
import brightener from '../../../modules/Brighteners/Brighteners';
import { BrightenersType } from '../../../types/data-types';
import { CaCO3, CO2, FeSO4, MgOH2 } from '../textVariables/chemicalText';
import {
  Alk_iv,
  alpha_h,
  alpha_m,
  D_k,
  HardnessK,
  H_Ca,
  H_Mg,
  H_ost_Ca,
  Qnsh,
} from '../textVariables/symbols';

export default function LimingCalculation() {
  const { carbonateHardness, suspendedMatter, alkalinity } = waterData;

  const sludgeCount = brightener.getSludgeCount(BrightenersType.liming);
  const D = brightener.getCoagulantDose();
  const a = 0.5;
  const HMg = brightener.getHardnessMg();
  const sludgeCountFormula = `\\tag{9.1} ${Qnsh} = B + 50[${H_Ca} + ${D_k}(1 + 0.56${alpha_h})] + 53${D_k} + 29${H_Mg} \\ г/м^3,`;
  const sludgeCountCalc = `${Qnsh} = ${suspendedMatter} + 50[${carbonateHardness} + ${D}(1 + 0.56 · ${a})] + 53 · ${D} + 29 · ${HMg} = ${sludgeCount} \\ г/м^3`;

  const alphaM = brightener.getAlphaM();
  const CO2ish = brightener.getCO2();
  const HCaOst = brightener.getHarnessCaOst();
  const alphaMFormula = `\\tag{9.2} ${alpha_m} = 58 \\frac{${Alk_iv}${H_Ca}}{2${Alk_iv} + ${CO2} + ${D_k} - ${H_ost_Ca}} \\ \\%`;
  const alphaMCalc = `${alpha_m} = 58 \\frac{${alkalinity} ∙ ${carbonateHardness}}{2 ∙ ${alkalinity} + ${CO2ish} + ${D} - ${HCaOst}} = ${alphaM} \\ \\%`;

  return (
    <>
      <p>
        При карбонатной жесткости <InlineMath math={HardnessK} /> ={' '}
        {carbonateHardness} мгк·экв/кг исходной воды более 2 мгк·экв/кг
        целесообразно применять коагуляцию воды сернокислым железом{' '}
        <InlineMath math={FeSO4} /> с известкованием в осветлителе с последующим
        осветлением в осветительных фильтрах.
      </p>
      <p>
        Количество шлама, образующегося при известковании и коагуляции воды с
        применением сернокислого железа, определяется по формуле (9.1):
      </p>
      <BlockMath math={sludgeCountFormula} />
      <p>
        где <InlineMath math="B" /> = {suspendedMatter}{' '}
        <InlineMath math="г/м^3" /> - количество взвешенных веществ в исходной
        воде;
      </p>
      <p>
        <InlineMath math={H_Ca} /> = {carbonateHardness}{' '}
        <InlineMath math="мг-экв/кг" /> - кальциевая жесткость, удаляемая
        известкованием;
      </p>
      <p>
        <InlineMath math={D_k} /> = {D} <InlineMath math="г·экв/м^3" /> - доза
        коагулянта – серно-кислого железа в обрабатываемой воде;
      </p>
      <p>
        <InlineMath math={alpha_h} /> = {a} <InlineMath math="\\%" /> -
        количество нерастворенных примесей в коагулянте.
      </p>
      <p>
        <InlineMath math={H_Mg} /> = {HMg} <InlineMath math="мг-экв/кг" /> -
        магниевая жесткость, удаляемая известкованием;
      </p>
      <p>Таким образом количество шлама будет равно:</p>
      <BlockMath math={sludgeCountCalc} />
      <p>
        Скорость ввода обрабатываемой воды в осветлитель, определяется в
        зависимости от весового отношения в выделяющемся осадке содержания
        магниевых солей в пересчете на <InlineMath math={MgOH2} /> и кальциевых
        солей в пересчете на
        <InlineMath math={CaCO3} />, определяемое по формуле (9.2):
      </p>
      <BlockMath math={alphaMFormula} />
      <p>
        где <InlineMath math={Alk_iv} /> = {alkalinity} мг-экв/кг - щелочность
        исходной воды;
      </p>
      <p>
        <InlineMath math={CO2} /> = {CO2ish} мг-экв/кг - количество свободной
        углекислоты в исходной воде;
      </p>
      <p>
        <InlineMath math={H_ost_Ca} /> = {HCaOst} мг-экв/кг - кальциевая
        жесткость обработанной воды;
      </p>
      <p>Таким образом:</p>
      <BlockMath math={alphaMCalc} />
      {alphaM > 25 ? (
        <p>
          <InlineMath math={alpha_m} /> {'>'} 25 %, поэтому скорость ввода
          обрабатываемой воды в осветлитель будет примерно равен 0.5–0.75 м/с
        </p>
      ) : (
        <p>
          <InlineMath math={alpha_m} /> {'<'} 25 %, поэтому скорость ввода
          обрабатываемой воды в осветлитель будет примерно равен 1.5–2.0 м/с м/с
        </p>
      )}
      <p>
        Общая длительность пребывания обрабатываемой воды в осветлителе при
        оптимальной температуре 25–30 °С составляет 1.0–1.5 ч.
      </p>
    </>
  );
}
