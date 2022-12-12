import {elfFood} from './input';

const findMostFood = (elfFood: string): [number, number] => {
    const rawElfSupply = elfFood.split('\n\n');
    const elfSupply = rawElfSupply.map((elf) => elf.split('\n').map((calorie: string): number => parseInt(calorie)));
    const totalCaloriesPerElf: number[] = elfSupply.map((elf) => elf.reduce((acc, curr): number => acc + curr))
    let maxCalories = 0;
    let maxCaloriesIndex = 0;
    totalCaloriesPerElf.forEach((totalCals, index) => {
        console.log("elfInfo", totalCals, index);
        if (totalCals > maxCalories) {
            maxCalories = totalCals;
            maxCaloriesIndex = index + 1;
        }
        console.log("newest max elf", maxCalories, maxCaloriesIndex);
    })

    return [maxCalories, maxCaloriesIndex];
};

const elfWithMostFood = findMostFood(elfFood);
console.log(elfWithMostFood);