import { IWaterData } from '../../../types/data-types';

const waterDataInitial: IWaterData[] = [
  //! Только для теста изменить на ''
  {
    id: 1,
    name: 'Взвешенные вещества',
    value: '',
    dimension: 'мг/кг',
    isValid: true,
  },
  {
    id: 2,
    name: 'Сухой остаток',
    value: '',
    dimension: 'мг/кг',
    isValid: true,
  },
  {
    id: 3,
    name: 'Щелочность',
    value: '',
    dimension: 'мг-экв/кг',
    isValid: true,
  },
  {
    id: 4,
    name: 'Жесткость карбонатная',
    value: '',
    dimension: 'мг-экв/кг',
    isValid: true,
  },
  {
    id: 5,
    name: 'Жесткость общая',
    value: '',
    dimension: 'мг-экв/кг',
    isValid: true,
  },
  {
    id: 6,
    name: 'Ca',
    value: '',
    dimension: 'мг/кг',
    sup: '2+',
  },
  {
    id: 7,
    name: 'Mg',
    value: '',
    dimension: 'мг/кг',
    sup: '2+',
  },
  {
    id: 8,
    name: 'Na',
    value: '',
    dimension: 'мг/кг',
    sup: '+',
  },
  {
    id: 9,
    name: 'Fe',
    value: '',
    dimension: 'мг/кг',
    sup: '3+',
  },
  {
    id: 10,
    name: 'HCO',
    value: '',
    dimension: 'мг/кг',
    sup: '-',
    sub: '3',
  },
  {
    id: 11,
    name: 'SO',
    value: '',
    dimension: 'мг/кг',
    sup: '2-',
    sub: '4',
  },
  {
    id: 12,
    name: 'Cl',
    value: '',
    dimension: 'мг/кг',
    sup: '-',
  },
  {
    id: 13,
    name: 'NO',
    value: '',
    dimension: 'мг/кг',
    sup: '-',
    sub: '3',
  },
  {
    id: 14,
    name: 'SIO',
    value: '',
    dimension: 'мг/кг',
    sup: '2-',
    sub: '3',
  },
];

export default waterDataInitial;
