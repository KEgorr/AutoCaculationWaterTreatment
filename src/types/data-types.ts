interface IObjectKeys {
  [key: string]: IBoilerDataValue | number | string | boolean | undefined;
}

export interface IBoilerDataValue {
  value: string;
  isValid: boolean;
}

export function isBoilerDataValue(obj: unknown): obj is IBoilerDataValue {
  return (obj as IBoilerDataValue).isValid !== undefined;
}

export interface IBoilerData extends IObjectKeys {
  id: number;
  name: IBoilerDataValue;
  performance: IBoilerDataValue;
  numberOfBoilers: IBoilerDataValue;
  pressure: IBoilerDataValue;
  boilerType: IBoilerDataValue;
  separationType: IBoilerDataValue;
  steamLosses: IBoilerDataValue;
  requiredDryResidue: IBoilerDataValue;
}

export interface IWaterData extends IObjectKeys {
  id: number;
  name: string;
  value: string;
  dimension: string;
  sub?: string;
  sup?: string;
  isValid?: boolean;
}

export interface IFilter {
  id: number;
  name: string;
  performance: number;
  pressure: number;
  diameter: number;
  filtrationArea: number;
  link: string;
  filterLoadSize: number;
  filtrationHeight: number;
}

export interface ICheckedFilter extends IFilter {
  numberOfFilters: number;
}

export const enum UnitSaltUsage {
  under5 = 140,
  under10 = 160,
  under15 = 210,
  under20 = 230,
  secondStage = 350,
}

export const enum FilterStage {
  NaCationSecondStage,
  NaCationFirstStage,
  HCationStage,
}

export const enum BrightenersType {
  liming = 'и',
  coagulation = 'к',
}

export interface IBrightener {
  id: number;
  name: string;
  performance: number;
  diameter: number;
  brightArea: number;
  fullSize: number;
  speedClogged: number;
  speedBright: number;
  brightHeight: number;
  time: number;
}

export interface IValidBrightener extends IBrightener {
  numberOfBrighteners: number;
}

export interface IBrightenersChoosingProps {
  brightenersType: BrightenersType;
}

export interface IBrightenerTableProps {
  brightener: IValidBrightener;
}

export interface IDeaerator {
  id: number;
  name: string;
  performance: number;
  performanceDiapason: string;
  pressure: number;
  temperature: number;
  averageWaterHeating: string;
  tankType: string;
  tankCapacity: number;
  evaporationType: string;
  evaporationArea: number;
  safetyDevice: string;
  link: string;
}

export interface IValidDeaerator extends IDeaerator {
  numberOfDeaerators: number;
}

export interface IDeaeratorTableProps {
  deaerator: IValidDeaerator;
}
