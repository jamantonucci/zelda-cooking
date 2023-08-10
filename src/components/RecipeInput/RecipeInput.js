import './RecipeInput.sass';
import { CiSquareRemove } from 'react-icons/ci';

export default function RecipeInput({ recipe, setRecipe }) {
	const handleClearIngredients = () => {
		setRecipe([]);
	};

	const handleRemoveIngredient = (index) => {
		let newRecipe = [...recipe];
		newRecipe.splice(index, 1);
		setRecipe(newRecipe);
	};

	const rows = [];
	for (let i = 0; i <= 4; i++) {
		if (i < recipe.length) {
			rows.push(
				<div key={i} className='row' onClick={() => handleRemoveIngredient(i)}>
					<span className='ingredient-name'>
						<img className='material-img' src={recipe[i].image} alt={recipe[i].type} />
						{recipe[i].type}
					</span>
				</div>
			);
		} else {
			rows.push(
				<div key={i} className='empty-row row'>
					<span>None</span>
				</div>
			);
		}
	}

	return (
		<div className='input-div'>
			<div className='card-header'>
				<h2>Recipe</h2>
			</div>

			<div className='rows'>{rows}</div>

			<div className='clear-button'>
				<button onClick={handleClearIngredients}>Clear</button>
			</div>
		</div>
	);
}
