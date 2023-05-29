export const inputBoilerInit = [
  {
    id: 0,
    title: 'Наименование котла',
    name: 'name',
  },
  {
    id: 1,
    title: 'Производительность',
    name: 'performance',
    dimension: 'т/час',
  },
  {
    id: 2,
    title: 'Рабочее давление',
    name: 'pressure',
    dimension: 'бар',
  },
  {
    id: 3,
    title: 'Количество котлов',
    name: 'numberOfBoilers',
    dimension: 'шт',
  },
  {
    id: 4,
    title: 'Суммарные потери пара',
    name: 'steamLosses',
    dimension: 'доля',
    hint: 'При отсутствии данных будет рассчитан по типу котла',
  },
  {
    id: 5,
    title: 'Сухой остаток котловой воды',
    name: 'requiredDryResidue',
    dimension: 'мг/кг',
    hint: 'При отсутствии данных будет рассчитан по типу котла',
  },
];

export const boilerTypes = [
  {
    id: 0,
    tittle: 'Газотрубный или Жаротрубный',
    name: 'boilerType',
  },
  {
    id: 1,
    tittle: 'Чугунный секционный',
    name: 'boilerType',
  },
  {
    id: 2,
    tittle: 'Водотрубный неэкранированный',
    name: 'boilerType',
  },
  {
    id: 3,
    tittle: 'Водотрубный экранированный',
    name: 'boilerType',
  },
  {
    id: 4,
    tittle: 'Водотрубный с газомазутными топками',
    name: 'boilerType',
  },
  {
    id: 5,
    tittle: 'Водотрубный с естественной циркуляцией',
    name: 'boilerType',
  },
];

export const separationTypes = [
  {
    id: 0,
    tittle: 'Механические внутрибарабанные сепарационные устройства',
    name: 'separationType',
  },
  {
    id: 1,
    tittle: 'Внутрибарабанные сепараторы',
    name: 'separationType',
  },
  {
    id: 2,
    tittle:
      'Двухступенчатое испарение и механические внутрибарабанные сепарационные устройства',
    name: 'separationType',
  },
  {
    id: 3,
    tittle: 'Выносные циклоны при двухступенчатом испарении',
    name: 'separationType',
  },
];

export const boilerDataInitial = {
  id: 0,
  name: {
    value: 'Котел',
    isValid: true,
  },
  performance: {
    value: '5',
    isValid: true,
  },
  numberOfBoilers: {
    value: '2',
    isValid: true,
  },
  pressure: {
    value: '8',
    isValid: true,
  },
  steamLosses: {
    value: '0.5',
    isValid: true,
  },
  requiredDryResidue: {
    value: '4000',
    isValid: true,
  },
  boilerType: {
    value: 'Газотрубный или Жаротрубный',
    isValid: true,
  },
  separationType: {
    value: 'Механические внутрибарабанные сепарационные устройства',
    isValid: true,
  },
};
