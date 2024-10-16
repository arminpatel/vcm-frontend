interface Problem {
  id: number;
}

const getMaxId = (problems: Problem[]): number => {
  const ids = problems.map((problem) => problem.id);
  const maxid = Math.max(...ids);
  return maxid;
};

export default getMaxId;
