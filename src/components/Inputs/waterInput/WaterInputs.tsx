import { InputWaterDataProps } from '../../../types/props-types';
import WaterUsualInput from './usualInputTool';

export default function WaterInputs({
  waterData,
  update,
}: InputWaterDataProps) {
  return (
    <div className="water-input">
      <ul className="input-fields">
        {waterData.map((el, index) => {
          if (index < 5) {
            return (
              <WaterUsualInput
                key={el.id}
                className={
                  el.isValid
                    ? 'input-block__field'
                    : 'input-block__field input-block__field_invalid'
                }
                waterData={el}
                update={update}
              />
            );
          }
          return null;
        })}
      </ul>
      <div className="water-input__subfields">
        <h2 className="water-input__subtitle">
          Содержание катионов и анионов в воде
        </h2>
        <ul className="input-fields">
          {waterData.map((el, index) => {
            if (index >= 5) {
              return (
                <WaterUsualInput
                  key={el.id}
                  className={'input-block__field'}
                  waterData={el}
                  update={update}
                />
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
}
