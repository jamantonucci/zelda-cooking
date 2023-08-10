import './App.css';
import IngredientList from './components/IngredientList/IngredientList';
import RecipeInput from './components/RecipeInput/RecipeInput';
import RecipeOutput from './components/RecipeOutput/RecipeOutput';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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
				<div>
					<p>
						<strong>Zelda.Recipes: Meals of the Kingdom</strong> is an online tool for calculating the effects of cooked meals in
						Nintendo's The Legend of Zelda: Tears of the Kingdom.
					</p>
					<p>Simply tap the ingredients in the "Materials" window to view the cooked dish's effects! Tap an item in the "Recipe" window to remove it.</p>
				</div>
				<div className='input-output-div'>
					<RecipeInput recipe={recipe} setRecipe={setRecipe} />
					<RecipeOutput recipe={recipe} />
				</div>
				<IngredientList recipe={recipe} setRecipe={() => handleAddIngredient()} />
			</main>
			<Footer />
		</div>
	);
}

export default App;
