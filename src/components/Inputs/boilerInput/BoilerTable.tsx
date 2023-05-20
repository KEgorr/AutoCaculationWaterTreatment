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
        <div className="boilers-table-block">
          {!boilers?.length ? (
            <p className="add-boiler-massage">Необходимо добавить котел</p>
          ) : (
            <table className="boilers-table">
              <thead className="boilers-table__thead">
                <tr className="boilers-table__tr">
                  <th className="boilers-table__th">№</th>
                  <th className="boilers-table__th">Наименование котла</th>
                  <th className="boilers-table__th">
                    Производительность, т/час
                  </th>
                  <th className="boilers-table__th">Рабочее давление, бар</th>
                  <th className="boilers-table__th">Количество котлов, шт</th>
                </tr>
              </thead>
              <tbody className="boilers-table__tbody">
                {boilers.map((boiler, i) => (
                  <BoilerRow
                    key={boiler.id}
                    boilerData={boiler}
                    boilerNumber={i + 1}
                    onChoseBoiler={handleChoseBoiler}
                    chosenBoilerClass={
                      boiler.id === chosenBoiler?.id
                        ? 'boiler boiler_selected'
                        : 'boiler'
                    }
                  />
                ))}
              </tbody>
            </table>
          )}
          <div className="boilers-table-block__buttons">
            <button
              className="common-button"
              onClick={() => {
                setAdding(true);
                removeBoiler();
              }}
            >
              Добавить котел
            </button>
            {boilers?.length ? (
              <>
                <button
                  className="common-button"
                  disabled={chosenBoiler === undefined}
                  onClick={() => setAdding(true)}
                >
                  Изменить котел
                </button>
                <button
                  className="common-button"
                  disabled={chosenBoiler === undefined}
                  onClick={() => handleDeleteBoiler(chosenBoiler)}
                >
                  Удалить котел
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
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
