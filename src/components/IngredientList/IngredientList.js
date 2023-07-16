import { ingredients } from '../../data/ingredients';
import { effects } from '../../data/effects';
import './IngredientList.sass';
import { Tooltip } from 'react-tooltip';
import heartIcon from '../../data/assets/ui-icons/Heart.svg';

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

	const makeTooltip = (ingredient) => {
		let rows = [];
		let effect = effects.find((effect) => effect.effect === ingredient.effect);
		rows.push(<span className='tooltip-title'>{ingredient.type}</span>);
		rows.push(
			<span>
				<img src={heartIcon} className='ui-icon' /> {ingredient.hearts * 2}
				<span className='tooltip-note-text'>(when cooked)</span>
			</span>
		);
		if (effect.effectType === 'duration') {
			let strength = '';
			if (ingredient.potency === 1) {
				strength = 'Low';
			} else if (ingredient.potency === 2) {
				strength = 'Medium';
			} else if (ingredient.potency === 3) {
				strength = 'High';
			}
			rows.push(<span>Strength: {strength}</span>);
		}
		if (ingredient.timeBoostDuration > 0) {
			rows.push(
				<span>
					Adds {ingredient.timeBoostDuration} seconds{' '}
					<span className='tooltip-note-text'>(first {ingredient.type} only)</span>
				</span>
			);
		}

		return rows;
	};

	return (
		<div className='ingredient-list-div'>
			<div className='card-header'>
				<h2>Materials</h2>
			</div>

			<div className='ingredient-div'>
				{ingredients.map((ingredient, index) => (
					<div key={index}>
						<a data-tooltip-id={ingredient.type}>
							<button className='material-button' onClick={() => handleAddIngredient(ingredient)}>
								<img className='material-img' src={ingredient.image} />
								{ingredient.effect !== undefined && ingredient.effect !== null && getEffectIcon(ingredient)}
							</button>
						</a>
						<Tooltip className='my-tooltip' id={ingredient.type}>
							<div className='my-tooltip' style={{ display: 'flex', flexDirection: 'column' }}>
								{makeTooltip(ingredient)}
							</div>
						</Tooltip>
					</div>
				))}
			</div>
		</div>
	);
}
