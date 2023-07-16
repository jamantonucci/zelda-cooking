import './App.css';
import IngredientList from './components/IngredientList/IngredientList';
import RecipeInput from './components/RecipeInput/RecipeInput';
import RecipeOutput from './components/RecipeOutput/RecipeOutput';
import Header from './components/Header/Header';
import { useState } from 'react';
import './styles/index.sass';

import './fonts/hyliaserifbeta-regular-webfont.woff2';

function App() {
	const [recipe, setRecipe] = useState([]);

	const handleAddIngredient = () => {
		const newRecipe = recipe.slice();
		setRecipe(newRecipe);
	};

	return (
		<div className='App'>
			<Header />
			<main>
				<RecipeInput recipe={recipe} setRecipe={setRecipe} />
				<RecipeOutput recipe={recipe} />
				<IngredientList recipe={recipe} setRecipe={() => handleAddIngredient()} />
			</main>
		</div>
	);
}

export default App;
