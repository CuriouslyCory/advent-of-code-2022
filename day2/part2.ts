import strategyGuide from "input"; 

enum RoundChoice {
    Rock = "A",
    Paper = "B",
    Scissors = "C",
}

enum DesiredOutcome {
    Lose = "X",
    Draw = "Y",
    Win = "Z",
}

type RoundStrategy = {
    elfChoice: RoundChoice;
    desiredOutcome: DesiredOutcome;
}

type Round = {
  elfChoice: RoundChoice;  
  myChoice: RoundChoice;
}

const choiceScoreMatrix = {
    [RoundChoice.Rock]: 1,
    [RoundChoice.Paper]: 2,
    [RoundChoice.Scissors]: 3,
}

// TBD
const outcomeScoreMatrix = {
    
}

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
 */

// format the strategyGuide input into a useable state
const formatStrategyGuide = (): RoundStrategy[] => {
    return strategyGuide.split("\n").map((round) => {
        const roundAry = round.split(" ");
        return {
            elfChoice: roundAry[0] as RoundChoice,
            desiredOutcome: roundAry[1] as DesiredOutcome,
        } as const
    });
}

// calculate the choice we need to make to meet the strategy guide condition
const calculateMyChoice = (roundStrat: RoundStrategy): RoundChoice => {
  switch(JSON.stringify(roundStrat)) {
    case JSON.stringify({elfChoice: RoundChoice.Rock, desiredOutcome: DesiredOutcome.Win}):
      return RoundChoice.Paper;
    case JSON.stringify({elfChoice: RoundChoice.Rock, desiredOutcome: DesiredOutcome.Draw}):
        return RoundChoice.Rock;
    case JSON.stringify({elfChoice: RoundChoice.Rock, desiredOutcome: DesiredOutcome.Lose}):
      return RoundChoice.Scissors;
    case JSON.stringify({elfChoice: RoundChoice.Paper, desiredOutcome: DesiredOutcome.Win}):
      return RoundChoice.Scissors;
    case JSON.stringify({elfChoice: RoundChoice.Paper, desiredOutcome: DesiredOutcome.Draw}):
        return RoundChoice.Paper;
    case JSON.stringify({elfChoice: RoundChoice.Paper, desiredOutcome: DesiredOutcome.Lose}):
      return RoundChoice.Rock;
    case JSON.stringify({elfChoice: RoundChoice.Scissors, desiredOutcome: DesiredOutcome.Win}):
      return RoundChoice.Rock;
    case JSON.stringify({elfChoice: RoundChoice.Scissors, desiredOutcome: DesiredOutcome.Draw}):
        return RoundChoice.Scissors;
    case JSON.stringify({elfChoice: RoundChoice.Scissors, desiredOutcome: DesiredOutcome.Lose}):
      return RoundChoice.Paper;
  }
}

const roundScore = (round: Round): number => {
    switch(JSON.stringify(round)) {
        case JSON.stringify({myChoice: RoundChoice.Rock, elfChoice: RoundChoice.Scissors}):
            return 6;
        case JSON.stringify({myChoice: RoundChoice.Rock, elfChoice: RoundChoice.Rock}):
            return 3;
        case JSON.stringify({myChoice: RoundChoice.Rock, elfChoice: RoundChoice.Paper}):
            return 0;
        case JSON.stringify({myChoice: RoundChoice.Paper, elfChoice: RoundChoice.Scissors}):
            return 0;
        case JSON.stringify({myChoice: RoundChoice.Paper, elfChoice: RoundChoice.Rock}):
            return 6;
        case JSON.stringify({myChoice: RoundChoice.Paper, elfChoice: RoundChoice.Paper}):
            return 3;
        case JSON.stringify({myChoice: RoundChoice.Scissors, elfChoice: RoundChoice.Scissors}):
            return 3;
        case JSON.stringify({myChoice: RoundChoice.Scissors, elfChoice: RoundChoice.Rock}):
            return 0;
        case JSON.stringify({myChoice: RoundChoice.Scissors, elfChoice: RoundChoice.Paper}):
            return 6;
        default:
            throw new Error(`No match found: ${JSON.stringify(round)}`);
    }
}

// calculate score for round
const scoreForRound = (round: Round): number => {
    const choiceScore = choiceScoreMatrix[round.myChoice];
    const outcomeScore = roundScore(round);
    const totalScore = choiceScore + outcomeScore;
    return totalScore;
}


// run
const formattedStrategyGuide = formatStrategyGuide();
const rounds = formattedStrategyGuide.map((round) => ({...round, myChoice: calculateMyChoice(round)} as Round));
const roundScores = rounds.map((round) => scoreForRound({myChoice: round.myChoice, elfChoice: round.elfChoice}));
const finalScore = roundScores.reduce((prev, curr) => prev + curr);
console.log(finalScore);