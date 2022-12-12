/**
 * Score:
 * Choice
 * 1 - Rock
 * 2 - Paper
 * 3 - Scissors
 *
 * Outcome
 * 0 - Loss
 * 3 - Tie
 * 6 - Win
 *
 * rock beats scissors
 * paper beats rock
 * scissors beats paper
 * r,1 + s,4 = 5 - win
 * p,2 + r,1 = 3 - win
 * s,4 + p,2 = 6 - win
 */

// import raw data
import strategyGuide from "input";

// enum for choices based on elf input
enum RoundChoice {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

// conversion table from choice to int for scoring
const choiceInt = {
  [RoundChoice.Rock]: 1,
  [RoundChoice.Paper]: 2,
  [RoundChoice.Scissors]: 4,
};

// enum for desired outcome
enum DesiredOutcome {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

// type for strategy guide records
type RoundStrategy = {
  elfChoice: RoundChoice;
  desiredOutcome: DesiredOutcome;
};

// type for round records
type Round = {
  elfChoice: RoundChoice;
  myChoice: RoundChoice;
};

// score each choice gives you regardless of win or lose
const choiceScoreMatrix = {
  [RoundChoice.Rock]: 1,
  [RoundChoice.Paper]: 2,
  [RoundChoice.Scissors]: 3,
};

/**
 * format the strategyGuide input into a useable state
 * @returns {RoundStrategy[]} `RoundStrategy[]`
 **/
const formatStrategyGuide = (): RoundStrategy[] => {
  return strategyGuide.split("\n").map((round) => {
    const roundAry = round.split(" ");
    return {
      elfChoice: roundAry[0] as RoundChoice,
      desiredOutcome: roundAry[1] as DesiredOutcome,
    } as const;
  });
};

/**
 * Calculate the choice I should make to get the desired win condition based on the elf's move
 * adding numbers only duplicates in draw conditions
 * @param {RoundChoice} c1
 * @param {RoundChoice} c2
 * @returns {number} score
 */
const calculateMyChoiceV2 = (roundStrat: RoundStrategy) => {
  // if same, return score for draw
  if (roundStrat.desiredOutcome === DesiredOutcome.Draw)
    return roundStrat.elfChoice;
  switch (roundStrat.elfChoice) {
    case RoundChoice.Rock:
      return roundStrat.desiredOutcome === DesiredOutcome.Win
        ? RoundChoice.Paper
        : RoundChoice.Scissors;
    case RoundChoice.Paper:
      return roundStrat.desiredOutcome === DesiredOutcome.Win
        ? RoundChoice.Scissors
        : RoundChoice.Rock;
    case RoundChoice.Scissors:
      return roundStrat.desiredOutcome === DesiredOutcome.Win
        ? RoundChoice.Rock
        : RoundChoice.Paper;
  }
};

/**
 * Calculate the score for the round
 * Adding numbers only duplicates in draw conditions
 * Adding the choices after removing draws gives unique numbers for each outcome
 * Then we just have to see which one made the winning choice and return the score
 * @param {Round} round
 * @returns {number} score
 */
const roundScoreV2 = (round: Round) => {
  // if same, return score for draw
  if (round.myChoice === round.elfChoice) return 3;
  // based on the winner, return the score
  switch (choiceInt[round.myChoice] + choiceInt[round.elfChoice]) {
    case 3:
      return round.myChoice === RoundChoice.Paper ? 6 : 0;
    case 5:
      return round.myChoice === RoundChoice.Rock ? 6 : 0;
    case 6:
      return round.myChoice === RoundChoice.Scissors ? 6 : 0;
    default:
      throw new Error(
        `No match found: ${JSON.stringify(round)}, ${
          choiceInt[round.myChoice] + choiceInt[round.elfChoice]
        }`
      );
  }
};

/**
 * Calculate score for round
 * First get the choice score
 * Then calculate the outcome (win/loss/draw) score
 * Finally add up the totals and return
 * @param {Round} round
 * @returns {number} score [0, 3, 6]
 */
const scoreForRound = (round: Round): number => {
  const choiceScore = choiceScoreMatrix[round.myChoice];
  const outcomeScore = roundScoreV2(round);
  const totalScore = choiceScore + outcomeScore;
  return totalScore;
};

// Use the functions to calculate the final score
// format the raw input
const formattedStrategyGuide = formatStrategyGuide();
// calculate the required input for each round
const rounds = formattedStrategyGuide.map(
  (round) => ({ ...round, myChoice: calculateMyChoiceV2(round) } as Round)
);
// calculate the score for each round
const roundScores = rounds.map((round) =>
  scoreForRound({ myChoice: round.myChoice, elfChoice: round.elfChoice })
);
// sum the scores
const finalScore = roundScores.reduce((prev, curr) => prev + curr);
console.log(finalScore);
