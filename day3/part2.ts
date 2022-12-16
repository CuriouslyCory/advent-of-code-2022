import rawRucksackInventory from "input";

type Item = string;

type Rucksack = Item[];

type ElfGroup = [Rucksack, Rucksack, Rucksack];

/**
 *
 * @param {string} input
 * @returns boolean
 */
const isUpperCase = (input: string): boolean => input.toUpperCase() === input;

/**
 * Take a character and return the character value
 * @param {string} input
 * @returns {number} value
 */
const strToValue = (input: string): number => {
  const baseCharVal = parseInt(input, 36) - 9;
  return isUpperCase(input) ? baseCharVal + 26 : baseCharVal;
};

/**
 * format the strategyGuide input into a useable state
 * @returns {Rucksack[]} `Rucksack[]`
 **/
const formatInput = (rucksackInventory: string): Rucksack[] => {
  return rucksackInventory.split("\n").map((rucksackStr: string) => rucksackStr.split(""));
};

const getElfGroups = (
  rucksacks: Rucksack[]
): ElfGroup[] => {
  const groupSize = 3;
  let groups: ElfGroup[] = [];
  for (let i = 0; i < rucksacks.length; i + groupSize) {  
    const groupAry = rucksacks.slice(i, i += groupSize);
    const groupTuple = [groupAry[0], groupAry[1], groupAry[2]] as ElfGroup;
    groups.push(groupTuple);
  }
  return groups;
};

// const identifyMispackedItem = (rucksack: Rucksack): Item => {
//   const uniqueRucksackItems1 = Array.from(new Set(rucksack.compartment1));
//   const uniqueRucksackItems2 = Array.from(new Set(rucksack.compartment2));
//   return uniqueRucksackItems1.find(
//     (item1) => !!uniqueRucksackItems2.find((item2) => item2 === item1)
//   );
// };

const findBadge = (elfGroup: ElfGroup): Item => {
  const set1 = Array.from(new Set(elfGroup[0]));
  const set2 = Array.from(new Set(elfGroup[1]));
  const set3 = Array.from(new Set(elfGroup[2]));
  return set1.find((item) => set2.includes(item) && set3.includes(item));
}

const rucksackInventory = formatInput(rawRucksackInventory);
const elfGroups = getElfGroups(rucksackInventory);
const badges = elfGroups.map((group) => findBadge(group));
const totalValue = badges.map((badge) => strToValue(badge)).reduce((prev, cur) => prev + cur);
console.log(totalValue);