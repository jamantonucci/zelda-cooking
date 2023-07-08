import { effects } from './data/effects';
import { ingredients } from './data/ingredients';

const createRecipe = (ing) => {
	let recipe = [];
	ing = ing.slice(0, 5);

	for (let i = 0; i < ing.length; i++) {
		let ingredientToAdd = ingredients.find((ingredient) => {
			return ingredient.type === ing[i];
		});
		console.log(ing.join(', '));
		recipe.push(ingredientToAdd);
	}

	cook(recipe);
};

const cook = (recipe) => {
	let hearts = getHearts(recipe);
	let resultEffect = getBuff(recipe);

	switch (resultEffect.effectType) {
		case 'duration':
			let buffStrength = getBuffStrength(recipe, resultEffect);
			let buffDuration = getBuffDuration(recipe, resultEffect);
			console.log(hearts + ' ' + resultEffect.effect + ' ' + buffStrength + ' ' + getFriendlyDuration(buffDuration));
			break;

		case 'hearts':
			let buffHearts = getBuffHearts(recipe);
			if (resultEffect.effect === 'ExtraHearts') {
				hearts = 'Full Recovery';
			}
			console.log(hearts + ' ' + resultEffect.effect + ' ' + buffHearts);
			break;
		case 'stamina':
			let buffStamina = getBuffStamina(recipe, resultEffect);
			console.log(hearts + ' ' + resultEffect.effect + ' ' + buffStamina);
			break;

		default:
			console.log('Hearts: ' + hearts);
			break;
	}
};

const getHearts = (recipe) => {
	let resultHearts = 0;

	recipe.forEach((ingredient) => {
		resultHearts = resultHearts + ingredient.hearts;
	});

	// Cooked meals heal the base recovery hearts of the item * 2
	resultHearts = resultHearts * 2;

	return resultHearts;
};

const getBuff = (recipe) => {
	let ingredientEffects = new Set();
	let resultEffect = null;

	recipe.forEach((ingredient) => {
		if (ingredient.effect != null) {
			ingredientEffects.add(ingredient.effect);
		}
	});

	if (ingredientEffects.size !== 1) {
		resultEffect = null;
	} else {
		resultEffect = [...ingredientEffects][0];
	}

	let effect = effects.find((effect) => effect.effect === resultEffect);

	return effect || null;
};

const getBuffStrength = (recipe, buff) => {
	let resultPotency = 0;
	let effectStrength = '';

	recipe.forEach((ingredient) => {
		resultPotency = resultPotency + ingredient.potency;
	});

	let midThreshold = buff.midThreshold;
	let highThreshold = buff.highThreshold;

	if (resultPotency >= highThreshold) {
		effectStrength = 'High';
	} else if (resultPotency >= midThreshold) {
		effectStrength = 'Mid';
	} else {
		effectStrength = 'Low';
	}

	return effectStrength;
};

const getBuffDuration = (recipe, buff) => {
	let boostIngredients = new Set();
	let resultDuration = 0;

	recipe.forEach((ingredient) => {
		resultDuration = resultDuration + ingredient.effectDuration;

		if (ingredient.effect != null) {
			resultDuration = resultDuration + buff.duration;
		}

		if (ingredient.timeBoostDuration !== 0) {
			boostIngredients.add(ingredient);
		}
	});

	boostIngredients.forEach((ingredient) => {
		resultDuration = resultDuration + ingredient.timeBoostDuration;
	});

	return resultDuration;
};

const getBuffHearts = (recipe) => {
	let resultPotency = 0;

	recipe.forEach((ingredient) => {
		resultPotency = resultPotency + ingredient.potency;
	});

	let buffHearts = resultPotency / 4;

	return buffHearts;
};

const getBuffStamina = (recipe, buff) => {
	let resultPotency = 0;
	let buffStamina = 0;

	recipe.forEach((ingredient) => {
		resultPotency = resultPotency + ingredient.potency;
	});

	if (buff.effect === 'StaminaRecovery') {
		switch (resultPotency) {
			case 0:
				buffStamina = 0;
				break;
			case 1:
				buffStamina = 0.2;
				break;
			case 2:
				buffStamina = 0.4;
				break;
			case 3:
				buffStamina = 0.8;
				break;
			case 4:
				buffStamina = 1;
				break;
			case 5:
				buffStamina = 1.4;
				break;
			case 6:
				buffStamina = 1.6;
				break;
			case 7:
				buffStamina = 1.8;
				break;
			case 8:
				buffStamina = 2.2;
				break;
			case 9:
				buffStamina = 2.4;
				break;
			case 10:
				buffStamina = 2.8;
				break;
			default:
				buffStamina = 3;
		}
	} else if (buff.effect === 'ExtraStamina') {
		switch (resultPotency) {
			case 0:
				buffStamina = 0;
				break;
			case resultPotency <= 3:
				buffStamina = 0.2;
				break;
			default:
				resultPotency = Math.floor((resultPotency - 4) / 2);
				buffStamina = (0.4 + resultPotency * 0.2).toFixed(1);
				break;
		}
	}

	return buffStamina;
};

const getFriendlyDuration = (duration) => {
	let minutes = Math.floor(duration / 60);
	let seconds = ('0' + (duration % 60)).slice(-2);
	let friendlyDuration = minutes + ':' + seconds;
	return friendlyDuration;
};

export { createRecipe };
