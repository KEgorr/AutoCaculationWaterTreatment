import { ICheckedFilter } from '../../../types/data-types';
import LightFiltersData from '../../Basic data/lightFilters';
import steamBalanceBoiler from '../../SteamBalanceOfBoiler/steamBalanceOfBoiller';

class LightFilters {
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

  geta() {
    return 1.06;
  }

  getRequiredNormalSpeed() {
    return 6;
  }

  getRequiredMaxSpeed() {
    return 7.5;
  }

  getMaxFiltrationArea() {
    const filterPerformance = steamBalanceBoiler.getWTP();
    this.filterPerformance = filterPerformance;
    const a = this.geta();
    const normalSpeed = this.getRequiredNormalSpeed();

    return Number(((filterPerformance * a) / normalSpeed).toFixed(3));
  }

  getFilter(numberOfFilters: number): ICheckedFilter {
    const number = numberOfFilters;
    const filtrationArea = this.getMaxFiltrationArea();
    const oneFilterArea = filtrationArea / (number - 1);
    const filters = LightFiltersData;
    const validFilters = filters
      .map((filter) => {
        return { ...filter, numberOfFilters: number };
      })
      .find((filter) => filter.filtrationArea > oneFilterArea);

    if (validFilters) {
      const forceSpeed = this.getForceSpeed(validFilters);
      if (forceSpeed > this.getRequiredMaxSpeed()) {
        return this.getFilter(number + 1);
      }
      this.curFilter = { ...validFilters };
      return { ...validFilters };
    }
    return this.getFilter(number + 1);
  }

  getOneFilterArea() {
    const F = this.getMaxFiltrationArea();
    const { numberOfFilters } = this.curFilter;

    return Number((F / (numberOfFilters - 1)).toFixed(3));
  }

  getq(filter: ICheckedFilter) {
    const d = this.getd(filter);
    const r = 1;
    const { numberOfFilters } = filter;

    return Number(((d * r * numberOfFilters) / 24).toFixed(3));
  }

  getNormalSpeed(filter: ICheckedFilter) {
    const { filterPerformance } = this;
    const q = this.getq(filter);
    const { filtrationArea, numberOfFilters } = this.curFilter;

    return Number(
      (
        (filterPerformance + q) /
        (filtrationArea * (numberOfFilters - 1))
      ).toFixed(3)
    );
  }

  getForceSpeed(filter: ICheckedFilter) {
    const { filterPerformance } = this;
    const q = this.getq(filter);
    const { filtrationArea, numberOfFilters } = filter;

    return Number(
      (
        (filterPerformance + q) /
        (filtrationArea * (numberOfFilters - 2))
      ).toFixed(3)
    );
  }

  getd(filter: ICheckedFilter) {
    const { diameter } = filter;
    if (diameter === 700) {
      return 1.4;
    }
    if (diameter === 1000) {
      return 2.7;
    }
    if (diameter === 1400) {
      return 5.5;
    }
    if (diameter === 1500) {
      return 6.2;
    }
    if (diameter === 2000) {
      return 11.2;
    }
    if (diameter === 2600) {
      return 18.7;
    }
    if (diameter === 3000) {
      return 25;
    }
    if (diameter === 3400) {
      return 32;
    }
    throw new Error('Не найдено');
  }
}

const lightFilters = new LightFilters();

export default lightFilters;
