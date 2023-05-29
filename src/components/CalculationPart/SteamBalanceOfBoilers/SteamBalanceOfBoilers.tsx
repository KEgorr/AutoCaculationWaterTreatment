import { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import steamBalanceBoiler from '../../../modules/SteamBalanceOfBoiler/steamBalanceOfBoiller';
import { TChasDimension } from '../textVariables/dimensions';
import { G1, G2, q3, q4, q5, q6, q7, q8, Q_pk } from '../textVariables/symbols';

export default function SteamBalanceBoilers() {
  const [isHidden, setHidden] = useState(true);

  const G1Formula = `${G1} = NQ`;
  const G1Calc = `${G1} = ${steamBalanceBoiler.getG1()}`;

  const G2Formula = `${G2} = 0,7${G1}`;
  const G2Calc = `${G2} = ${steamBalanceBoiler.getG2()}`;

  const q3Formula = `${q3} = 0.5${G2}`;
  const q3Calc = `${q3} = ${steamBalanceBoiler.getQ3()}`;

  const q4Formula = `${q4} = 0.03${q3}`;
  const q4Calc = `${q4} = ${steamBalanceBoiler.getQ4()}`;

  const q5Formula = `${q5} = 0.02${q3}`;
  const q5Calc = `${q5} = ${steamBalanceBoiler.getQ5()}`;

  const q6Formula = `${q6} = 0.5${G1}`;
  const q6Calc = `${q6} = ${steamBalanceBoiler.getQ6()}`;

  const q7Formula = `${q7} = 0.07${G1}`;
  const q7Calc = `${q7} = ${steamBalanceBoiler.getQ7()}`;

  const q8Formula = `${q8} = 0.3${q7}`;
  const q8Calc = `${q8} = ${steamBalanceBoiler.getQ8()}`;

  const QPkFormula = `\\tag{4.1} ${Q_pk} = k${q3} + ${q4} + ${q5} + ${q6} + ${q7} + ${q8} + P\\frac{${G1}}{100} \\ ${TChasDimension},`;
  const QPkCalc = `${Q_pk} = 1.2 * ${steamBalanceBoiler.getQ3()} + ${steamBalanceBoiler.getQ4()} + ${steamBalanceBoiler.getQ5()} + ${steamBalanceBoiler.getQ6()} + ${steamBalanceBoiler.getQ7()} + ${steamBalanceBoiler.getQ8()} + P\\frac{${steamBalanceBoiler.getG1()}}{100} = ${steamBalanceBoiler.getWTP()} \\ ${TChasDimension}`;

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
        4 Паровой (тепловой) баланс котельной установки
      </h2>
      <div className={isHidden ? 'calc-block block-hidden' : 'calc-block'}>
        <div className="calc-block__content">
          <p>Паровой баланс котельной представлен в таблице (4.1).</p>
          <div>
            <div className="calc-block__table-container">
              <p className="table-tittle">Таблица 4.1 - Ионный состав воды</p>
              <table className="calc-block__table">
                <thead>
                  <tr>
                    <th>Расходы</th>
                    <th>Максимально-зимний режим</th>
                    <th>Результат</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Паропроизвоительность котельной, т/ч</td>
                    <td>
                      <InlineMath math={G1Formula} />
                    </td>
                    <td>
                      <InlineMath math={G1Calc} />
                    </td>
                  </tr>
                  <tr>
                    <td>Расход пара на производство, т/ч</td>
                    <td>
                      <InlineMath math={G2Formula} />
                    </td>
                    <td>
                      <InlineMath math={G2Calc} />
                    </td>
                  </tr>
                  <tr>
                    <td>Потери на производстве, т/ч</td>
                    <td>
                      <InlineMath math={q3Formula} />
                    </td>
                    <td>
                      <InlineMath math={q3Calc} />
                    </td>
                  </tr>
                  <tr>
                    <td>Потери на разогрев мазута, т/ч</td>
                    <td>
                      <InlineMath math={q4Formula} />
                    </td>
                    <td>
                      <InlineMath math={q4Calc} />
                    </td>
                  </tr>
                  <tr>
                    <td>Потери в котельной, т/ч</td>
                    <td>
                      <InlineMath math={q5Formula} />
                    </td>
                    <td>
                      <InlineMath math={q5Calc} />
                    </td>
                  </tr>
                  <tr>
                    <td>Суммарные потери пара и конденсата, т/ч</td>
                    <td>
                      <InlineMath math={q6Formula} />
                    </td>
                    <td>
                      <InlineMath math={q6Calc} />
                    </td>
                  </tr>
                  <tr>
                    <td>Потери в деаэраторе подпиточной воды, т/ч</td>
                    <td>
                      <InlineMath math={q7Formula} />
                    </td>
                    <td>
                      <InlineMath math={q7Calc} />
                    </td>
                  </tr>
                  <tr>
                    <td>Потери с выпаром в деаэраторе, т/ч</td>
                    <td>
                      <InlineMath math={q8Formula} />
                    </td>
                    <td>
                      <InlineMath math={q8Calc} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>Где: N – количество котлов; Q – производительность котла.</p>
            </div>
          </div>
          <h3 className="calc-block__title">
            Обоснование производительности водоподготовительной установки
          </h3>
          <p>
            Расход химически обработанной воды на питание паровых котлов
            слагается из потерь пара и конденсата. При этом учитывается
            возможность недовозврата 20 % конденсата и 3 % продувка котлов, 20 %
            от потерь на производство, 3 % от паропроизводительности котельной.
          </p>
          <p>
            Расход воды на питание паровых котлов для водоподготовительной
            установки находится по формуле (4.1):
          </p>
          <BlockMath math={QPkFormula} />
          <p>
            где <InlineMath math="k" /> = 1,2 – коэффициент, учитывающий
            возможность недовозврата.
          </p>
          <p>Таким образом расход воды на питание паровых котлов равен:</p>
          <BlockMath math={QPkCalc} />
        </div>
      </div>
    </div>
  );
}
