import { InlineMath } from 'react-katex';
import { IBrightenerTableProps } from '../../../types/data-types';
import { TChasDimension } from '../textVariables/dimensions';

export default function BrightenerTable({ brightener }: IBrightenerTableProps) {
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
            <td>Продолжительность</td>
            <td>{brightener.performance}</td>
            <td>
              <InlineMath math={TChasDimension} />
            </td>
          </tr>
          <tr>
            <td>Диаметр</td>
            <td>{brightener.diameter}</td>
            <td>м</td>
          </tr>
          <tr>
            <td>Площадь сечения зоны осветления</td>
            <td>{brightener.brightArea}</td>
            <td>м</td>
          </tr>
          <tr>
            <td>Диаметр</td>
            <td>{brightener.diameter}</td>
            <td>
              <InlineMath math="м^2" />
            </td>
          </tr>
          <tr>
            <td>Объем общий</td>
            <td>{brightener.fullSize}</td>
            <td>
              <InlineMath math="м^3" />
            </td>
          </tr>
          <tr>
            <td>Скорость подъема в зоне зашламления</td>
            <td>{brightener.speedClogged}</td>
            <td>м/ч</td>
          </tr>
          <tr>
            <td>Скорость подъема в зоне осветления</td>
            <td>{brightener.speedBright}</td>
            <td>м/ч</td>
          </tr>
          <tr>
            <td>Высота зоны осветления</td>
            <td>{brightener.brightHeight}</td>
            <td>м</td>
          </tr>
          <tr>
            <td>Время пребывания воды в осветлителе</td>
            <td>{brightener.time}</td>
            <td>ч</td>
          </tr>
          <tr>
            <td>Количество принятых осветителей</td>
            <td>{brightener.numberOfBrighteners}</td>
            <td>шт</td>
          </tr>
        </tbody>
      </table>
      <p>
        Подробнее с работой осветителей и их характеристиками можно ознакомиться
        по ссылкам:
      </p>
      <p>
        Характеристики осветителей типа ВТИ:{' '}
        <a
          href="http://www.pgvu.ru/ko/osvetliteli.html"
          target="_blank"
          rel="noreferrer"
        >
          http://www.pgvu.ru/ko/osvetliteli.html
        </a>
      </p>
      <p>
        Справочный материал по работе осветителей и их эксплуатации:{' '}
        <a
          href="http://twt.mpei.ac.ru/books/vve/CH2.4_pg1.htm"
          target="_blank"
          rel="noreferrer"
        >
          http://twt.mpei.ac.ru/books/vve/CH2.4_pg1.htm
        </a>
      </p>
    </>
  );
}
