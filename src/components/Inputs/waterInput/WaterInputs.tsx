import { InputWaterDataProps } from '../../../types/props-types';
import WaterUsualInput from './usualInputTool';

export default function WaterInputs({
  waterData,
  update,
}: InputWaterDataProps) {
  return (
    <div>
      <div>
        {waterData.map((el, index) => {
          if (index < 5) {
            return (
              <WaterUsualInput
                key={el.id}
                className={el.isValid ? 'normal' : 'red'}
                waterData={el}
                update={update}
              />
            );
          }
          return null;
        })}
      </div>
      <div>
        <p>Содержание катионов и анионов в воде</p>
        {waterData.map((el, index) => {
          if (index > 5) {
            return (
              <WaterUsualInput
                key={el.id}
                className={'normal'}
                waterData={el}
                update={update}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
