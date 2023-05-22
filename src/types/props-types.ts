import { IBoilerData, IWaterData } from './data-types';

export interface InputProps {
  waterData: IWaterData;
  className: string;
  update(id: number, value: string): void;
}

export interface InputWaterDataProps {
  waterData: IWaterData[];
  update(id: number, value: string): void;
}

export interface IAddBoilerProps {
  onAddBoiler(boilerData: IBoilerData): void;
  onChangeBoiler(boilerData: IBoilerData): void;
  chosenBoiler?: IBoilerData;
}

export interface IBoilerTableProps {
  onChangeBoiler(boilerData: IBoilerData): void;
  removeBoiler(): void;
  chosenBoiler?: IBoilerData;
}

export interface IBoilerRowProps {
  boilerData: IBoilerData;
  onChoseBoiler(boilerData: IBoilerData): void;
  chosenBoilerClass: string;
  boilerNumber: number;
}

export interface InputBoilerDataProps {
  title: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
  dimension?: string;
  className: string;
  type?: string;
  checkedValue?: string;
  hint?: string;
}
