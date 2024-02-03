import { ActionProbabilities, SuitPattern } from '@/type';

type Props = {
  strategy: ActionProbabilities;
  suitPattern: SuitPattern;
};

const Band = (props: Props) => {
  const { strategy, suitPattern } = props;

  const width = calcWidth(suitPattern);

  return (
    <div className={`${width} flex flex-col-reverse`}>
      <div
        className={`${calcHight(strategy?.aggressive||0)} ${calcColor(
          'AGGRESSIVE'
        )}`}
      ></div>
      <div
        className={`${calcHight(strategy?.passive)} ${calcColor('PASSIVE')}`}
      ></div>
      <div className={`${calcHight(strategy?.fold)} ${calcColor('FOLD')}`}></div>
    </div>
  );
};

export default Band;

const calcHight = (percentage: number) => {
  if (percentage === 0) {
    return 'h-0';
  } else if (percentage === 25) {
    return 'h-1/4';
  } else if (percentage === 50) {
    return 'h-1/2';
  } else if (percentage === 75) {
    return 'h-3/4';
  } else if (percentage === 100) {
    return 'h-full';
  }
};

const calcWidth = (suitPattern: SuitPattern) => {
  if (suitPattern === 'OFF') {
    return 'w-1/12';
  } else if (suitPattern === 'Suit') {
    return 'w-1/4';
  } else if (suitPattern === 'Pair') {
    return 'w-1/6';
  }
};

const calcColor = (action: 'AGGRESSIVE' | 'PASSIVE' | 'FOLD') => {
  if (action === 'AGGRESSIVE') {
    return 'bg-red-500';
  } else if (action === 'PASSIVE') {
    return 'bg-green-500';
  } else if (action === 'FOLD') {
    return 'bg-blue-500';
  }
};
