import { getTimePeriodTogether } from "./dates";

export function transformToProjects(csvData) {
  const projects = {};
  csvData.forEach((data) => {
    if (!projects[data.projectId]) {
      projects[data.projectId] = {
        employees: {},
      };
    }
    projects[data.projectId].employees[data.employeeId] = {
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    };
  });

  return projects;
}

export function getPairsWorkingTogether(projects) {
  const pairs = {};

  const projectKeys = Object.keys(projects);

  projectKeys.forEach((projectKey) => {
    const employees = projects[projectKey].employees;
    const keys = Object.keys(employees);

    if (keys.length < 2) return;

    for (let i = 0; i < keys.length - 1; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const pairName = `${keys[i]}${keys[j]}`;
        const employee1 = employees[keys[i]];
        const employee2 = employees[keys[j]];
        const timeTogether = getTimePeriodTogether({
          start1: employee1.dateFrom,
          end1: employee1.dateTo,
          start2: employee2.dateFrom,
          end2: employee2.dateTo,
        });
        if (!pairs[pairName]) {
          pairs[pairName] = {
            emp1: keys[i],
            emp2: keys[j],
            overAllTimeTogether: 0,
            projects: {},
          };
        }
        pairs[pairName].overAllTimeTogether += timeTogether;
        pairs[pairName].projects[projectKey] = { timeTogether };
      }
    }
  });

  return pairs;
}

export function findLongestWorkingPair(pairs) {
  const pairKeys = Object.keys(pairs);
  let longestPair = null;
  let longestTime = 0;

  pairKeys.forEach((pairKey) => {
    const pair = pairs[pairKey];
    if (pair.overAllTimeTogether > longestTime) {
      longestTime = pair.overAllTimeTogether;
      longestPair = pair;
    }
  });

  if (!longestPair) {
    throw new Error("No pairs found");
  }

  return longestPair;
}
