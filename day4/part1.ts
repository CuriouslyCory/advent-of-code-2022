import rawAssignmentPairs from "input";

type Assignment = [number, number];

type AssignmentPair = {
  assignment1: Assignment;
  assignment2: Assignment;
}

const formatInput = (rawAssignmentPairs: string): AssignmentPair[] => {
  const assignmentRows = rawAssignmentPairs.split("\n");
  const splitRows = assignmentRows.map((row) => row.split(","));
  const assignmentPair = splitRows.map((row) => {
    const assignments = row.map((assignment) => assignment.split("-").map((value) => +value));
    return {
      assignment1: assignments[0],
      assignment2: assignments[1]
    } as AssignmentPair
  });
  return assignmentPair;
}

// 35-48,18-49
const checkOverlap = (assignmentPair: AssignmentPair): boolean => {
  if(assignmentPair.assignment1[0] >= assignmentPair.assignment2[0] && assignmentPair.assignment1[1] <= assignmentPair.assignment2[1]){
    return true;
  }
  if(assignmentPair.assignment2[0] >= assignmentPair.assignment1[0] && assignmentPair.assignment2[1] <= assignmentPair.assignment1[1]){
    return true;
  }
  return false;
}

const assignmentPairs = formatInput(rawAssignmentPairs);
const overlappingPairs = assignmentPairs.map((pair) => checkOverlap(pair)).filter((result) => result === true);

console.log(overlappingPairs.length);