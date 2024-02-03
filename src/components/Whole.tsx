import { ActionProbabilities, CardNum } from '@/type';
import Square from './Square';

type Props = {
  wholeStrategies: { [key: string]: ActionProbabilities };
};

const Whole = (props: Props) => {
  const { wholeStrategies } = props;
  const colIndex: CardNum[] = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  const rowIndex: CardNum[] = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  return (
    <div className="bg-slate-400  ">
      {colIndex.map((col) => {
        return (
          <div key={col} className="flex  h-[60px] bg-slate-900">
            {rowIndex.map((row) => {
              return (
                <Square
                  key={`${col}-${row}`}
                  col={row}
                  row={col}
                  squareStrategies={wholeStrategies}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Whole;
