import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Context from '../contexts/MyContext';
import {
  isFavorite,
  saveFavorite,
  removeFavorite } from '../service/localStorage/favoriteRecipe';

const getType = (pathname) => (pathname.split('/')[1] === 'meals' ? 'meal' : 'drink');

function FavoriteBtn() {
  const { location: { pathname } } = useHistory();
  const [favorite, setFavorite] = useState(null);
  const { id } = useParams();
  const { currentRecipe } = useContext(Context);

  useEffect(() => {
    setFavorite(isFavorite(id, getType(pathname)));
    console.log(isFavorite(id, getType(pathname)));
  }, [id, pathname, currentRecipe]);

  const handleFavorite = () => {
    const {
      idMeal, idDrink,
      strMeal, strDrink,
      strArea,
      strCategory,
      strAlcoholic,
      strDrinkThumb, strMealThumb,
    } = currentRecipe || {};

    const recipe = {
      id: idMeal || idDrink,
      type: getType(pathname),
      name: strMeal || strDrink,
      category: strCategory,
      image: strDrinkThumb || strMealThumb,
      alcoholicOrNot: strAlcoholic || '',
      nationality: strArea || '',
    };

    if (!favorite) {
      saveFavorite(recipe);
      setFavorite(true);
    } else {
      removeFavorite(recipe.id, recipe.type);
      setFavorite(false);
    }
  };

  return (
    <div>
      <button
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      >
        Favorite
      </button>
    </div>
  );
}

export default FavoriteBtn;
