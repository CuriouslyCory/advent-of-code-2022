import rawRucksackInventory from "input";

type Item = string;

type Rucksack = {
  compartment1: Item[];
  compartment2: Item[];
};

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
  return rucksackInventory.split("\n").map((rucksackStr: string) => {
    const rucksackContentAry = rucksackStr.split("");
    const compartment1 = rucksackContentAry.slice(
      0,
      +(rucksackContentAry.length / 2).toFixed(0)
    );
    const compartment2 = rucksackContentAry.slice(
      +(rucksackContentAry.length / 2),
      rucksackContentAry.length
    );
    if (compartment1.length !== compartment2.length)
      throw new Error(
        `Bad bag split, compartment1 ${compartment1.length}, compartment2 ${compartment2.length}`
      );
    return { compartment1, compartment2 } as Rucksack;
  });
};

const identifyMispackedItem = (rucksack: Rucksack): Item => {
  const uniqueRucksackItems1 = Array.from(new Set(rucksack.compartment1));
  const uniqueRucksackItems2 = Array.from(new Set(rucksack.compartment2));
  return uniqueRucksackItems1.find(
    (item1) => !!uniqueRucksackItems2.find((item2) => item2 === item1)
  );
};

const rucksackInventory = formatInput(rawRucksackInventory);
const misplacedItems = rucksackInventory
  .map((rucksack) => identifyMispackedItem(rucksack));

const misplaceItemValues = misplacedItems.map((item) => strToValue(item));
const totalValue = misplaceItemValues.reduce((prev, cur) => prev + cur);
console.log(totalValue);