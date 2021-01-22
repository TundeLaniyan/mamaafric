const manualSearch = (queryString, manualSearch = null) => {
  if (queryString) {
    manualSearch = {
      $or: [
        { name: { $regex: queryString, $options: "i" } },
        { category: { $regex: queryString, $options: "i" } },
        { type: { $regex: queryString, $options: "i" } },
        { brand: { $regex: queryString, $options: "i" } },
        { description: { $regex: queryString, $options: "i" } },
      ],
    };
    return manualSearch;
  }
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const percentageDiscount = (options, req, res) => {
  // options.totalPrice = 200
  //  options.genericDiscount = 30
  //  options.percentageDiscount = 40

  let discount;

  if (options.genericDiscount) {
    discount = options.totalPrice - options.genericDiscount;
  } else if (options.percentageDiscount) {
    const easy = Math.round(
      (options.percentageDiscount / 100) * options.totalPrice
    );
    discount = options.totalPrice - easy;
  } else if (options.percentageDiscount) {
    discount = options.product + options.numberToBuy;
  }

  return { discount };
};

module.exports = {
  manualSearch,
  shuffle,
  percentageDiscount,
};
