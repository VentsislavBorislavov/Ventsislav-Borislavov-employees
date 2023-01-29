import React from "react";
import { getDays } from "../../utils/dates";
import "./PairTable.css";

export default function PairTable({ pair }) {
  const { emp1, emp2, projects } = pair;
  const projectKeys = Object.keys(projects);
  const projectRows = projectKeys.map((projectKey) => {
    const { timeTogether } = projects[projectKey];
    return (
      <tr>
        <td>{emp1}</td>
        <td>{emp2}</td>
        <td>{projectKey}</td>
        <td>{getDays(timeTogether)}</td>
      </tr>
    );
  });
  return (
    <table>
      <tr>
        <th>Employee ID #1</th>
        <th>Employee ID #2</th>
        <th>Project ID</th>
        <th>Days worked</th>
      </tr>
      {projectRows}
      <tr>
        <td colSpan="3">Overall days worked together</td>
        <td>{getDays(pair.overAllTimeTogether)}</td>
      </tr>
    </table>
  );
}
