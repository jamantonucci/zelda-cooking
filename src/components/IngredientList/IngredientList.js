import { ingredients } from '../../data/ingredients';
import { effects } from '../../data/effects';
import './IngredientList.sass';

export default function IngredientList(props) {
	const handleAddIngredient = (ingredient) => {
		if (props.recipe.length < 5) {
			const newRecipe = props.recipe;
			newRecipe.push(ingredient);
			props.setRecipe(newRecipe);
		}
	};

	const getEffectIcon = (ingredient) => {
		let effect = effects.find((effect) => effect.effect === ingredient.effect);
		let icon = effect.icon;

		if (icon) {
			return <img src={icon} className='effect-icon' />;
		} else {
			return '';
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
						<button className='material-button' onClick={() => handleAddIngredient(ingredient)}>
							<img className='material-img' src={ingredient.image} />
							{ingredient.effect !== undefined && ingredient.effect !== null && getEffectIcon(ingredient)}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
