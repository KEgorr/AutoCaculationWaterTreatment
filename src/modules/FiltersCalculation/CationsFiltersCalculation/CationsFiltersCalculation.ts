import {
  FilterStage,
  ICheckedFilter,
  UnitSaltUsage,
} from '../../../types/data-types';
import FirstStageNaCationsFilters from '../../Basic data/1StageNaCationFilters';
import SecondStageNaCationsFilters from '../../Basic data/2StageNaCationFilters';
import boilerData from '../../Basic data/BoilerData';
import HStageCationsFilters from '../../Basic data/HCationStageFilters';
import waterData from '../../Basic data/WaterData';
import steamBalanceBoiler from '../../SteamBalanceOfBoiler/steamBalanceOfBoiller';
import waterIonicComposition from '../../WaterIonicComposition/waterIonicComposition';
import {
  getAlpha,
  getBeta,
  getFilter,
  getFiltrationArea,
} from '../filtersTools';

class CationsFilter {
  private curFilter: ICheckedFilter;
  private filterPerformance: number;

  constructor() {
    this.curFilter = {
      id: 0,
      name: '',
      performance: 0,
      pressure: 0,
      numberOfFilters: 0,
      filtrationHeight: 0,
      filtrationArea: 0,
      link: '',
      diameter: 0,
      filterLoadSize: 0,
    };
    this.filterPerformance = 0;
  }

  setValidFilters(filterStage: FilterStage) {
    let filterPerformance = steamBalanceBoiler.getWTP();
    if (filterStage === FilterStage.NaCationFirstStage) {
      filterPerformance += 0.285;
    } else if (filterStage === FilterStage.HCationStage) {
      filterPerformance += filterPerformance + 0.285;
    }
    this.filterPerformance = filterPerformance;

    let filtrationArea = 0;
    if (filterStage === FilterStage.NaCationSecondStage) {
      filtrationArea = getFiltrationArea(40, filterPerformance);
      const validFilter = getFilter(
        filtrationArea,
        SecondStageNaCationsFilters,
        2,
        filterPerformance
      );
      this.curFilter = validFilter;
    } else if (filterStage === FilterStage.NaCationFirstStage) {
      const hardnessNaFirstStage = this.getHardnessNaFirstStage();
      if (hardnessNaFirstStage < 5) {
        filtrationArea = getFiltrationArea(25, filterPerformance);
      } else if (hardnessNaFirstStage < 10) {
        filtrationArea = getFiltrationArea(15, filterPerformance);
      } else {
        filtrationArea = getFiltrationArea(10, filterPerformance);
      }
      const validFilter = getFilter(
        filtrationArea,
        FirstStageNaCationsFilters,
        2,
        filterPerformance
      );
      this.curFilter = validFilter;
    } else if (filterStage === FilterStage.HCationStage) {
      const hardnessH = this.getHardnessHStage();
      if (hardnessH < 5) {
        filtrationArea = getFiltrationArea(20, filterPerformance);
      } else if (hardnessH < 10) {
        filtrationArea = getFiltrationArea(15, filterPerformance);
      } else {
        filtrationArea = getFiltrationArea(10, filterPerformance);
      }
      const validFilter = getFilter(
        filtrationArea,
        HStageCationsFilters,
        3,
        filterPerformance
      );
      this.curFilter = validFilter;
    }

    return this.curFilter;
  }

  private getHardnessNaFirstStage() {
    const { totalHardness, carbonateHardness } = waterData;

    return Number((totalHardness - carbonateHardness + 0.4).toFixed(3));
  }

  private getHardnessNaSecondStage() {
    const { boilerType, pressure } = boilerData;
    switch (boilerType) {
      case 'Газотрубный или Жаротрубный':
        return 0.1;
      case 'Чугунный секционный':
        return 0.3;
      case 'Водотрубный неэкранированный':
        if (pressure < 14) {
          return 0.03;
        }
        return 0.01;
      case 'Водотрубный экранированный':
        if (pressure < 14) {
          return 0.02;
        }
        return 0.01;
      case 'Водотрубный с газомазутными топками':
        if (pressure < 14) {
          return 0.02;
        }
        return 0.01;
      default:
        return 0.01;
    }
  }

  private getHardnessHStage() {
    const { carbonateHardness } = waterData;
    return Number((carbonateHardness - 1.1).toFixed(3));
  }

