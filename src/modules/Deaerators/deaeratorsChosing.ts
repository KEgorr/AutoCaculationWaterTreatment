import { IValidDeaerator } from '../../types/data-types';
import deaeratorsData from '../Basic data/deaeratorsData';
import steamBalanceBoiler from '../SteamBalanceOfBoiler/steamBalanceOfBoiller';

export default function getDeaerators(number: number): IValidDeaerator {
  const performance = steamBalanceBoiler.getWTP() / number;
  const validDeaerators = deaeratorsData.find(
    (deaerator) => deaerator.performance > performance
  );
  if (validDeaerators) {
    return { ...validDeaerators, numberOfDeaerators: number };
  }
  return getDeaerators(number + 1);
}
