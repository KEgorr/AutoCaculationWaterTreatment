import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import waterIonicComposition from '../../../modules/WaterIonicComposition/WaterIonicComposition';
import waterData from '../../../modules/Basic data/WaterData';

export default function RecalculationWater() {
  const Ca2 = `Ca^{2+}`;
  const Mg2 = `Mg^{2+}`;
  const Na = `Na^{+}`;
  const Fe3 = `Fe^{3+}`;
  const HCO3 = `HCO_3^{-}`;
  const SO4 = `SO_4^{2-}`;
  const Cl = `NO_3^{-}`;
  const NO3 = `Cl^{-}`;
  const SiO3 = `SiO_3^{2-}`;

  const equivalentFormula = `\\tag{1} Э^x = \\frac{M}{n}`;
  const CaEquivalentFormula = `Э^{${Ca2}} = \\frac{M}{n} = \\frac{40,08}{2} = 20,04, экв`;
  const Ca2formula = `${Ca2} = \\frac{${
    waterData.Ca2
  }}{20,04} = ${waterIonicComposition.getCa2()}`;
  const cationsSum = `\\tag{2} \\sum Кат = ${Ca2} + ${Mg2} + ${Na} + ${Fe3}`;
  const anionsSum = `\\tag{3} \\sum Ан = ${HCO3} + ${SO4} + ${Cl} + ${NO3} + ${SiO3}`;

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
        Перерасчет показателей качества исходной воды
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className="calc-block__content">
          <p>
            Для перерасчета показателей качества воды из мг/кг в мг·экв/кг
            используется понятие «эквивалент» вещества — это такое количество
            химического вещества, которое реагирует с 1 г водорода или вытесняет
            такое же количество водорода из его соединений.
          </p>
          <p>Эквивалент вещества находится по формуле 1:</p>
          <BlockMath math={equivalentFormula} />
          <p>где M – молекулярная масса вещества; n – валентность.</p>
          <p>
            В исходной воде катионов <InlineMath math={Ca2} /> содержится
            {waterData.Ca2} мг/кг.
          </p>
          <p>
            Определяем эквивалент <InlineMath math={Ca2} /> по выражению (1)
          </p>
          <BlockMath math={CaEquivalentFormula} />
          <BlockMath math={Ca2formula} />
          <p>
            Таким же образом производится перерасчет всех анионов и катионов.
            Ионный состав воды представлен в таблице 1.
          </p>
          <p>
            Для определения суммарной концентрации катионов и анионов
            используются выражения (2) и (3):
          </p>
          <BlockMath math={cationsSum} />
          <BlockMath math={anionsSum} />
          <div>
            <p>Таблица 1 - Ионный состав воды</p>
            <table className="ionic-table">
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