  getParams(filterStage: FilterStage) {
    let hardness = 0;
    let alpha = 0;
    let q = 0;
    let beta = 0;
    let qc = 0;
    let filtrationArea = 0;
    let { filterPerformance } = this;
    let maxSpeed = 0;
    let normalSpeed = 0;

    if (filterStage === FilterStage.NaCationSecondStage) {
      alpha = getAlpha(UnitSaltUsage.secondStage);
      hardness = this.getHardnessNaSecondStage();
      q = 4;
      beta = 10;
      qc = UnitSaltUsage.secondStage;
      maxSpeed = 50;
      normalSpeed = 40;
    } else if (filterStage === FilterStage.NaCationFirstStage) {
      hardness = this.getHardnessNaFirstStage();
      beta = 6;
      if (hardness < 5) {
        alpha = getAlpha(UnitSaltUsage.under5);
        qc = UnitSaltUsage.under5;
        maxSpeed = 35;
        normalSpeed = 25;
      } else if (hardness < 10) {
        alpha = getAlpha(UnitSaltUsage.under10);
        qc = UnitSaltUsage.under10;
        maxSpeed = 25;
        normalSpeed = 15;
      } else if (hardness < 15) {
        alpha = getAlpha(UnitSaltUsage.under15);
        qc = UnitSaltUsage.under15;
        maxSpeed = 20;
        normalSpeed = 10;
      } else {
        alpha = getAlpha(UnitSaltUsage.under20);
        qc = UnitSaltUsage.under20;
        maxSpeed = 20;
        normalSpeed = 10;
      }
    } else if (filterStage === FilterStage.HCationStage) {
      hardness = this.getHardnessHStage();
      if (hardness < 5) {
        normalSpeed = 20;
        maxSpeed = 30;
      } else if (hardness < 10) {
        normalSpeed = 15;
        maxSpeed = 25;
      } else if (hardness < 15) {
        normalSpeed = 10;
        maxSpeed = 20;
      }
    }
    filtrationArea = getFiltrationArea(normalSpeed, filterPerformance);
    filterPerformance = Number(filterPerformance.toFixed(3));
    return {
      hardness,
      alpha,
      q,
      qc,
      beta,
      filtrationArea,
      filterPerformance,
      maxSpeed,
      normalSpeed,
    };
  }

  getA(filterStage: FilterStage) {
    const { hardness } = this.getParams(filterStage);
    return Number((24 * hardness * this.filterPerformance).toFixed(3));
  }

  getEp(filterStage: FilterStage) {
    const { hardness, alpha, q, qc } = this.getParams(filterStage);
    const Na = waterIonicComposition.getNa();
    const beta = getBeta(hardness, Na);

    if (filterStage === FilterStage.NaCationSecondStage) {
      return Number((alpha * beta * 500 - 0.5 * hardness * q).toFixed(3));
    }

    return Number((alpha * beta * 500 - 0.5 * hardness * qc).toFixed(3));
  }

  getRegenerationNumber(filterStage: FilterStage) {
    const A = this.getA(filterStage);
    const EpNa = this.getEp(filterStage);
    const { filterLoadSize, numberOfFilters } = this.curFilter;

    return Number((A / (filterLoadSize * EpNa * numberOfFilters)).toFixed(3));
  }

  getQc(filterStage: FilterStage) {
    const EpNa = this.getEp(filterStage);
    const { filterLoadSize } = this.curFilter;
    const { qc } = this.getParams(filterStage);
    return Number(((EpNa * filterLoadSize * qc) / 1000).toFixed(3));
  }

  getQnr(filterStage: FilterStage) {
    const Qc = this.getQc(filterStage);

    return Number(((Qc * 100) / (1000 * 1.2 * 26)).toFixed(3));
  }

  getQcc(filterStage: FilterStage) {
    const Qc = this.getQc(filterStage);
    const nNa = this.getRegenerationNumber(filterStage);
    const { numberOfFilters } = this.curFilter;

    return Number(((Qc * nNa * numberOfFilters * 100) / 96.5).toFixed(3));
  }

  getQvzr() {
    const { filtrationArea } = this.curFilter;

    return Number(((4 * filtrationArea * 60 * 15) / 1000).toFixed(3));
  }

  getQrr(filterStage: FilterStage) {
    const Qc = this.getQc(filterStage);
    const { beta } = this.getParams(filterStage);
    return Number(((100 * Qc) / (1000 * beta * 1.2)).toFixed(3));
  }

  getQot() {
    const { filterLoadSize } = this.curFilter;

    return Number((4 * filterLoadSize).toFixed(3));
  }

  getQch(filterStage: FilterStage) {
    const Qrr = this.getQrr(filterStage);
    const Qot = this.getQot();

    return Number((Qrr + Qot).toFixed(3));
  }

  getQchPerDay(filterStage: FilterStage) {
    const Qch = this.getQch(filterStage);
    const nNa = this.getRegenerationNumber(filterStage);

    let k = 1;
    if (filterStage === FilterStage.NaCationFirstStage) {
      k = 2;
    }

    return Number((k * Qch * nNa).toFixed(3));
  }

  getQchPerHour(filterStage: FilterStage) {
    const QchPerDay = this.getQchPerDay(filterStage);

    return Number((QchPerDay / 24).toFixed(3));
  }
}

const secondStageNaCationFilter = new CationsFilter();
const firstStageNaCationFilter = new CationsFilter();

export { secondStageNaCationFilter, firstStageNaCationFilter };
