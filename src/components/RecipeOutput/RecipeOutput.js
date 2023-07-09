import './RecipeOutput.sass';
import { cook } from '../../calc';

export default function RecipeOutput({ recipe }) {
	let recipeOutput = cook(recipe);
	let effectOutput = '';

	if (recipeOutput.buff.effect === null) {
		effectOutput = '';
	} else if (recipeOutput.buff.effectType === 'duration') {
		effectOutput = recipeOutput.buff.effect + ' (' + recipeOutput.buffStrength + ') ' + recipeOutput.buffDuration;
	} else if (recipeOutput.buffHearts !== '') {
		effectOutput = recipeOutput.buffHearts + ' ' + recipeOutput.buff.effect;
	} else if (recipeOutput.buffStamina !== '') {
		effectOutput = recipeOutput.buffStamina + ' wheels of ' + recipeOutput.buff.effect;
	}

	return (
		<div className='output-div'>
			<div className='card-header'>
				<h2>Recipe Output</h2>
			</div>

			<div>
				<strong>Hearts:</strong> {recipeOutput.hearts}
				{effectOutput !== '' && <div>{effectOutput}</div>}
			</div>
		</div>
	);
}
