import './RecipeInput.sass';
import { CgRemove } from 'react-icons/cg';

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
				<li key={i}>
					{recipe[i].type} <CgRemove onClick={() => handleRemoveIngredient(i)} />
				</li>
			);
		} else {
			rows.push(
				<li key={i} className='empty-li'>
					<span>None</span>
				</li>
			);
		}
	}

	return (
		<div className='input-div'>
			<div className='card-header'>
				<h2>Recipe</h2>
			</div>

			<ol>{rows}</ol>

			<div className='clear-button'>
				<button onClick={handleClearIngredients}>Clear</button>
			</div>
		</div>
	);
}
