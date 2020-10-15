const RecipeAPI = {};

RecipeAPI.fetchRecipies = () => fetch('/api/recipies').then(x => x.json());
RecipeAPI.fetchRecipe = id => fetch(`/api/recipe/${id}`).then(x => x.json());

export default RecipeAPI;
