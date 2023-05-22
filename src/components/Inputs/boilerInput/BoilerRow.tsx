import { IBoilerRowProps } from '../../../types/props-types';

export default function BoilerRow({
  boilerData,
  onChoseBoiler,
  chosenBoilerClass,
  boilerNumber,
}: IBoilerRowProps) {
  let steamLosses = 'Расчет исходя из типа котла';
  if (boilerData.steamLosses.value !== '') {
    steamLosses = boilerData.steamLosses.value;
  }
  let requiredDryResidue = 'Расчет исходя из типа котла';
  if (boilerData.requiredDryResidue.value !== '') {
    requiredDryResidue = boilerData.requiredDryResidue.value;
  }
  return (
    <tr onClick={() => onChoseBoiler(boilerData)} className={chosenBoilerClass}>
      <td className="boilers-table__td">{boilerNumber}</td>
      <td className="boilers-table__td">{boilerData.name.value}</td>
      <td className="boilers-table__td">{boilerData.performance.value}</td>
      <td className="boilers-table__td">{boilerData.pressure.value}</td>
      <td className="boilers-table__td">{boilerData.numberOfBoilers.value}</td>
      <td className="boilers-table__td">{steamLosses}</td>
      <td className="boilers-table__td">{requiredDryResidue}</td>
      <td className="boilers-table__td">{boilerData.boilerType.value}</td>
      <td className="boilers-table__td">{boilerData.separationType.value}</td>
    </tr>
  );
}
