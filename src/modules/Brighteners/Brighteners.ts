import { BrightenersType, IValidBrightener } from '../../types/data-types';
import brightenersData from '../Basic data/brightenersData';
import waterData from '../Basic data/WaterData';
import decarbonizes from '../Decarbonizes/Decarbonizes';
import steamBalanceBoiler from '../SteamBalanceOfBoiler/steamBalanceOfBoiller';

class Brighteners {
  private getSludgeCountAl() {
    const { suspendedMatter } = waterData;
    const D = this.getCoagulantDose();
    const alpha = 30;

    return Number(
      (suspendedMatter + 26 * D + (111 * alpha * D) / 100).toFixed(3)
    );
  }

  private getSludgeCountFe() {
    const { suspendedMatter, carbonateHardness } = waterData;
    const hardnessMg = this.getHardnessMg();
    const alpha = 0.5;
    const D = this.getCoagulantDose();

    return Number(
      (
        suspendedMatter +
        50 * (carbonateHardness + (1 + 0.56 * alpha) * D) +
        53 * D +
        29 * hardnessMg
      ).toFixed(3)
    );
  }

  getSludgeCount(brightenerType: BrightenersType) {
    return brightenerType === BrightenersType.liming
      ? this.getSludgeCountFe()
      : this.getSludgeCountAl();
  }

  getCoagulantDose() {
    return 1;
  }

  getHardnessMg() {
    const { carbonateHardness, totalHardness } = waterData;
    const hardnessCa = totalHardness - carbonateHardness;

    return Number(hardnessCa.toFixed(3));
  }

  getHarnessCaOst() {
    return 0.03;
  }

  getCO2() {
    return decarbonizes.getCO2IV();
  }

  getAlphaM() {
    const { alkalinity, carbonateHardness } = waterData;
    const D = this.getCoagulantDose();
    const hardnessOst = this.getHarnessCaOst();
    const CO2 = decarbonizes.getCO2IV();

    return Number(
      (
        ((alkalinity * carbonateHardness) /
          (2 * alkalinity + CO2 + D - hardnessOst)) *
        58
      ).toFixed(3)
    );
  }

  getQOVost() {
    return 10;
  }

  getBlowDownBrighteners(brightenerType: BrightenersType) {
    const Qch =
      brightenerType === BrightenersType.coagulation
        ? this.getSludgeCountAl()
        : this.getSludgeCountFe();

    const Qvv = this.getQOVost();
    const deltaSr = this.getDeltaSr(brightenerType);

    return Number((((Qch - Qvv) / (1000 * deltaSr)) * 100).toFixed(3));
  }

  getDeltaSr(brightenerType: BrightenersType) {
    if (brightenerType === BrightenersType.liming) {
      const HMg = this.getHardnessMg();
      const { totalHardness } = waterData;
      if (HMg / totalHardness < 0.25) {
        return 40;
      }
      return 15;
    }
    if (brightenerType === BrightenersType.coagulation) {
      const { suspendedMatter } = waterData;
      if (suspendedMatter < 400) {
        return 25;
      }
      if (suspendedMatter < 1000) {
        return 29;
      }
      return 35;
    }
    throw new Error('Not valid brightenerType');
  }

  getBrightenerPerformance(brightenerType: BrightenersType) {
    const performance = steamBalanceBoiler.getWTP();
    const blowDown = this.getBlowDownBrighteners(brightenerType);

    return Number((performance + (blowDown * performance) / 100).toFixed(3));
  }

  gerBrightener(
    brightenerType: BrightenersType,
    number: number
  ): IValidBrightener {
    const performance = this.getBrightenerPerformance(brightenerType);
    const validBrightener = brightenersData.find(
      (brightener) => brightener.performance > performance
    );
    if (validBrightener) {
      return { ...validBrightener, numberOfBrighteners: number };
    }
    return this.gerBrightener(brightenerType, number + 1);
  }
}

const brightener = new Brighteners();

export default brightener;
