const RecipeAPI = {};

RecipeAPI.fetchRecipies = () => fetch('/api/recipies').then(x => x.json());

export default RecipeAPI;
