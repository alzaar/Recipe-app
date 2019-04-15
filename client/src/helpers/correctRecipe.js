const correctRecipe = (all_comments, recipe_id) => {
  let ans_array = [];
  if (!all_comments) return;
  for (let i = 0; i < all_comments.length; i++) {
    if (parseInt(recipe_id) === parseInt(all_comments[i].recipe_id)) {
      ans_array.push(all_comments[i])
    }
  }

  return ans_array;
}

export default correctRecipe;
