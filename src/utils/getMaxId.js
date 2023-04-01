const getMaxId = (problems) => {
  const ids = problems.map((problem) => {
    return problem.id;
  });
  const maxid = Math.max(...ids);
  return maxid;
};

export default getMaxId;
