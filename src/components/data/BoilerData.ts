import { IBoilerData } from '../../types/data-types';

class BoilerData {
  name?: string;
  performance?: number;
  numberOfBoilers?: number;
  pressure?: number;
  boilerType?: string;
  separationType?: string;

  setBoilerData(boilerData: IBoilerData) {
    Object.keys(boilerData).forEach((key) => {
      switch (key) {
        case 'name':
          this.name = boilerData[key].value;
          break;
        case 'performance':
          this.performance = Number(boilerData[key].value);
          break;
        case 'numberOfBoilers':
          this.numberOfBoilers = Number(boilerData[key].value);
          break;
        case 'pressure':
          this.pressure = Number(boilerData[key].value);
          break;
        case 'boilerType':
          this.boilerType = boilerData[key].value;
          break;
        case 'separationType':
          this.separationType = boilerData[key].value;
          break;
        default:
          console.log(key);
      }
    });
    console.log(this);
  }
}

const boilerData = new BoilerData();

export default boilerData;
