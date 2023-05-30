import { FilterStage } from '../../types/data-types';
import waterData from '../Basic data/WaterData';
import { hCationFilter } from '../FiltersCalculation/CationsFiltersCalculation/CationsFiltersCalculation';

class Decarbonizes {
  getCO2tab() {
    const { alkalinity } = waterData;
    if (alkalinity < 1) {
      return 100;
    }
    if (alkalinity < 2) {
      return 90;
    }
    if (alkalinity < 3) {
      return 75;
    }
    if (alkalinity < 4) {
      return 65;
    }
    if (alkalinity < 5) {
      return 55;
    }
    if (alkalinity < 6) {
      return 45;
    }
    if (alkalinity < 7) {
      return 35;
    }
    if (alkalinity < 8) {
      return 25;
    }
    return 20;
  }

  getAlpha() {
    const { dryResidue } = waterData;

    if (dryResidue < 100) {
      return 1.05;
    }
    if (dryResidue < 200) {
      return 1;
    }
    if (dryResidue < 300) {
      return 0.96;
    }
    if (dryResidue < 400) {
      return 0.94;
    }
    if (dryResidue < 500) {
      return 0.92;
    }
    if (dryResidue < 750) {
      return 0.87;
    }
    return 0.83;
  }

  getCO2IV() {
    const CO2tab = this.getCO2tab();
    const alpha = this.getAlpha();

    return Number((CO2tab * alpha).toFixed(3));
  }

  getCO2() {
    const { carbonateHardness } = waterData;
    const CO2IV = this.getCO2IV();

    return Number((44 * carbonateHardness + CO2IV).toFixed(3));
  }

  getCO2KGM() {
    return Number((this.getCO2() / 1000).toFixed(3));
  }

  getG() {
    const { filterPerformance } = hCationFilter.getParams(
      FilterStage.HCationStage
    );
    const CO2 = this.getCO2KGM();
    const CO2OV = 0.005;

    return Number((filterPerformance * (CO2 - CO2OV)).toFixed(3));
  }

  getDeltaSr(CO2: number) {
    const b = -80;
    const k = 5600;

    return Number(((CO2 - b) / k).toFixed(3));
  }

  getKH() {
    return 0.4;
  }

  getF() {
    const CO2 = this.getCO2();
    const deltaSr = this.getDeltaSr(CO2);
    const kH = this.getKH();
    const G = this.getG();

    return Number(((G / kH) * deltaSr).toFixed(3));
  }

  getVkr() {
    const F = this.getF();

    return Number((F / 204).toFixed(3));
  }

  getf() {
    const { filterPerformance } = hCationFilter.getParams(
      FilterStage.HCationStage
    );

    return Number((filterPerformance / 60).toFixed(3));
  }

  getD() {
    const f = this.getf();
    const pi = Math.PI;

    return Number(Math.sqrt((4 * f) / pi).toFixed(3));
  }

  geth() {
    const Vkr = this.getVkr();
    const f = this.getf();

    return Number((Vkr / f).toFixed(3));
  }
}

const decarbonizes = new Decarbonizes();

export default decarbonizes;
