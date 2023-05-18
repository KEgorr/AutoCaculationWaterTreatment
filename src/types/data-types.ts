export interface IBoilerDataValue {
  value: string;
  isValid: boolean;
}

export function isBoilerDataValue(obj: unknown): obj is IBoilerDataValue {
  return (obj as IBoilerDataValue).isValid !== undefined;
}

interface IObjectKeys {
  [key: string]: IBoilerDataValue | number;
}

export interface IBoilerData extends IObjectKeys {
  id: number;
  name: IBoilerDataValue;
  performance: IBoilerDataValue;
  numberOfBoilers: IBoilerDataValue;
  pressure: IBoilerDataValue;
}

export interface IWaterData {
  id: number;
  name: string;
  value: string;
  dimension: string;
  sub?: string;
  sup?: string;
  isValid?: boolean;
}
