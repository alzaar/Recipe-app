export default function recipeChecker(recipeArray, recipe_id) {
  let flag = false
  if (!recipeArray) return
  recipeArray.forEach((ele) => {
    if (parseInt(ele.id) === parseInt(recipe_id)) {
      flag = true;
      return flag;
    }
  })
  return flag;
}
