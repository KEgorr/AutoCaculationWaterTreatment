import { IWaterData } from '../../types/data-types';

class WaterData {
  suspendedMatter: number;
  dryResidue: number;
  alkalinity: number;
  carbonateHardness: number;
  totalHardness: number;

  Ca2: number;
  Mg2: number;
  Na: number;
  Fe3: number;
  HCO3: number;
  SO4: number;
  Cl: number;
  NO3: number;
  SIO3: number;

  constructor() {
    this.suspendedMatter = 0;
    this.dryResidue = 0;
    this.alkalinity = 0;
    this.carbonateHardness = 0;
    this.totalHardness = 0;

    this.Ca2 = 0;
    this.Mg2 = 0;
    this.Na = 0;
    this.Fe3 = 0;
    this.HCO3 = 0;
    this.SO4 = 0;
    this.Cl = 0;
    this.NO3 = 0;
    this.SIO3 = 0;
  }

  setWaterData(waterData: IWaterData[]) {
    waterData.forEach((data) => {
      const dataName = data.name;
      const value = Number(data.value);
      switch (dataName) {
        case 'Взвешенные вещества':
          this.suspendedMatter = value;
          break;
        case 'Сухой остаток':
          this.dryResidue = value;
          break;
        case 'Щелочность':
          this.alkalinity = value;
          break;
        case 'Жесткость карбонатная':
          this.carbonateHardness = value;
          break;
        case 'Жесткость общая':
          this.totalHardness = value;
          break;
        case 'Ca':
          this.Ca2 = value;
          break;
        case 'Mg':
          this.Mg2 = value;
          break;
        case 'Na':
          this.Na = value;
          break;
        case 'Fe':
          this.Fe3 = value;
          break;
        case 'HCO':
          this.HCO3 = value;
          break;
        case 'SO':
          this.SO4 = value;
          break;
        case 'Cl':
          this.Cl = value;
          break;
        case 'NO':
          this.NO3 = value;
          break;
        case 'SIO':
          this.SIO3 = value;
          break;
        default:
          console.log(dataName);
      }
    });
  }
}

const waterData = new WaterData();

export default waterData;
