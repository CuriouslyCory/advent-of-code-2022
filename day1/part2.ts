import {elfFood} from './input';

type ElfInfo = [number, number];

const totalCalsTop3 = (elfFood: string): number => {
    const rawElfSupply = elfFood.split('\n\n');
    const elfSupply = rawElfSupply.map((elf) => elf.split('\n').map((calorie: string): number => parseInt(calorie)));
    const totalCaloriesPerElf: ElfInfo[] = elfSupply.map((elf, index) => [index, elf.reduce((acc, curr) => acc + curr)]);
    
    const sortedElves = totalCaloriesPerElf.sort((a, b) => b[1] - a[1]);
    const top3Elves = sortedElves.slice(0, 3);
    const totalCals = top3Elves.reduce((acc, curr) => acc + curr[1], 0);

    return totalCals;
};

const elfWithMostFood = totalCalsTop3(elfFood);
console.log(elfWithMostFood);