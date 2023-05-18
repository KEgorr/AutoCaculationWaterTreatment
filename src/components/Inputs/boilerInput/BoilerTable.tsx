import { useState } from 'react';
import { IBoilerData } from '../../../types/data-types';
import { IBoilerTableProps } from '../../../types/props-types';
import AddBoiler from './AddBoiler';
import BoilerRow from './BoilerRow';

let nextId = 1;

export default function BoilersTable({
  onChangeBoiler,
  chosenBoiler,
  removeBoiler,
}: IBoilerTableProps) {
  const [isAdding, setAdding] = useState(false);
  const [boilers, setBoilers] = useState<IBoilerData[]>();

  function handleAddBoiler(boilerData: IBoilerData) {
    if (boilers === undefined) {
      setBoilers([
        {
          ...boilerData,
          id: nextId,
        },
      ]);
    } else {
      setBoilers([
        ...boilers,
        {
          ...boilerData,
          id: (nextId += 1),
        },
      ]);
    }
    setAdding(false);
  }

  function handleChangeBoiler(changedBoiler: IBoilerData | undefined) {
    if (changedBoiler) {
      setBoilers(
        boilers?.map((b) => {
          if (b.id === changedBoiler.id) {
            return changedBoiler;
          }
          return b;
        })
      );
    }
    setAdding(false);
    removeBoiler();
  }

  function handleChoseBoiler(boiler: IBoilerData) {
    onChangeBoiler(boiler);
  }

  function handleDeleteBoiler(boiler: IBoilerData | undefined) {
    setBoilers(boilers?.filter((b) => b.id !== boiler?.id));
    removeBoiler();
  }
  return (
    <>
      {!isAdding ? (
        <div>
          <table>
            {!boilers?.length ? (
              <thead>
                <tr>
                  <th>Необходимо добавить котел</th>
                </tr>
              </thead>
            ) : (
              <>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Наименование котла</th>
                    <th>Производительность, т/час</th>
                    <th>Рабочее давление, бар</th>
                    <th>Количество котлов, шт</th>
                  </tr>
                </thead>
                <tbody>
                  {boilers.map((boiler, i) => (
                    <BoilerRow
                      key={boiler.id}
                      boilerData={boiler}
                      boilerNumber={i + 1}
                      onChoseBoiler={handleChoseBoiler}
                      chosenBoilerClass={
                        boiler.id === chosenBoiler?.id
                          ? 'boiler boiler__selected'
                          : 'boiler'
                      }
                    />
                  ))}
                </tbody>
              </>
            )}
          </table>
          <button
            onClick={() => {
              setAdding(true);
              removeBoiler();
            }}
          >
            Добавить котел
          </button>
          <button
            disabled={chosenBoiler === undefined}
            onClick={() => setAdding(true)}
          >
            Изменить котел
          </button>
          <button
            disabled={chosenBoiler === undefined}
            onClick={() => handleDeleteBoiler(chosenBoiler)}
          >
            Удалить котел
          </button>
        </div>
      ) : (
        <AddBoiler
          onAddBoiler={handleAddBoiler}
          chosenBoiler={chosenBoiler}
          onChangeBoiler={handleChangeBoiler}
        />
      )}
    </>
  );
}
