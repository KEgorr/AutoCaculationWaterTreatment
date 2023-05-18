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
];

export const boilerDataInitial = {
  id: 0,
  name: {
    value: '',
    isValid: true,
  },
  performance: {
    value: '',
    isValid: true,
  },
  numberOfBoilers: {
    value: '',
    isValid: true,
  },
  pressure: {
    value: '',
    isValid: true,
  },
};
