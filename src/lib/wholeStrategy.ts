import { ActionProbabilities } from "@/type";

function parseData(dataStr: string): { [key: string]: number } {
  let dataObj: { [key: string]: number } = {};
  let entries = dataStr.split(',');

  for (let entry of entries) {
    let [key, value] = entry.split(':');
    dataObj[key.trim()] = parseFloat(value);
  }

  return dataObj;
}

function roundToNearest(num: number, increment: number): number {
  return Math.round(num / increment) * increment;
}

export function transformData(
  aggressiveStr1: string,
  aggressiveStr2: string,
  passiveStr: string,
  foldStr: string,
  roundingMode: "oneforth" | "half"
): { [key: string]: ActionProbabilities } {
  let aggressiveData1 = parseData(aggressiveStr1);
  let aggressiveData2 = parseData(aggressiveStr2);
  let passiveData = parseData(passiveStr);
  let foldData = parseData(foldStr);

  let transformedData: { [key: string]: ActionProbabilities } = {};
  let allKeys = new Set([
    ...Object.keys(aggressiveData1),
    ...Object.keys(aggressiveData2),
    ...Object.keys(passiveData),
    ...Object.keys(foldData),
  ]);

  let increment = roundingMode === "oneforth" ? 25 : 50;

  allKeys.forEach((key) => {
    let aggressive = (aggressiveData1[key] || 0) + (aggressiveData2[key] || 0);
    let passive = passiveData[key] || 0;
    let fold = foldData[key] || 0;

    let total = aggressive + passive + fold;
    if (total > 0) {
      aggressive = roundToNearest((aggressive / total) * 100, increment);
      passive = roundToNearest((passive / total) * 100, increment);
      fold = roundToNearest((fold / total) * 100, increment);

      transformedData[key] = { aggressive, passive, fold };
    } else {
      transformedData[key] = { aggressive, passive, fold };
    }
  });

  return transformedData;
}
