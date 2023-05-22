import waterData from '../Basic data/WaterData';

class WaterIonicComposition {
  getCa2() {
    const equivalent = 40.08 / 2;
    return Number((waterData.Ca2 / equivalent).toFixed(3));
  }

  getMg2() {
    const equivalent = 24.305 / 2;
    return Number((waterData.Mg2 / equivalent).toFixed(3));
  }

  getNa() {
    const equivalent = 22.9897;
    return Number((waterData.Na / equivalent).toFixed(3));
  }

  getFe3() {
    const equivalent = 55.845 / 3;
    return Number((waterData.Fe3 / equivalent).toFixed(3));
  }

  getHCO3() {
    const equivalent = 61.0168;
    return Number((waterData.HCO3 / equivalent).toFixed(3));
  }

  getSO4() {
    const equivalent = 96.06 / 2;
    return Number((waterData.SO4 / equivalent).toFixed(3));
  }

  getCl() {
    const equivalent = 35.453;
    return Number((waterData.Cl / equivalent).toFixed(3));
  }

  getNO3() {
    const equivalent = 62.0049;
    return Number((waterData.NO3 / equivalent).toFixed(3));
  }

  getSIO3() {
    const equivalent = 80.0632 / 2;
    return Number((waterData.SIO3 / equivalent).toFixed(3));
  }

  getCationsSum() {
    return Number(
      (this.getCa2() + this.getMg2() + this.getNa() + this.getFe3()).toFixed(3)
    );
  }

  getAnionsSum() {
    return Number(
      (
        this.getHCO3() +
        this.getSO4() +
        this.getCl() +
        this.getNO3() +
        this.getSIO3()
      ).toFixed(3)
    );
  }
}

const waterIonicComposition = new WaterIonicComposition();

export default waterIonicComposition;
