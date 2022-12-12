import strategyGuide from "input"; 

enum ElfPlay {
    Rock = "A",
    Paper = "B",
    Scissors = "C",
}

enum MyPlay {
    Rock = "X",
    Paper = "Y",
    Scissors = "Z",
}

type Round = {
    myPlay: MyPlay;
    elfPlay: ElfPlay;
}

const choiceScoreMatrix = {
    [MyPlay.Rock]: 1,
    [MyPlay.Paper]: 2,
    [MyPlay.Scissors]: 3,
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
const formatStrategyGuide = (): Round[] => {
    return strategyGuide.split("\n").map((round) => {
        const roundAry = round.split(" ");
        return {
            myPlay: roundAry[1] as MyPlay,
            elfPlay: roundAry[0] as ElfPlay,
        } as const
    });
}

const roundScore = (round: Round): number => {
    switch(JSON.stringify(round)) {
        case JSON.stringify({myPlay: MyPlay.Rock, elfPlay: ElfPlay.Scissors}):
            return 6;
        case JSON.stringify({myPlay: MyPlay.Rock, elfPlay: ElfPlay.Rock}):
            return 3;
        case JSON.stringify({myPlay: MyPlay.Rock, elfPlay: ElfPlay.Paper}):
            return 0;
        case JSON.stringify({myPlay: MyPlay.Paper, elfPlay: ElfPlay.Scissors}):
            return 0;
        case JSON.stringify({myPlay: MyPlay.Paper, elfPlay: ElfPlay.Rock}):
            return 6;
        case JSON.stringify({myPlay: MyPlay.Paper, elfPlay: ElfPlay.Paper}):
            return 3;
        case JSON.stringify({myPlay: MyPlay.Scissors, elfPlay: ElfPlay.Scissors}):
            return 3;
        case JSON.stringify({myPlay: MyPlay.Scissors, elfPlay: ElfPlay.Rock}):
            return 0;
        case JSON.stringify({myPlay: MyPlay.Scissors, elfPlay: ElfPlay.Paper}):
            return 6;
        default:
            throw new Error(`No match found: ${JSON.stringify(round)}`);
    }
}

// calculate score for round
const scoreForRound = (round: Round): number => {
    const choiceScore = choiceScoreMatrix[round.myPlay];
    const outcomeScore = roundScore(round);
    const totalScore = choiceScore + outcomeScore;
    return totalScore;
}


// run
const rounds = formatStrategyGuide();
const roundScores = rounds.map((round) => scoreForRound(round));
const finalScore = roundScores.reduce((prev, curr) => prev + curr);
console.log(finalScore);