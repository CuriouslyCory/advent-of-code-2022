import {elfFood} from './input';

// function that breaks down the input into an array of arrays of numbers
const parseElfFood = (elfFood: string): number[][] => {
    const rawElfSupply = elfFood.split('\n\n');
    const elfSupply = rawElfSupply.map((elf) => elf.split('\n').map((calorie: string): number => parseInt(calorie)));
    return elfSupply;
}

// function that takes parsed elf food and returns the total calories for each elf
const totalCaloriesPerElf = (elfFood: number[][]): number[] => {
    const totalCaloriesPerElf: number[] = elfFood.map((elf) => elf.reduce((acc, curr): number => acc + curr))
    return totalCaloriesPerElf;
}

// function that uses the total calories per elf to find the top 3 elves
const top3Elves = (totalCaloriesPerElf: number[]): number[] => {
    const sortedElves = totalCaloriesPerElf.sort((a, b) => b - a);
    const top3Elves = sortedElves.slice(0, 3);
    return top3Elves;
}

// function that returns the total calories for any given array of elves
const totalCals = (elves: number[]): number => {
    const totalCals = elves.reduce((acc, curr) => acc + curr, 0);
    return totalCals;
}


const elfInventory = parseElfFood(elfFood);
const totalCalsPerElf = totalCaloriesPerElf(elfInventory)
const top3 = top3Elves(totalCalsPerElf);
console.log(    totalCals(top3)   );