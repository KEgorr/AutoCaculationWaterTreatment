import { IWaterData } from '../../../types/data-types';

const waterDataInitial: IWaterData[] = [
  //! Только для теста изменить на ''
  {
    id: 1,
    name: 'Взвешенные вещества',
    value: '170',
    dimension: 'мг/кг',
    isValid: true,
  },
  {
    id: 2,
    name: 'Сухой остаток',
    value: '440',
    dimension: 'мг/кг',
    isValid: true,
  },
  {
    id: 3,
    name: 'Щелочность',
    value: '4.6',
    dimension: 'мг-экв/кг',
    isValid: true,
  },
  {
    id: 4,
    name: 'Жесткость карбонатная',
    value: '4.6',
    dimension: 'мг-экв/кг',
    isValid: true,
  },
  {
    id: 5,
    name: 'Жесткость общая',
    value: '5.95',
    dimension: 'мг-экв/кг',
    isValid: true,
  },
  {
    id: 6,
    name: 'Ca',
    value: '92',
    dimension: 'мг/кг',
    sup: '2+',
  },
  {
    id: 7,
    name: 'Mg',
    value: '21',
    dimension: 'мг/кг',
    sup: '2+',
  },
  {
    id: 8,
    name: 'Na',
    value: '31.6',
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
    value: '314',
    dimension: 'мг/кг',
    sup: '-',
    sub: '3',
  },
  {
    id: 11,
    name: 'SO',
    value: '60',
    dimension: 'мг/кг',
    sup: '2-',
    sub: '4',
  },
  {
    id: 12,
    name: 'Cl',
    value: '27',
    dimension: 'мг/кг',
    sup: '-',
  },
  {
    id: 13,
    name: 'NO',
    value: '20',
    dimension: 'мг/кг',
    sup: '-',
    sub: '3',
  },
  {
    id: 14,
    name: 'SIO',
    value: '15',
    dimension: 'мг/кг',
    sup: '2-',
    sub: '3',
  },
];

export default waterDataInitial;
