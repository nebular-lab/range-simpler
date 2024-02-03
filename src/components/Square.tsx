import { ActionProbabilities, CardNum, SuitPattern } from '@/type';
import Band from './Band';

type Props = {
  col: CardNum;
  row: CardNum;
  squareStrategies: { [key: string]: ActionProbabilities };
};

const Square = (props: Props) => {
  const { col, row, squareStrategies } = props;
  let suitPattern: SuitPattern = 'Pair';
  if (col == row) {
    suitPattern = 'Pair';
  } else if (col < row) {
    suitPattern = 'Suit';
  } else if (col > row) {
    suitPattern = 'OFF';
  }
  const cardNum = {
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: 'T',
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A',
  };
  const suit = {
    pair: ['sh', 'sd', 'hd', 'sc', 'hc', 'dc'],
    suit: ['ss', 'hh', 'dd', 'cc'],
    off: [
      'sh',
      'sd',
      'sc',
      'hs',
      'hd',
      'hc',
      'ds',
      'dh',
      'dc',
      'cs',
      'ch',
      'cd',
    ],
  };
  let hand: string = '';
  let strategies: ActionProbabilities[] = [];
  if (suitPattern === 'Pair') {
    strategies = suit.pair.map((s) => {
      const key = cardNum[col] + s[0] + cardNum[row] + s[1];
      hand = cardNum[col] + cardNum[row];
      return squareStrategies[key];
    });
  } else if (suitPattern === 'Suit') {
    strategies = suit.suit.map((s) => {
      const key = cardNum[row] + s[0] + cardNum[col] + s[1];
      hand = cardNum[row] + cardNum[col] + 's';
      return squareStrategies[key];
    });
  }

  if (suitPattern === 'OFF') {
    strategies = suit.off.map((s) => {
      const key = cardNum[col] + s[0] + cardNum[row] + s[1];
      hand = cardNum[col] + cardNum[row] + 'o';
      return squareStrategies[key];
    });
  }
  return (
    <div className="flex w-[60px] relative h-full border">
      {strategies.map((strategy, index) => {
        return (
          <Band key={index} strategy={strategy} suitPattern={suitPattern} />
        );
      })}
      <div className="absolute top-0 left-0  text-white text-xs">
        {hand}
      </div>
    </div>
  );
};
export default Square;
