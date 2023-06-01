import { InlineMath } from 'react-katex';
import { IDeaeratorTableProps } from '../../../types/data-types';
import { TChasDimension } from '../textVariables/dimensions';

export default function DeaeratorsTable({ deaerator }: IDeaeratorTableProps) {
  return (
    <>
      <table className="calc-block__table">
        <thead>
          <tr>
            <th>Наименование параметров</th>
            <th>Величина</th>
            <th>Ед. изм.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Производительность</td>
            <td>{deaerator.performance}</td>
            <td>
              <InlineMath math={TChasDimension} />
            </td>
          </tr>
          <tr>
            <td>Диапазон производительности</td>
            <td>{deaerator.performanceDiapason}</td>
            <td>
              <InlineMath math={TChasDimension} />
            </td>
          </tr>
          <tr>
            <td>Рабочее давление</td>
            <td>{deaerator.pressure}</td>
            <td>МПа</td>
          </tr>
          <tr>
            <td>Температура деаэрированной воды</td>
            <td>{deaerator.temperature}</td>
            <td>°С</td>
          </tr>
          <tr>
            <td>Средний нагрев воды в деаэраторе</td>
            <td>{deaerator.averageWaterHeating}</td>
            <td>°С</td>
          </tr>
          <tr>
            <td>Тип бака</td>
            <td>{deaerator.tankType}</td>
            <td></td>
          </tr>
          <tr>
            <td>Емкость бака</td>
            <td>{deaerator.tankCapacity}</td>
            <td>
              <InlineMath math="м^2" />
            </td>
          </tr>
          <tr>
            <td>Типоразмер охладителя выпара</td>
            <td>{deaerator.evaporationType}</td>
            <td></td>
          </tr>
          <tr>
            <td>Площадь поверхности теплообмена охладителя выпара</td>
            <td>{deaerator.evaporationType}</td>
            <td>
              <InlineMath math="м^2" />
            </td>
          </tr>
          <tr>
            <td>Предохранительное устройство</td>
            <td>{deaerator.safetyDevice}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <p>
        Подробнее с данным деаэратором можно ознакомиться по ссылке:{' '}
        <a href={deaerator.link} target="_blank" rel="noreferrer">
          {deaerator.link}
        </a>
      </p>
    </>
  );
}
