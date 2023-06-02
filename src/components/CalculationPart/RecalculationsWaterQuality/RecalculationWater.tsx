import { useEffect, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import waterIonicComposition from '../../../modules/WaterIonicComposition/waterIonicComposition';
import waterData from '../../../modules/Basic data/WaterData';
import {
  Ca2,
  Cl,
  Fe3,
  HCO3,
  Mg2,
  Na,
  NO3,
  SiO3,
  SO4,
} from '../textVariables/chemicalText';
import { ICalcProps } from '../../../types/data-types';

export default function RecalculationWater({ calcCount }: ICalcProps) {
  const equivalentFormula = `\\tag{1.1} Э^x = \\frac{M}{n},`;
  const CaEquivalentCalc = `Э^{${Ca2}} = \\frac{M}{n} = \\frac{40,08}{2} = 20,04, экв`;
  const Ca2Calc = `${Ca2} = \\frac{${
    waterData.Ca2
  }}{20,04} = ${waterIonicComposition.getCa2()}`;
  const cationsSum = `\\tag{1.2} \\sum Кат = ${Ca2} + ${Mg2} + ${Na} + ${Fe3}`;
  const anionsSum = `\\tag{1.3} \\sum Ан = ${HCO3} + ${SO4} + ${Cl} + ${NO3} + ${SiO3}`;

  const [isHidden, setHidden] = useState(true);
  const [isHide, setHide] = useState('calc-block__content content-hide');

  function changeVisibility() {
    if (isHidden) {
      setHidden(false);
      setHide('calc-block__content');
      return;
    }
    setHidden(true);
    setTimeout(() => {
      setHide('calc-block__content content-hide');
    }, 500);
  }

  useEffect(() => setHidden(true), [calcCount]);
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
        1 Перерасчет показателей качества исходной воды
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className={isHide}>
          <p>
            Для перерасчета показателей качества воды из мг/кг в мг·экв/кг
            используется понятие «эквивалент» вещества — это такое количество
            химического вещества, которое реагирует с 1 г водорода или вытесняет
            такое же количество водорода из его соединений.
          </p>
          <p>Эквивалент вещества находится по формуле (1.1):</p>
          <BlockMath math={equivalentFormula} />
          <p>где M – молекулярная масса вещества; n – валентность.</p>
          <p>
            В исходной воде катионов <InlineMath math={Ca2} /> содержится{' '}
            {waterData.Ca2} мг/кг.
          </p>
          <p>
            Определяем эквивалент <InlineMath math={Ca2} /> по выражению (1.1):
          </p>
          <BlockMath math={CaEquivalentCalc} />
          <BlockMath math={Ca2Calc} />
          <p>
            Таким же образом производится перерасчет всех анионов и катионов.
            Ионный состав воды представлен в таблице 1.1.
          </p>
          <p>
            Для определения суммарной концентрации катионов и анионов
            используются выражения (1.2) и (1.3):
          </p>
          <BlockMath math={cationsSum} />
          <BlockMath math={anionsSum} />
          <div className="calc-block__table-container">
            <p>Таблица 1.1 - Ионный состав воды</p>
            <table className="calc-block__table">
              <thead>
                <tr>
                  <th></th>
                  <th>мг/кг</th>
                  <th>мг·экв/кг</th>
                  <th></th>
                  <th>мг/кг</th>
                  <th>мг·экв/кг</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <InlineMath math={Ca2} />
                  </td>
                  <td>{waterData.Ca2}</td>
                  <td>{waterIonicComposition.getCa2()}</td>
                  <td>
                    <InlineMath math={HCO3} />
                  </td>
                  <td>{waterData.HCO3}</td>
                  <td>{waterIonicComposition.getHCO3()}</td>
                </tr>
                <tr>
                  <td>
                    <InlineMath math={Mg2} />
                  </td>
                  <td>{waterData.Mg2}</td>
                  <td>{waterIonicComposition.getMg2()}</td>
                  <td>
                    <InlineMath math={SO4} />
                  </td>
                  <td>{waterData.SO4}</td>
                  <td>{waterIonicComposition.getSO4()}</td>
                </tr>
                <tr>
                  <td>
                    <InlineMath math={Na} />
                  </td>
                  <td>{waterData.Na}</td>
                  <td>{waterIonicComposition.getNa()}</td>
                  <td>
                    <InlineMath math={Cl} />
                  </td>
                  <td>{waterData.Cl}</td>
                  <td>{waterIonicComposition.getCl()}</td>
                </tr>
                <tr>
                  <td>
                    <InlineMath math={Fe3} />
                  </td>
                  <td>{waterData.Fe3}</td>
                  <td>{waterIonicComposition.getFe3()}</td>
                  <td>
                    <InlineMath math={NO3} />
                  </td>
                  <td>{waterData.NO3}</td>
                  <td>{waterIonicComposition.getNO3()}</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <InlineMath math={SiO3} />
                  </td>
                  <td>{waterData.SIO3}</td>
                  <td>{waterIonicComposition.getSIO3()}</td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <InlineMath
                      math={`\\sum Кат = ${waterIonicComposition.getCationsSum()}`}
                    />
                  </td>
                  <td colSpan={3}>
                    <InlineMath
                      math={`\\sum An = ${waterIonicComposition.getAnionsSum()}`}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
