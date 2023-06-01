import { BlockMath, InlineMath } from 'react-katex';
import waterData from '../../../modules/Basic data/WaterData';
import brightener from '../../../modules/Brighteners/Brighteners';
import steamBalanceBoiler from '../../../modules/SteamBalanceOfBoiler/steamBalanceOfBoiller';
import {
  BrightenersType,
  IBrightenersChoosingProps,
} from '../../../types/data-types';
import { TChasDimension } from '../textVariables/dimensions';
import { Delta_sr, Q_osv, Q_ov, Q_sh } from '../textVariables/symbols';
import BrightenerTable from './BrightenerTable';
import SuspendedMatterConcentrationTable from './SuspendedMatterConcentrationTable';

export default function BrightenersChoosing({
  brightenersType,
}: IBrightenersChoosingProps) {
  const fCount = brightenersType === BrightenersType.coagulation ? 2 : 3;

  const { suspendedMatter } = waterData;

  const deltaSr = brightener.getDeltaSr(brightenersType);
  const P = brightener.getBlowDownBrighteners(brightenersType);
  const sludgeCount = brightener.getSludgeCount(brightenersType);
  const Qov = brightener.getQOVost();
  const blowDownFormula = `\\tag{9.${fCount}} P = \\frac{${Q_sh} - ${Q_ov}}{1000${Delta_sr}}100\\%,`;
  const blowDownCalc = `P = \\frac{${sludgeCount} - ${Qov}}{1000 · ${deltaSr}}100 = ${P}\\%`;

  const Q = brightener.getBrightenerPerformance(brightenersType);
  const Qosv = steamBalanceBoiler.getWTP();
  const QFormula = `\\tag{9.${
    fCount + 1
  }} Q = ${Q_osv} + \\frac{P${Q_osv}}{100} \\ ${TChasDimension},`;
  const QCalc = `Q = ${Qosv} + \\frac{${P} · ${Qosv}}{100} = ${Q} \\  ${TChasDimension}`;

  const chosenBrightener = brightener.gerBrightener(brightenersType, 1);

  return (
    <>
      <p>
        Величина продувки осветлителя, определяется по формуле (9.{fCount}):
      </p>
      <BlockMath math={blowDownFormula} />
      <p>
        где <InlineMath math={Q_sh} /> = {sludgeCount}{' '}
        <InlineMath math="г/м^3" /> - количество взвешенных веществ, вносимых с
        обрабатываемой водой реагентами и образующихся в процессе осветления или
        умягчения;
      </p>
      <p>
        <InlineMath math={Q_ov} /> = {Qov} <InlineMath math="г/м^3" /> -
        остаточное содержание взвешенных веществ в обработанной воде после
        осветлителя;
      </p>
      <p>
        <InlineMath math={Delta_sr} /> - средняя концентрация взвешенных веществ
        в уплотненном осадке в зависимости от времени отстоя воды, определяется
        по таблице 9.1, при сухом остатке = {suspendedMatter} мг/кг и средней
        продолжительности уплотнения = 8 ч <InlineMath math={Delta_sr} /> ={' '}
        {deltaSr} г/кг
      </p>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 9.1 Средняя концентрация взвешенных веществ в уплотненном
          осадке, г/кг
        </p>
        <SuspendedMatterConcentrationTable />
      </div>
      <p>Таким образом величина продувки будет равна:</p>
      <BlockMath math={blowDownCalc} />
      <p>
        Количество воды, подаваемой на осветлитель определяется по формуле 9.
        {fCount + 1}
      </p>
      <BlockMath math={QFormula} />
      <p>
        где <InlineMath math={Q_osv} /> = {Qosv}{' '}
        <InlineMath math={TChasDimension} /> - производительность осветлителя,
        принято равным производительности ВПУ.
      </p>
      <BlockMath math={QCalc} />
      <p>
        Таким образом на основе расхода воды, подаваемой на осветитель подобран
        наиболее близкий по производительности осветитель{' '}
        {chosenBrightener.name} в количестве{' '}
        {chosenBrightener.numberOfBrighteners} шт. Характеристики данного
        осветителя представлены в таблице 9.2:
      </p>
      <div className="calc-block__table-container">
        <p className="table-tittle">
          Таблица 9.2 Характеристики осветителя {chosenBrightener.name}
        </p>
        <BrightenerTable brightener={chosenBrightener} />
      </div>
    </>
  );
}
