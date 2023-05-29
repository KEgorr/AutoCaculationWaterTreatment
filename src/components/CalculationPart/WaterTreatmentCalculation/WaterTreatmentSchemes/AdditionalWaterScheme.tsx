import { InlineMath } from 'react-katex';
import waterData from '../../../../modules/Basic data/WaterData';
import waterIonicComposition from '../../../../modules/WaterIonicComposition/waterIonicComposition';
import twoStageDesaltingScheme from '../../../../assets/imgs/two-stage-desalting-scheme-img.png';
import partialStageDesaltingScheme from '../../../../assets/imgs/partial-desalting-scheme-img.png';
import { anionsSumSymbol, HardnessK } from '../../textVariables/symbols';
import {
  Al2SO3,
  Cl,
  CO2,
  CO3,
  FeSO4,
  HCO3,
  HSiO3,
  NO2,
  NO3,
  SiO3,
  SO4,
} from '../../textVariables/chemicalText';

export default function AdditionalWaterScheme() {
  const { carbonateHardness } = waterData;

  const anionsSum = waterIonicComposition.getAnionsSumHard();

  return (
    <>
      <h3 className="calc-block__title">
        Выбор схемы обработки добавочной воды
      </h3>
      <p>
        Выбор способов обработки добавочной воды котлов производится в
        зависимости от качества исходной воды и типа котельного агрегата.
      </p>
      <p>
        Водоподготовительные установки включают предочистку и ионитную часть.
        Предочистка состоит из осветлителей и осветлительных фильтров и служит
        для удаления из обрабатываемой воды грубодисперсных, коллоидных и
        частично молекулярно-дисперсных веществ. Ионитная часть схемы служит для
        полного удаления молекулярно-дисперсных веществ.
      </p>
      {carbonateHardness > 2 ? (
        <p>
          <InlineMath math={HardnessK} /> исходной воды более 2 мкг · экв./кг (
          {carbonateHardness} мкг · экв./кг), поэтому необходимо осуществлять
          коагуляцию сернокислым железом <InlineMath math={FeSO4} /> c
          известкованием в осветлителе с последующим осветлением в
          осветлительных фильтрах.
        </p>
      ) : (
        <p>
          <InlineMath math={HardnessK} /> исходной воды менее 2 мкг · экв./кг (
          {carbonateHardness} мкг · экв./кг), поэтому целесообразно применять
          коагуляцию воды сернокислым алюминием <InlineMath math={Al2SO3} /> в
          осветлителе с последующим осветлением в осветлительных фильтрах.
        </p>
      )}
      <p>Дальнейшая обработка воды проводится на ионитной части ВПУ.</p>
      {anionsSum > 2 ? (
        <>
          <p>
            <InlineMath math={anionsSumSymbol} /> = {anionsSum} {'>'} 2, поэтому
            предложена схема двухступенчатого химического обессоливания,
            включающая: первую ступень Н-катионирования, слабоосновное
            анионирование, декарбонизацию, вторую ступень Н-катионирования,
            сильноосновное анионирование (Н1-А1-D-Н2-А2). Данная схема
            представлена на рисунке (3.2).
          </p>
          <div className="calc-img__container">
            <img
              className="calc-img feed-water-treatment-scheme-img"
              src={twoStageDesaltingScheme}
              alt=""
            />
            <p className="calc-img-title">
              Рисунок 3.2 – Схема двухступенчатого обессоливания
            </p>
          </div>
          <p>
            В данной схеме, кроме двух ступеней умягчения воды (фильтры Н1 и
            Н2), установлены две ступени анионирования. Первую ступень (фильтр
            А1) загружают низкоосновным анионитом для удаления анионов сильных
            кислот (<InlineMath math={Cl} />,{'  '}
            <InlineMath math={SO4} />,{'  '}
            <InlineMath math={NO3} />,{'  '}
            <InlineMath math={NO2} />
            ). Вторую ступень (фильтр А2) загружают высокоосновным анионитом для
            удаления проскоков анионов сильных кислот, а главное – для удаления
            анионов слабых кислот (<InlineMath math={HCO3} />,{'  '}
            <InlineMath math={HSiO3} />,{'  '}
            <InlineMath math={CO3} />,{'  '}
            <InlineMath math={SiO3} /> и т. д.). Качество обессоленной воды при
            данной схеме: солесодержание – не более 0,2 мг/кг, кремнесодержание
            – не более 0,04 мг/кг.
          </p>
        </>
      ) : (
        <>
          <p>
            <InlineMath math={anionsSumSymbol} /> = {anionsSum} {'<'} 2, поэтому
            предложена схема упрощенного химического обессоливания, включающая:
            первую ступень Н-катионирования, вторую ступень Н-катионирования,
            декарбонизацию, сильноосновное анионирование (Н1-Н2-D-А2). Данная
            схема представлена на рисунке (3.2).
          </p>
          <div className="calc-img__container">
            <img
              className="calc-img feed-water-treatment-scheme-img"
              src={partialStageDesaltingScheme}
              alt=""
            />
            <p className="calc-img-title">
              Рисунок 3.2 – Схема частичного (упрощенного) обессоливания
            </p>
          </div>
          <p>
            В данной схеме катионитные фильтры Н1 и Н2 служат для глубокого
            умягчения воды. В декарбонизаторе происходит удаление свободной
            угольной кислоты <InlineMath math={CO2} />. Анионитный фильтр А2,
            загруженный высокоосновным анионитом, служит для удаления анионов
            как сильных, так и слабых кислот. Качество обессоленной воды:
            солесодержание порядка 1–3 мг/кг, кремнесодержание – не более
            0,1–0,3 мг/кг;
          </p>
        </>
      )}
    </>
  );
}
