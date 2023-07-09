import './App.css';
import IngredientList from './components/IngredientList/IngredientList';
import RecipeInput from './components/RecipeInput/RecipeInput';
import RecipeOutput from './components/RecipeOutput/RecipeOutput';
import Header from './components/Header/Header';
import { useState } from 'react';
import './styles/index.sass';

function App() {
	const [recipe, setRecipe] = useState([]);

	const handleAddIngredient = () => {
		const newRecipe = recipe.slice();
		setRecipe(newRecipe);
	};

	return (
		<div className='App'>
			<Header />
			<RecipeInput recipe={recipe} setRecipe={setRecipe} />
			<RecipeOutput recipe={recipe} />
			<IngredientList recipe={recipe} setRecipe={() => handleAddIngredient()} />
		</div>
	);
}

export default App;
