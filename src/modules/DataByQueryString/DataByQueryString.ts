import {
  IBoilerData,
  isBoilerDataValue,
  IWaterData,
} from '../../types/data-types';

export function changeQueryStringWaterData(waterData: IWaterData[]) {
  const url = new URL(window.location as unknown as string);
  waterData.forEach((data) => {
    if (data.name === 'Взвешенные вещества') {
      url.searchParams.set('suspendedMatter', data.value);
      if (data.value === '') {
        url.searchParams.delete('suspendedMatter');
      }
    }
    if (data.name === 'Сухой остаток') {
      url.searchParams.set('dryResidue', data.value);
      if (data.value === '') {
        url.searchParams.delete('dryResidue');
      }
    }
    if (data.name === 'Щелочность') {
      url.searchParams.set('alkalinity', data.value);
      if (data.value === '') {
        url.searchParams.delete('alkalinity');
      }
    }
    if (data.name === 'Жесткость карбонатная') {
      url.searchParams.set('carbonateHardness', data.value);
      if (data.value === '') {
        url.searchParams.delete('carbonateHardness');
      }
    }
    if (data.name === 'Жесткость общая') {
      url.searchParams.set('totalHardness', data.value);
      if (data.value === '') {
        url.searchParams.delete('totalHardness');
      }
    }
    if (data.name.match(/Ca|Mg|Na|Fe|HCO|SO|Cl|NO|SIO/)) {
      url.searchParams.set(data.name, data.value);
      if (data.value === '') {
        url.searchParams.delete(data.name);
      }
    }
  });

  window.history.pushState('', '', url.toString());
}

export function changeWaterDataByQueryString(waterData: IWaterData[]) {
  const url = new URL(window.location as unknown as string);
  const newData = waterData.map((data) => {
    const newDataEl = data;
    if (data.name === 'Взвешенные вещества') {
      const param = url.searchParams.get('suspendedMatter');
      if (param && Number(param)) {
        newDataEl.value = param;
        newDataEl.isValid = true;
        return newDataEl;
      }
    }
    if (data.name === 'Сухой остаток') {
      const param = url.searchParams.get('dryResidue');
      if (param && Number(param)) {
        newDataEl.value = param;
        newDataEl.isValid = true;
        return newDataEl;
      }
    }
    if (data.name === 'Щелочность') {
      const param = url.searchParams.get('alkalinity');
      if (param && Number(param)) {
        newDataEl.value = param;
        newDataEl.isValid = true;
        return newDataEl;
      }
    }
    if (data.name === 'Жесткость карбонатная') {
      const param = url.searchParams.get('carbonateHardness');
      if (param && Number(param)) {
        newDataEl.value = param;
        newDataEl.isValid = true;
        return newDataEl;
      }
    }
    if (data.name === 'Жесткость общая') {
      const param = url.searchParams.get('totalHardness');
      if (param && Number(param)) {
        newDataEl.value = param;
        newDataEl.isValid = true;
        return newDataEl;
      }
    }
    if (data.name.match(/Ca|Mg|Na|Fe|HCO|SO|Cl|NO|SIO/)) {
      const param = url.searchParams.get(data.name);
      if (param && Number(param)) {
        newDataEl.value = param;
        newDataEl.isValid = true;
        return newDataEl;
      }
    }
    return data;
  });

  return newData;
}

export function setQueryStringBoiler(
  boiler: IBoilerData | undefined,
  deleteQuery = false
) {
  const url = new URL(window.location as unknown as string);

  if (boiler) {
    Object.keys(boiler).forEach((key) => {
      const valueObj = boiler[key];
      if (isBoilerDataValue(valueObj)) {
        const { value } = valueObj;
        url.searchParams.set(key, value);
        if (
          (key === 'steamLosses' || key === 'requiredDryResidue') &&
          value === ''
        ) {
          url.searchParams.set(key, 'calc');
        }
        if (deleteQuery) {
          url.searchParams.delete(key);
        }
      }
    });
  }

  window.history.pushState('', '', url.toString());
}

export function addBoilerFromQueryString(): IBoilerData | undefined {
  const url = new URL(window.location as unknown as string);
  const name = url.searchParams.get('name');
  const performance = url.searchParams.get('performance');
  const numberOfBoilers = url.searchParams.get('numberOfBoilers');
  const pressure = url.searchParams.get('pressure');
  const boilerType = url.searchParams.get('boilerType');
  const separationType = url.searchParams.get('separationType');
  const steamLosses = url.searchParams.get('steamLosses');
  const requiredDryResidue = url.searchParams.get('requiredDryResidue');
  const validBoilersTypes = [
    'Газотрубный или Жаротрубный',
    'Чугунный секционный',
    'Водотрубный неэкранированный',
    'Водотрубный экранированный',
    'Водотрубный с газомазутными топками',
    'Водотрубный с естественной циркуляцией',
  ];
  const validSeparationTypes = [
    'Механические внутрибарабанные сепарационные устройства',
    'Двухступенчатое испарение и механические внутрибарабанные сепарационные устройства',
    'Выносные циклоны при двухступенчатом испарении',
    'Внутрибарабанные сепараторы',
  ];
  const newBoiler = <IBoilerData>{
    name: {
      value: '',
      isValid: false,
    },
    performance: {
      value: '',
      isValid: false,
    },
    numberOfBoilers: {
      value: '',
      isValid: false,
    },
    pressure: {
      value: '',
      isValid: false,
    },
    steamLosses: {
      value: '',
      isValid: false,
    },
    requiredDryResidue: {
      value: '',
      isValid: false,
    },
    boilerType: {
      value: '',
      isValid: false,
    },
    separationType: {
      value: '',
      isValid: false,
    },
  };

  if (
    name &&
    performance &&
    numberOfBoilers &&
    pressure &&
    boilerType &&
    separationType &&
    steamLosses &&
    requiredDryResidue
  ) {
    newBoiler.name.value = name;
    newBoiler.name.isValid = true;
    if (
      validBoilersTypes.includes(boilerType) &&
      validSeparationTypes.includes(separationType)
    ) {
      newBoiler.boilerType.value = boilerType;
      newBoiler.boilerType.isValid = true;
      newBoiler.separationType.value = separationType;
      newBoiler.separationType.isValid = true;
    }
    if (steamLosses === 'calc') {
      newBoiler.steamLosses.value = '';
      newBoiler.steamLosses.isValid = true;
    }
    if (requiredDryResidue === 'calc') {
      newBoiler.requiredDryResidue.value = '';
      newBoiler.requiredDryResidue.isValid = true;
    }
    if (Number(steamLosses) && Number(requiredDryResidue)) {
      newBoiler.steamLosses.value = steamLosses;
      newBoiler.steamLosses.isValid = true;

      newBoiler.requiredDryResidue.value = requiredDryResidue;
      newBoiler.requiredDryResidue.isValid = true;
    }
    if (Number(performance) && Number(numberOfBoilers) && Number(pressure)) {
      newBoiler.performance.value = performance;
      newBoiler.performance.isValid = true;

      newBoiler.numberOfBoilers.value = numberOfBoilers;
      newBoiler.numberOfBoilers.isValid = true;

      newBoiler.pressure.value = pressure;
      newBoiler.pressure.isValid = true;
    }
  }

  const check = Object.keys(newBoiler).every((key) => {
    const valueObj = newBoiler[key];
    if (isBoilerDataValue(valueObj)) {
      if (valueObj.isValid) {
        return true;
      }
    }
    return false;
  });

  if (check) {
    return newBoiler;
  }

  return undefined;
}
