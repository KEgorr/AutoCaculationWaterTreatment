import { ICheckedFilter, IFilter, UnitSaltUsage } from '../../types/data-types';

export function getFiltrationArea(
  filtrationSpeed: number,
  performance: number
) {
  return Number((performance / filtrationSpeed).toFixed(3));
}

export function getFilter(
  filtrationArea: number,
  filters: IFilter[],
  numberOfFilters: number,
  performance: number
): ICheckedFilter {
  const number = numberOfFilters;
  const oneFilterArea = filtrationArea / number;

  const validFilters = filters
    .map((filter) => {
      if (filtrationArea < filter.filtrationArea) {
        return { ...filter, numberOfFilters: 1 };
      }
      return { ...filter, numberOfFilters: number };
    })
    .filter((filter) => {
      if (filter.filtrationArea > oneFilterArea) {
        if (performance / (numberOfFilters - 1) > filter.performance) {
          return false;
        }
        return true;
      }
      return false;
    })
    .sort((f1, f2) => f1.filtrationArea - f2.filtrationArea);

  if (validFilters.length) {
    return { ...validFilters[0] };
  }
  return getFilter(filtrationArea, filters, number + 1, performance);
}

export function getFiltrationSpeed(
  performance: number,
  filtrationArea: number,
  numberOfFilters: number
) {
  return Number((performance / (filtrationArea * numberOfFilters)).toFixed(3));
}

export function getMaxFiltrationSpeed(
  performance: number,
  filtrationArea: number,
  numberOfFilters: number
) {
  if (numberOfFilters === 1) {
    return getFiltrationSpeed(performance, filtrationArea, numberOfFilters);
  }
  return Number(
    (performance / (filtrationArea * (numberOfFilters - 1))).toFixed(3)
  );
}

export function getAlpha(unitSaltUsage: UnitSaltUsage) {
  if (unitSaltUsage === UnitSaltUsage.secondStage) {
    return 0.94;
  }
  if (unitSaltUsage === UnitSaltUsage.under5) {
    return 0.72;
  }
  if (unitSaltUsage === UnitSaltUsage.under10) {
    return 0.75;
  }
  if (unitSaltUsage === UnitSaltUsage.under15) {
    return 0.82;
  }
  return 0.84;
}

export function getBeta(hardness: number, Na: number) {
  const ratio = Na ** 2 / hardness;
  if (ratio <= 0.01) {
    return 0.93;
  }
  if (ratio <= 0.02) {
    return 0.92;
  }
  if (ratio <= 0.03) {
    return 0.91;
  }
  if (ratio <= 0.04) {
    return 0.89;
  }
  if (ratio <= 0.05) {
    return 0.88;
  }
  if (ratio <= 0.06) {
    return 0.87;
  }
  if (ratio <= 0.07) {
    return 0.86;
  }
  if (ratio <= 0.08) {
    return 0.85;
  }
  if (ratio <= 0.09) {
    return 0.85;
  }
  if (ratio <= 0.08) {
    return 0.84;
  }
  if (ratio <= 0.1) {
    return 0.83;
  }
  if (ratio <= 0.2) {
    return 0.8;
  }
  if (ratio <= 0.3) {
    return 0.77;
  }
  if (ratio <= 0.4) {
    return 0.73;
  }
  if (ratio <= 0.5) {
    return 0.7;
  }
  if (ratio <= 0.6) {
    return 0.69;
  }
  if (ratio <= 0.7) {
    return 0.68;
  }
  if (ratio <= 0.8) {
    return 0.67;
  }
  if (ratio <= 0.9) {
    return 0.66;
  }
  if (ratio <= 1) {
    return 0.65;
  }
  if (ratio <= 2) {
    return 0.62;
  }
  if (ratio <= 3) {
    return 0.6;
  }
  if (ratio <= 4) {
    return 0.57;
  }
  if (ratio <= 5) {
    return 0.54;
  }
  if (ratio <= 6) {
    return 0.53;
  }
  if (ratio <= 8) {
    return 0.65;
  }
  if (ratio <= 9) {
    return 0.51;
  }

  return 0.5;
}
