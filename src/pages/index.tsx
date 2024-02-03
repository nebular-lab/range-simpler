import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { transformData } from '@/lib/wholeStrategy';
import { ActionProbabilities } from '@/type';
import Whole from '@/components/Whole';
const inter = Inter({ subsets: ['latin'] });
type Ranges = {
  aggressive1: string;
  aggressive2: string;
  passive: string;
  fold: string;
};
export default function Home() {
  const [ranges, setRanges] = useState<Ranges>({
    aggressive1: '',
    aggressive2: '',
    passive: '',
    fold: '',
  });
  const [wholeStrategies, setWholeStrategies] = useState<{
    [key: string]: ActionProbabilities;
  }>({});
  const inputRange = (
    e: React.ChangeEvent<HTMLInputElement>,
    actionType: 'aggressive1' | 'aggressive2' | 'passive' | 'fold'
  ) => {
    setRanges({ ...ranges, [actionType]: e.target.value });
  };
  const processRange = (roundingMode: 'oneforth' | 'half') => {
    setWholeStrategies(
      transformData(
        ranges.aggressive1,
        ranges.aggressive2,
        ranges.passive,
        ranges.fold,
        roundingMode
      )
    );
    console.log(wholeStrategies);
  };
  return (
    <main className={`flex min-h-screen items-center  p-24 ${inter.className}`}>
      <Whole wholeStrategies={wholeStrategies} />
      <div className="m-10 flex flex-col justify-center gap-3 ">
        <div>
          <div className="bg-red-500 text-white p-1 rounded-md justify-center flex">
            AGGRESSIVE 1
          </div>
          <Input
            value={ranges.aggressive1}
            onChange={(e) => inputRange(e, 'aggressive1')}
          />
        </div>
        <div>
          <div className="bg-red-500 text-white p-1 rounded-md justify-center flex">
            AGGRESSIVE 2
          </div>
          <Input
            value={ranges.aggressive2}
            onChange={(e) => inputRange(e, 'aggressive2')}
          />
        </div>
        <div>
          <div className="bg-green-500 text-white p-1 rounded-md justify-center flex">
            PASSIVE
          </div>
          <Input
            value={ranges.passive}
            onChange={(e) => inputRange(e, 'passive')}
          />
        </div>
        <div>
          <div className="bg-blue-500 text-white p-1 rounded-md justify-center flex">
            FOLD
          </div>
          <Input value={ranges.fold} onChange={(e) => inputRange(e, 'fold')} />
        </div>
        <div className="flex justify-between">
          <Button className="w-20" onClick={() => processRange('half')}>
            1/2
          </Button>
          <Button className="w-20" onClick={() => processRange('oneforth')}>
            1/4
          </Button>
        </div>
      </div>
    </main>
  );
}
