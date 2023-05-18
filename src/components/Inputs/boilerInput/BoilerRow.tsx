import { IBoilerRowProps } from '../../../types/props-types';

export default function BoilerRow({
  boilerData,
  onChoseBoiler,
  chosenBoilerClass,
  boilerNumber,
}: IBoilerRowProps) {
  return (
    <tr onClick={() => onChoseBoiler(boilerData)} className={chosenBoilerClass}>
      <td>{boilerNumber}</td>
      <td>{boilerData.name.value}</td>
      <td>{boilerData.performance.value}</td>
      <td>{boilerData.pressure.value}</td>
      <td>{boilerData.numberOfBoilers.value}</td>
    </tr>
  );
}
