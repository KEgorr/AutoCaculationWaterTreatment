import { InlineMath } from 'react-katex';
import { alpha } from '../../textVariables/symbols';

export default function AlphaCorrectionTable() {
  return (
    <table className="calc-block__table">
      <tbody>
        <tr>
          <td>Сухой остаток, мл/л</td>
          <td>100</td>
          <td>200</td>
          <td>300</td>
          <td>400</td>
          <td>500</td>
          <td>750</td>
          <td>1000</td>
        </tr>
        <tr>
          <td>
            Поправочный коэффициент, <InlineMath math={alpha} />
          </td>
          <td>1.05</td>
          <td>1.0</td>
          <td>0.96</td>
          <td>0.94</td>
          <td>0.92</td>
          <td>0.87</td>
          <td>0.83</td>
        </tr>
      </tbody>
    </table>
  );
}
