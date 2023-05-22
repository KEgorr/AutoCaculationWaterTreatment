import boilerData from '../Basic data/BoilerData';
import waterData from '../Basic data/WaterData';

class WaterTreatmentCalculation {
  getBoilerBlowDown() {
    const { dryResidue } = waterData;
    const { steamLosses, requiredDryResidue } = boilerData;

    const blowDown =
      (dryResidue * steamLosses * 100) /
      (requiredDryResidue - dryResidue * steamLosses);

    return Number(blowDown.toFixed(3));
  }

  getRelativeAlkalinity() {
    const { alkalinity, dryResidue } = waterData;

    const relativeAlkalinity = (40 * alkalinity * 100) / dryResidue;

    return Number(relativeAlkalinity.toFixed(3));
  }

  getCarbonDioxideConcentration() {
    const { alkalinity } = waterData;
    const decompositionNa2CO3 = this.getDecompositionNa2CO3();

    const concentration = 22 * alkalinity * 0.5 * (1 + decompositionNa2CO3);

    return Number(concentration.toFixed(3));
  }

  getCarbonDioxideConcentrationWithB() {
    const { alkalinity } = waterData;
    const decompositionNa2CO3 = this.getDecompositionNa2CO3();

    const concentration = 22 * alkalinity * 0.5 * (0.4 + decompositionNa2CO3);

    return Number(concentration.toFixed(3));
  }

  getDecompositionNa2CO3() {
    const { pressure } = boilerData;
    if (pressure <= 5) {
      return 0.4;
    }
    if (pressure <= 8) {
      return 0.5;
    }
    if (pressure <= 10) {
      return 0.6;
    }
    if (pressure <= 20) {
      return 0.7;
    }
    if (pressure <= 30) {
      return 0.8;
    }
    if (pressure <= 40) {
      return 0.85;
    }
    return 0.9;
  }
}

const waterTreatmentCalculation = new WaterTreatmentCalculation();

export default waterTreatmentCalculation;
