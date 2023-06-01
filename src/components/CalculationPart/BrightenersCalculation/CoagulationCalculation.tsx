import { BlockMath, InlineMath } from 'react-katex';
import waterData from '../../../modules/Basic data/WaterData';
import brightener from '../../../modules/Brighteners/Brighteners';
import { BrightenersType } from '../../../types/data-types';
import { Al2SO3 } from '../textVariables/chemicalText';
import { alpha, D_a, HardnessK, Qnsh } from '../textVariables/symbols';

export default function CoagulationCalculation() {
  const { carbonateHardness, suspendedMatter } = waterData;

  const sludgeCount = brightener.getSludgeCount(BrightenersType.liming);
  const D = brightener.getCoagulantDose();
  const a = 30;
  const sludgeCountFormula = `\\tag{9.1} ${Qnsh} = B + 26${D_a} + \\frac{111 ${alpha} ${D_a}}{100} \\ г/м^3,`;
  const sludgeCountCalc = `${Qnsh} = ${suspendedMatter} + 26 · ${D} + \\frac{111 · ${a} · ${D}}{100} = ${sludgeCount} \\ г/м^3`;
  return (
    <>
      <p>
        При карбонатной жесткости <InlineMath math={HardnessK} /> ={' '}
        {carbonateHardness} мгк·экв/кг исходной воды менее 2 мгк·экв/кг
        целесообразно применять коагуляцию воды сернокислым алюминием{' '}
        <InlineMath math={Al2SO3} /> в осветлителе с последующим осветлением в
        осветительных фильтрах.
      </p>
      <p>
        Количество шлама, образующегося при коагуляции с применением
        сернокислого алюминия, приближенно определяют по формуле (9.1):
      </p>
      <BlockMath math={sludgeCountFormula} />
      <p>
        где <InlineMath math="B" /> = {suspendedMatter}{' '}
        <InlineMath math="г/м^3" /> - количество взвешенных веществ в исходной
        воде;
      </p>
      <p>
        <InlineMath math={D_a} /> = {D} <InlineMath math="г·экв/м^3" /> - доза
        коагулянта – сернокислого алюминия в обрабатываемой воде;
      </p>
      <p>
        <InlineMath math={alpha} /> = {a} <InlineMath math="\\%" /> - количество
        нерастворенных примесей в коагулянте.
      </p>
      <p>Таким образом количество шлама будет равно:</p>
      <BlockMath math={sludgeCountCalc} />
      {suspendedMatter < 500 ? (
        <p>
          Скорость выхода воды из сопл при температуре 20–25 °С при мутности
          воды равной {suspendedMatter} мг/кг: 0.6-0.7 м/с.
        </p>
      ) : (
        <p>
          <p>
            Скорость выхода воды из сопл при температуре 20–25 °С при мутности
            воды равной {suspendedMatter} мг/кг: 0.8-1.1 м/с.
          </p>
        </p>
      )}
      {suspendedMatter < 25 ? (
        <p>
          Скорость восходящего потока воды в осветлителе при коагуляции
          сернокислым алюминием не более 0.7 мм/с, при мутности воды равной{' '}
          {suspendedMatter} мг/кг.
        </p>
      ) : (
        <p>
          <p>
            Скорость восходящего потока воды в осветлителе при коагуляции
            сернокислым алюминием 1-1.1 мм/с, при мутности воды равной{' '}
            {suspendedMatter} мг/кг.
          </p>
        </p>
      )}
      <p>
        Общая длительность пребывания обрабатываемой воды в осветлителе
        1.25–1.75 ч.
      </p>
    </>
  );
}
