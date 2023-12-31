import { ingredients } from '../../data/ingredients';
import { effects } from '../../data/effects';
import './IngredientList.sass';
import { Tooltip } from 'react-tooltip';
import heartIcon from '../../data/assets/ui-icons/Heart.svg';
import starIcon from '../../data/assets/ui-icons/Markless Bonus.svg';

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
			return <img src={icon} className='effect-icon' alt={effect.displayName} />;
		} else {
			return '';
		}
	};

	const makeTooltip = (ingredient) => {
		let rows = [];
		let effect = effects.find((effect) => effect.effect === ingredient.effect);

		// Title Row
		rows.push(<span className='tooltip-title' key={rows.length + 1}>{ingredient.type}</span>);

		// Hearts Restored
		if (ingredient.hearts > 0) {
			rows.push(
				<span key={rows.length + 1}>
					<img src={heartIcon} className='ui-icon' alt='heart icon' /> {ingredient.hearts * 2}
					<span className='tooltip-note-text'>(when cooked)</span>
				</span>
			);
		}

		// Ingredient Potency (duration buffs only)
		if (effect.effectType === 'duration') {
			let strength = '';
			if (ingredient.potency === 1) {
				strength = 'Low';
			} else if (ingredient.potency === 2) {
				strength = 'Medium';
			} else if (ingredient.potency === 3) {
				strength = 'High';
			}
			rows.push(<span key={rows.length + 1}>Strength: {strength}</span>);
		}

		// Display Time Boost information
		if (ingredient.timeBoostDuration > 0) {
			rows.push(
				<span key={rows.length + 1}>
					Adds {ingredient.timeBoostDuration} seconds{' '}
					<span className='tooltip-note-text'>(first {ingredient.type} only)</span>
				</span>
			);
		}

		// Display Crit information
		if (ingredient.tags.includes('Crit')) {
			if (ingredient.type === 'Monster Extract') {
				rows.push(
					<span key={rows.length + 1}>
						<img src={starIcon} className='ui-icon' alt='' />
						Changes duration to 1:00, 10:00 or 30:00
					</span>
				);
			} else if (ingredient.id >= 181 && ingredient.id <= 184) {
				// Ingredients 181-184 are dragon horns, which always change the duration to 30 minutes.
				rows.push(
					<span key={rows.length + 1}>
						<img src={starIcon} className='ui-icon' alt='' />
						Sets duration to 30:00
					</span>
				);
			} else {
				rows.push(
					<span key={rows.length + 1}>
						<img src={starIcon} className='ui-icon' alt='' />
						Triggers a random critical effect
					</span>
				);
			}
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
						{/* // eslint-disable-next-line */}
						<span data-tooltip-id={ingredient.type}>
							<button className='material-button' onClick={() => handleAddIngredient(ingredient)}>
								<img className='material-img' src={ingredient.image} alt={ingredient.type} loading="lazy" />
								{ingredient.effect !== undefined && ingredient.effect !== null && getEffectIcon(ingredient)}
							</button>
						</span>
						{/* // eslint-disable-next-line */}
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
