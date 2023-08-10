import './RecipeOutput.sass';
import { cook } from '../../utilities/CalculateRecipeEffects';
import heartIcon from '../../data/assets/ui-icons/Heart.svg';
import halfHeartIcon from '../../data/assets/ui-icons/Heart Half.svg';
import quarterHeartIcon from '../../data/assets/ui-icons/Heart Quarter.svg';
import { FiClock, FiAlertTriangle } from 'react-icons/fi';

export default function RecipeOutput({ recipe }) {
	let recipeOutput = cook(recipe);
	let buff = recipeOutput.buff;
	let hearts = [];
	let buffIcons = [];
	let wheelIcons = [];

	if (buff.effect === 'ExtraHearts') {
		hearts.push(
			<span key='full-recovery'>
				<img src={heartIcon} className='ui-icon' alt='heart icon'  />
				Full Recovery
			</span>
		);
	} else hearts = convertHeartsToIcons(recipeOutput.hearts);

	if (recipeOutput.buffStrength >= 1) {
		buffIcons = convertBuffStrengthToIcons(recipeOutput.buffStrength);
	}

	if (buff.effect === 'StaminaRecovery' || buff.effect === 'ExtraStamina') {
		buffIcons = convertStaminaToWheels(recipeOutput.buffStamina);
	}

	if (buff.effect === 'ExtraHearts' || buff.effect === 'GloomRecovery') {
		buffIcons = convertBuffHeartsToIcons(recipeOutput.buffHearts);
	}

	function convertHeartsToIcons(hearts) {
		const heartIcons = [];

		for (let i = 1; i <= hearts; i++) {
			heartIcons.push(<img src={heartIcon} className='ui-icon' alt='heart icon' key={heartIcons.length + 1} />);
		}

		if (hearts % 0.5 !== 0) {
			heartIcons.push(
				<img src={quarterHeartIcon} className='ui-icon' alt='quarter heart icon' key={heartIcons.length + 0.25} />
			)
		} else if (hearts % 1 !== 0) {
			heartIcons.push(
				<img src={halfHeartIcon} className='ui-icon' alt='half heart icon' key={heartIcons.length + 0.5} />
			);
		}

		return heartIcons;
	}

	function convertBuffStrengthToIcons(strength) {
		const buffIcons = [];

		for (let i = 1; i <= strength; i++) {
			buffIcons.push(<img className='ui-icon' src={buff.icon} alt={buff.displayName} key={buffIcons.length + 1} />);
		}

		return buffIcons;
	}

	function convertStaminaToWheels(wheels) {
		const wheelIcons = [];

		for (let i = 1; i <= wheels; i++) {
			wheelIcons.push(<img src={buff.icon} className='ui-icon' alt={buff.displayName} key={wheelIcons.length + 1} />);
		}

		wheels = (wheels % 1).toFixed(1);

		if (wheels > 0) {
			wheels = (wheels / 0.2 - 1).toFixed(0);
			wheelIcons.push(
				<img src={buff.icons[wheels]} className='ui-icon' alt='stamina wheel icon' key={wheelIcons.length + 1} />
			);
		}

		return wheelIcons;
	}

	function convertBuffHeartsToIcons(hearts) {
		const heartIcons = [];

		for (let i = 1; i <= hearts; i++) {
			heartIcons.push(<img src={buff.icon} className='ui-icon' alt={buff.displayName} key={heartIcons.length + 1} />);
		}

		return heartIcons;
	}

	return (
		<div className='output-div'>
			<div className='card-header'>
				<h2>Effect</h2>
			</div>

			<div className='effects-div'>
				{recipe.length > 0 && (
					<div className='meal-div'>
						{(recipeOutput.meal.ingredients) && buff.prefix} {recipeOutput.meal.type}
						<img alt={recipeOutput.meal.type} className='meal-img' src={recipeOutput.meal.image} />
					</div>
				)}

				<div className='hearts-div'>{hearts}</div>
				{buff.effectType === 'duration' && (
					<>
						<div className='effect-type-div'>
							{buffIcons} {wheelIcons} {buff.displayName}
						</div>
						<div className='effect-duration-div'>
							<FiClock />
							{recipeOutput.buffDuration}
						</div>
					</>
				)}
				{buff.effectType !== 'duration' && (
					<div>
						{buffIcons} {buff.displayName}
					</div>
				)}
				{recipeOutput.errors.length > 0 && (
					<div className='errors-output'>
						<FiAlertTriangle className='ui-icon' />
						{recipeOutput.errors}
					</div>
				)}
			</div>
		</div>
	);
}
