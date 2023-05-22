import { IBoilerData } from '../../types/data-types';

class BoilerData {
  name: string;
  performance: number;
  numberOfBoilers: number;
  pressure: number;
  boilerType: string;
  separationType: string;
  steamLosses: number;
  requiredDryResidue: number;

  constructor() {
    this.name = '';
    this.performance = 0;
    this.numberOfBoilers = 0;
    this.pressure = 0;
    this.boilerType = '';
    this.separationType = '';
    this.steamLosses = 0.5;
    this.requiredDryResidue = 0;
  }

  setBoilerData(boilerData: IBoilerData) {
    this.name = boilerData.name.value;
    this.performance = Number(boilerData.performance.value);
    this.numberOfBoilers = Number(boilerData.numberOfBoilers.value);
    this.pressure = Number(boilerData.pressure.value);
    this.boilerType = boilerData.boilerType.value;
    this.separationType = boilerData.separationType.value;
    if (boilerData.steamLosses.value !== '') {
      this.steamLosses = Number(boilerData.steamLosses.value);
    }
    if (boilerData.requiredDryResidue.value === '') {
      this.setRequiredDryResidue();
    } else
      this.requiredDryResidue = Number(boilerData.requiredDryResidue.value);
  }

  private setRequiredDryResidue() {
    switch (this.separationType) {
      case 'Механические внутрибарабанные сепарационные устройства':
        this.requiredDryResidue = 3000;
        break;
      case 'Внутрибарабанные сепараторы':
        this.requiredDryResidue = 4000;
        break;
      case 'Двухступенчатое испарение и механические внутрибарабанные сепарационные устройства':
        this.requiredDryResidue = 6000;
        break;
      case 'Выносные циклоны при двухступенчатом испарении':
        this.requiredDryResidue = 10000;
        break;
      default:
        throw new Error('suka');
    }
  }
}

const boilerData = new BoilerData();

export default boilerData;
