const RecipeAPI = {};

RecipeAPI.fetchRecipes = () => fetch('/api/recipes').then(x => x.json());
RecipeAPI.fetchRecipe = id => fetch(`/api/recipe/${id}`).then(x => x.json());
RecipeAPI.fetchUser = () => fetch('/api/fetchUser').then(x => x.json());
RecipeAPI.toggleCollect = id =>
  fetch(`/api/toggleCollect/${id}`).then(x => x.json());
RecipeAPI.fetUserCollection = () =>
  fetch('/api/fetUserCollection').then(x => x.json());
RecipeAPI.fetchUserProfile = username =>
  fetch(`/api/profile/${username}`).then(x => x.json());

export default RecipeAPI;
