import { InlineMath } from 'react-katex';

export default function FilterDiggingDataTable() {
  return (
    <table className="calc-block__table">
      <thead>
        <tr>
          <th rowSpan={2}>Расчетные показатели</th>
          <th colSpan={8}>Диаметры стандартных фильтров, мм</th>
        </tr>
        <tr>
          <th>700</th>
          <th>1000</th>
          <th>1400</th>
          <th>1500</th>
          <th>2000</th>
          <th>2600</th>
          <th>3000</th>
          <th>3400</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Расход воды на взрыхляющую промывку (при интенсивности взрыхления 12{' '}
            <InlineMath math="л/с · м^2" />
            ), <InlineMath math="м^3" />
          </td>
          <td>1.4</td>
          <td>2.7</td>
          <td>5.5</td>
          <td>6.2</td>
          <td>11.2</td>
          <td>18.7</td>
          <td>25.0</td>
          <td>32.0</td>
        </tr>
        <tr>
          <td>
            Часовой расход воды на взрыхление, <InlineMath math="м^3/ч" />
          </td>
          <td>17</td>
          <td>33</td>
          <td>65</td>
          <td>74</td>
          <td>134</td>
          <td>225</td>
          <td>300</td>
          <td>385</td>
        </tr>
        <tr>
          <td>
            Объем промывочного бачка, <InlineMath math="м^3" />
          </td>
          <td>2</td>
          <td>4</td>
          <td>6</td>
          <td>8</td>
          <td>15</td>
          <td>24</td>
          <td>33</td>
          <td>42</td>
        </tr>
      </tbody>
    </table>
  );
}
