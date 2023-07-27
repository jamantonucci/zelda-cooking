import { effects } from '../data/effects';
import getMeal from './GetMeal';

/**
 * Takes a recipe and outputs an object with the hearts and
 * 	buff information for that recipe.
 * @param {array} recipe An array of ingredients
 * @returns {object} 	Contains information about the recipe
 */
const cook = (recipe) => {
	let hearts = getHearts(recipe);
	let resultEffect = getBuff(recipe);
	let meal = getMeal(recipe);

	let recipeOutput = {
		hearts: hearts,
		buff: resultEffect,
		buffStrength: null,
		buffDuration: null,
		buffHearts: '',
		buffStamina: '',
		errors: [],
		meal: meal
	};

	switch (resultEffect.effectType) {
		case 'duration':
			let buffStrength = getBuffStrength(recipe, resultEffect);
			let buffDuration = getBuffDuration(recipe, resultEffect);
			recipeOutput.buffStrength = buffStrength;
			recipeOutput.buffDuration = getFriendlyDuration(buffDuration);
			return recipeOutput;

		case 'hearts':
			let buffHearts = getBuffHearts(recipe);
			if (resultEffect.effect === 'ExtraHearts') {
				recipeOutput.hearts = 'Full Recovery';
			}
			recipeOutput.buffHearts = buffHearts;
			return recipeOutput;

		case 'stamina':
			let buffStamina = getBuffStamina(recipe, resultEffect);
			recipeOutput.buffStamina = buffStamina;
			return recipeOutput;

		case 'error':
			recipeOutput.errors.push(resultEffect.errorText);
			return recipeOutput;

		default:
			return recipeOutput;
	}
};

/**
 * Calculates the number of hearts a recipe will restore.
 * @param {array} recipe An array of ingredients
 * @returns {Number} The number of hearts restored.
 */
const getHearts = (recipe) => {
	let resultHearts = 0;

	recipe.forEach((ingredient) => {
		resultHearts = resultHearts + ingredient.hearts;
	});

	// Cooked meals heal the base recovery hearts of the item * 2
	resultHearts = resultHearts * 2;

	return resultHearts;
};

/**
 * Determines the buff caused by the recipe, if any
 * @param {array} recipe  An array of ingredients
 * @returns The effect of the recipe if there is one; else null
 */
const getBuff = (recipe) => {
	let ingredientEffects = new Set();
	let resultEffect = null;

	recipe.forEach((ingredient) => {
		if (ingredient.effect != null) {
			ingredientEffects.add(ingredient.effect);
		}
	});

	if (ingredientEffects.size === 0) {
		resultEffect = null;
	} else if (ingredientEffects.size > 1) {
		resultEffect = 'error';
	} else {
		resultEffect = [...ingredientEffects][0];
	}

	let effect = effects.find((effect) => effect.effect === resultEffect);

	return effect || null;
};

/**
 * Takes a recipe and a buff and determines the strength of the effect.
 * @param {array} recipe An array of ingredients
 * @param {object} buff An object matching the buff
 * @returns {Number} The strength of the buff.
 */
const getBuffStrength = (recipe, buff) => {
	let resultPotency = 0;
	let effectStrength = '';

	recipe.forEach((ingredient) => {
		resultPotency = resultPotency + ingredient.potency;
	});

	let midThreshold = buff.midThreshold;
	let highThreshold = buff.highThreshold;

	if (resultPotency >= highThreshold) {
		effectStrength = 3;
	} else if (resultPotency >= midThreshold) {
		effectStrength = 2;
	} else {
		effectStrength = 1;
	}

	return effectStrength;
};

/**
 * Calculates the duration of an effect (in seconds)
 * @param {array} recipe An array of ingredients
 * @param {object} buff An object matching the buff
 * @returns {Number} The duration of the effect, in seconds.
 */
const getBuffDuration = (recipe, buff) => {
	let boostIngredients = new Set();
	let resultDuration = 0;
	let dragonHornIds = [181, 182, 183, 184];
	// Dragon horns always set duration to 30 minutes.

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

	recipe.forEach((ingredient) => {
		if (dragonHornIds.includes(ingredient.id)) {
			resultDuration = 1800;
		}
	});

	return resultDuration;
};

/**
 * Accepts a recipe and returns the number of "buff hearts", where "buff
 * hearts" can be extra hearts or gloom recovery.
 * @param {array} recipe An array of ingredients
 * @returns {Number} The number of hearts for the buff
 */
const getBuffHearts = (recipe) => {
	let resultPotency = 0;

	recipe.forEach((ingredient) => {
		resultPotency = resultPotency + ingredient.potency;
	});

	let buffHearts = resultPotency / 4;

	return buffHearts;
};

/**
 * Accepts a recipe and an object and returns the amount of stamina healed
 * @param {array} recipe An array of ingredients
 * @param {Object} buff The type of buff - should be either ExtraStamina or StaminaRecovery
 * @returns {Number} The number of stamina wheels restored
 */
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
		switch (true) {
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

/**
 * Accepts a number in seconds and outputs it in mm:ss format.
 * @param {Number} duration The duration of a buff, in seconds
 * @returns {String} The duration formatted in m:ss (eg. 2:40)
 */
const getFriendlyDuration = (duration) => {
	let minutes = Math.floor(duration / 60);
	let seconds = ('0' + (duration % 60)).slice(-2);
	let friendlyDuration = minutes + ':' + seconds;
	return friendlyDuration;
};

export { cook };
