import { IBoilerRowProps } from '../../../types/props-types';

export default function BoilerRow({
  boilerData,
  onChoseBoiler,
  chosenBoilerClass,
  boilerNumber,
}: IBoilerRowProps) {
  return (
    <tr onClick={() => onChoseBoiler(boilerData)} className={chosenBoilerClass}>
      <td className="boilers-table__td">{boilerNumber}</td>
      <td className="boilers-table__td">{boilerData.name.value}</td>
      <td className="boilers-table__td">{boilerData.performance.value}</td>
      <td className="boilers-table__td">{boilerData.pressure.value}</td>
      <td className="boilers-table__td">{boilerData.numberOfBoilers.value}</td>
      <td className="boilers-table__td">{boilerData.boilerType.value}</td>
      <td className="boilers-table__td">{boilerData.separationType.value}</td>
    </tr>
  );
}
