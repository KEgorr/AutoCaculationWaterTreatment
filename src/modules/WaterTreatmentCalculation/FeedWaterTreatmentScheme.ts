import waterData from '../Basic data/WaterData';
import waterTreatmentCalculation from './WaterTreatmentCalculation';
import waterIonicComposition from '../WaterIonicComposition/WaterIonicComposition';
import parallelNaCationSchemeImg from '../../assets/imgs/parallel-Na-cationImg.png';
import NaCationWithAcidSchemeImg from '../../assets/imgs/parallel-Na-cationImg-with-acid-img.png';
import parallelHNaCationSchemeImg from '../../assets/imgs/parallel-H-Na-cationImg.png';
import serialHNaCationSchemeImg from '../../assets/imgs/serial-Na-cationImg-with-acid-img.png';
import HFilterWithRegenImg from '../../assets/imgs/H-filter-with-regen.png';

export default function getFeedWaterTreatmentScheme() {
  let schemeImg: string;
  let schemeText: string;
  let schemeTittle: string;

  const { alkalinity, carbonateHardness, totalHardness } = waterData;
  const relativeAlkalinity =
    waterTreatmentCalculation.isRelativeAlkalinityValid();
  const blowDown = waterTreatmentCalculation.isBlowDownValid();
  const CO2 = waterTreatmentCalculation.isCO2Valid();
  const anionsSum = waterIonicComposition.getAnionsSum();

  const allValid = relativeAlkalinity && blowDown && CO2;

  if (alkalinity < 0.5 && allValid) {
    schemeImg = parallelNaCationSchemeImg;
    schemeTittle = 'Параллельное натрий-катионирование';
    schemeText = `Натрий-катионирование - рекомендуется для высоко-минерализованных 
      вод с карбонатной щелочностью до 0,5 мг · экв./кг 
      (карбонатная жесткость равна ${alkalinity} мг · экв./кг); 
        при водоснабжении котельной от хозяйственно-питьевого водопровода 
        и если эта схема допустима по величине продувки котлов, относительной щелочности, концентрации углекислоты в паре`;
  } else if (alkalinity > 0.5 && allValid) {
    schemeImg = NaCationWithAcidSchemeImg;
    schemeTittle = 'Натрий-катионирование с добавлением кислоты';
    schemeText = `Натрий-катионирование с добавлением кислоты - если карбонатная щелочность превышает 0,5 мг · экв./кг, 
      (карбонатная жесткость равна ${alkalinity} мг · экв./кг) 
      то частичное разрушение бикарбонатных солей осуществляется путем ввода кислоты в трубопровод Na-катионированной воды после первой ступени умягчения.`;
  } else if (anionsSum > 2 && carbonateHardness > totalHardness / 2) {
    schemeImg = parallelHNaCationSchemeImg;
    schemeTittle = 'Параллельное водород-натрий-катионирование';
    schemeText = `Параллельное водород-натрий-катионирование - применяется, если требуется снижение щелочности, солесодержания 
      и углекислоты в паре; рекомендуется для природных вод с суммарной 
      жесткостью анионов сильных кислот более 2 мг · экв./кг (${anionsSum} мг · экв./кг) и Жк > 0.5Жо (${carbonateHardness} > ${
      totalHardness / 2
    }). Согласно схеме обрабатываемая вода в точке нейтрализации разделяется 
      на два параллельных потока: на H-, Na-катионитные фильтры, 
      после чего их фильтры смешиваются в общем трубопроводе, где щелочность 
      Na-катионированной воды нейтрализует кислотность 
      H-катионированной воды. Заданная остаточная щелочность Щост обеспечивается 
      определенным соотношением потоков обрабатываемой 
      воды, направляемой на H-, Na-катионитные фильтры.`;
  } else if (anionsSum > 2 && carbonateHardness < totalHardness / 2) {
    schemeImg = serialHNaCationSchemeImg;
    schemeTittle = 'Последовательное водород-натрий-катионирование';
    schemeText = `Последовательное водород-натрий-катионирование - рекомендуется для минерализованных вод с высоким солесодержанием 
      при Жк < 0,5 Жо (${carbonateHardness} < ${
      totalHardness / 2
    }). Согласно схеме основной поток разбивается 
      на два в точке нейтрализации. Первый поток пропускается через 
      H-катионитный фильтр и его кислый фильтрат смешивания в трубопроводе 
      со второй частью потока, происходит частичная нейтрализация 
      сильных кислот бикарбонатными солями, находящимися в исходной воде, с образованием CO₂.`;
  } else {
    schemeImg = HFilterWithRegenImg;
    schemeTittle = 'H-фильтр с «голодной» регенерацией';
    schemeText = `H-фильтр с «голодной» регенерацией - рекомендуется 
      для вод с повышенной карбонатной жесткостью и позволяет получить 
      H-катионированную воду, не содержащую сильных минеральных кислот. 
      Образующаяся свободная угольная кислота удаляется в декарбонизаторе, 
      а затем доумягчается на Na-катионитном фильтре. Качество 
      фильтрата Жост ≤ 5 мкг · экв./кг, Щост ≈ 0,2–0,3 мг · экв./кг. 
      Регенерация катионита производится в режиме недостатка кислоты. При 
      этом в H-форму переводятся только верхние слои катионита, 
      а нижние остаются в формах Ca²⁺, Mg²⁺, Na⁺, т. е. назначение 
      H-катионитного фильтра состоит в основном в разрушении бикарбонатных 
      ионов для получения фильтрата с минимальной щелочностью.`;
  }

  return { schemeImg, schemeText, schemeTittle };
}
