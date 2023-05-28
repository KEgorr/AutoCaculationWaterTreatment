import { InlineMath } from 'react-katex';
import { IFilterProps } from '../../../types/props-types';
import { TChasDimension } from '../textVariables/dimensions';

export default function FilterTable({
  filters,
  reserveFiltersNumber,
}: IFilterProps) {
  return (
    <>
      <table>
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
            <td>{filters.performance}</td>
            <td>
              <InlineMath math={TChasDimension} />
            </td>
          </tr>
          <tr>
            <td>Рабочее давление</td>
            <td>{filters.pressure}</td>
            <td>МПа</td>
          </tr>
          <tr>
            <td>Диаметр корпуса фильтра</td>
            <td>{filters.diameter}</td>
            <td>мм</td>
          </tr>
          <tr>
            <td>Высота катионного слоя</td>
            <td>{filters.filtrationHeight}</td>
            <td>м</td>
          </tr>
          <tr>
            <td>Объем фильтрующей загрузки</td>
            <td>{filters.filterLoadSize}</td>
            <td>
              <InlineMath math={'м^3'} />
            </td>
          </tr>
          <tr>
            <td>Площадь фильтрации</td>
            <td>{filters.filtrationArea}</td>
            <td>
              <InlineMath math={'м^2'} />
            </td>
          </tr>
          <tr>
            <td>Количество основных фильтров</td>
            <td>{filters.numberOfFilters}</td>
            <td>шт</td>
          </tr>
          <tr>
            <td>Количество резервных фильтров фильтров</td>
            <td>{reserveFiltersNumber}</td>
            <td>шт</td>
          </tr>
        </tbody>
      </table>
      <p>
        Подробнее ознакомиться с данным фильтром можно ознакомиться по ссылке:{' '}
        <a href={filters.link}>{filters.link}</a>
      </p>
    </>
  );
}
