import { ingredients } from '../../data/ingredients';
import './IngredientList.sass';

export default function IngredientList(props) {
	const handleAddIngredient = (ingredient) => {
		if (props.recipe.length < 5) {
			const newRecipe = props.recipe;
			newRecipe.push(ingredient);
			props.setRecipe(newRecipe);
		}
	};

	return (
		<div className='ingredient-list-div'>
			<div className='card-header'>
				<h2>Materials</h2>
			</div>

			<div className='ingredient-div'>
				{ingredients.map((ingredient, index) => (
					<div key={index}>
						<button onClick={() => handleAddIngredient(ingredient)}>{ingredient.type}</button>
					</div>
				))}
			</div>
		</div>
	);
}
