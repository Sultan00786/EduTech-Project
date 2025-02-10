const sortFunc = (a, b) => {
   const avgRatingA =
      a.ratingAndReviews.reduce((acc, review) => acc + review.rating, 0) /
      (a.ratingAndReviews.length || 1);
   const avgRatingB =
      b.ratingAndReviews.reduce((acc, review) => acc + review.rating, 0) /
      (b.ratingAndReviews.length || 1);

   return avgRatingB - avgRatingA; // Descending order
};

module.exports = {
   sortFunc,
};
