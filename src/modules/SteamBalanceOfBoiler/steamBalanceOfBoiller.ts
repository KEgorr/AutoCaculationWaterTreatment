import boilerData from '../Basic data/BoilerData';
import waterTreatmentCalculation from '../WaterTreatmentCalculation/waterTreatmentCalculation';

class SteamBalanceOfBoiler {
  getG1() {
    const { numberOfBoilers, performance } = boilerData;
    return Number((numberOfBoilers * performance).toFixed(3));
  }

  getG2() {
    return Number((this.getG1() * 0.7).toFixed(3));
  }

  getQ3() {
    return Number((this.getG2() * 0.5).toFixed(3));
  }

  getQ4() {
    return Number((this.getQ3() * 0.03).toFixed(3));
  }

  getQ5() {
    return Number((this.getQ3() * 0.02).toFixed(3));
  }

  getQ6() {
    return Number((this.getG1() * 0.5).toFixed(3));
  }

  getQ7() {
    return Number((this.getG1() * 0.07).toFixed(3));
  }

  getQ8() {
    return Number((this.getQ7() * 0.3).toFixed(3));
  }

  getWTP() {
    return Number(
      (
        1.2 * this.getQ3() +
        this.getQ4() +
        this.getQ5() +
        this.getQ6() +
        this.getQ7() +
        this.getQ8() +
        waterTreatmentCalculation.getBoilerBlowDown() * (this.getG1() / 100)
      ).toFixed(3)
    );
  }
}

const steamBalanceBoiler = new SteamBalanceOfBoiler();

export default steamBalanceBoiler;
