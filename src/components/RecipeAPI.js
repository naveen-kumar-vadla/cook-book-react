const RecipeAPI = {};

RecipeAPI.fetchRecipes = () => fetch('/api/recipes/').then(x => x.json());
RecipeAPI.fetchRecipe = id => fetch(`/api/recipes/recipe/${id}`).then(x => x.json());
RecipeAPI.fetchUser = () => fetch('/api/user/').then(x => x.json());
RecipeAPI.toggleCollect = id =>
  fetch(`/api/user/toggleCollect/${id}`).then(x => x.json());
RecipeAPI.fetUserCollection = () =>
  fetch('/api/user/fetUserCollection').then(x => x.json());
RecipeAPI.fetchUserProfile = username =>
  fetch(`/api/user/profile/${username}`).then(x => x.json());

export default RecipeAPI;
