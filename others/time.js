const Time = (doc) => {
  const dobC = doc.toISOString().split("T")[0].split("-");
  return `${dobC[2]}-${dobC[1]}-${dobC[0]}`;
};

module.exports = {
  Time,
};
