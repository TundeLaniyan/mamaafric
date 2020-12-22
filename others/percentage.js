const AppError = require("../utils/appError");

const percentage = (
  ProEasy = 0,
  ProMedium = 0,
  ProDifficult = 0,
  ProVeryDifficult = 0
) => {
  const total = ProEasy + ProMedium + ProDifficult + ProVeryDifficult;

  const easy = Math.round((ProEasy / total) * 100);
  const medium = Math.round((ProMedium / total) * 100);
  const difficult = Math.round((ProDifficult / total) * 100);
  const veryDifficult = Math.round((ProVeryDifficult / total) * 100);
  
  return [easy, medium, difficult, veryDifficult];
};

const percentageDiscount = (options, req, res, next) => {

  let discount = 0;

  if(options.genericDiscount) {
    discount =  Number(options.totalPrice -  options.genericDiscount);
  } else if(options.perDiscount) {
    const perOff =  Number(((options.perDiscount / 100) *  options.totalPrice));
    discount =  Number(options.totalPrice - perOff);
  } else if(options.numberToBuy) {
    discount = Number(options.product + options.numberToBuy)
  }
  
  if(!options.totalPrice || typeof options.totalPrice !== "number" || typeof discount !== "number") return next(new AppError(`you need a total Price to calculate your discount`, 400));
  if(discount > options.totalPrice || discount < 0) return next(new AppError(`you need a total Price to calculate your discount`, 400));
  
  return (discount)
}

module.exports = {
   percentageDiscount
}



