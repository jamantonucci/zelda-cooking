import { effects } from '../data/effects';
import getMeal from './GetMeal';
import { meals } from '../data/meals';
import { elixirs } from '../data/elixirs';

/**
 * Takes a recipe and outputs an object with the hearts and
 * 	buff information for that recipe.
 * @param {array} recipe An array of ingredients
 * @returns {object} 	Contains information about the recipe
 */
const cook = (recipe) => {

	// 1. Check if rock hard food
	if (isRockHard(recipe).rockHard === true) {
		let recipeOutput = {
			hearts: 0.25,
			buff: effects[0],
			buffStrength: null,
			buffDuration: null,
			buffHearts: '',
			buffStamina: '',
			errors: isRockHard(recipe).errors,
			meal: meals[146],
		};

		return recipeOutput;
	}

	// 2. Check if dubious food
	if (isDubious(recipe).dubious === true) {
		let recipeOutput = {
			hearts: 2,
			buff: effects[0],
			buffStrength: null,
			buffDuration: null,
			buffHearts: '',
			buffStamina: '',
			errors: isDubious(recipe).errors,
			meal: meals[145],
		}

		return recipeOutput;
	}

	// 3. If not rock hard or dubious, find hearts restored and buff
	let hearts = getHearts(recipe);
	let resultEffect = getBuff(recipe);

	let recipeOutput = {
		hearts: hearts,
		buff: resultEffect,
		buffStrength: null,
		buffDuration: null,
		buffHearts: '',
		buffStamina: '',
		errors: [],
	};

	// 4: Check if result is an elixir
	let hasFood = recipe.some((ingredient) => ingredient.id < 92);
	let hasMonsterParts = recipe.some((ingredient) => ingredient.tags.includes('CookEnemy'));
	let hasCritters = recipe.some((ingredient) => ingredient.tags.includes('CookInsect'));

	if (!hasFood && hasMonsterParts && hasCritters) {
		recipeOutput.meal = elixirs.find(elixir => elixir.effect === resultEffect);
	} else {
		recipeOutput.meal = getMeal(recipe);
	}

	if (recipeOutput.meal.id === 145 && recipe.length > 0) {
		recipeOutput.hearts = 1;
		recipeOutput.buff = effects[0];
		recipeOutput.errors.push('Invalid recipe. Try adding more ingredients!')
	}

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

const isDubious = (recipe) => {
	let dubious = false;
	let errors = [];

	let hasFood = recipe.some((ingredient) => ingredient.id < 92);
	let hasMonsterParts = recipe.some((ingredient) => ingredient.tags.includes('CookEnemy'));
	let hasCritters = recipe.some((ingredient) => ingredient.tags.includes('CookInsect'));

	// Food with monster parts or critters, but not both
	if (hasFood) {
		if ((hasMonsterParts && !hasCritters) || (!hasMonsterParts && hasCritters)) {
			dubious = true;
			errors.push('Monster parts and critters must be used together.');
		}
	}

	// Monster parts or critters on their own
	if ((hasMonsterParts && !hasFood && !hasCritters) || (hasCritters && !hasFood && !hasMonsterParts)) {
		dubious = true;
		errors.push('Monster parts must be cooked with critters.');
	}

	// Any recipe that would produce an elixir without an effect
	if (hasMonsterParts && hasCritters) {
		let buff = getBuff(recipe);
		if (buff.effect === 'error') {
			dubious = true;
			errors.push('Ingredients with different effects are cancelling each other out.')
		}
	}

	return { dubious, errors };
};

/**
 * Determines if a recipe will output Rock-Hard Food.
 * Food is Rock-Hard if it contains ore, wood, or ONLY rock salt.
 * @param {array} recipe An array of ingredients
 * @returns {Boolean, Array} Whether the food is Rock Hard, and if so, a message about it
 */
const isRockHard = (recipe) => {
	let rockHard = false;
	let errors = [];

	if (recipe.some((ingredient) => ingredient.materialCategory === 'Ore')) {
		rockHard = true;
		errors.push('Meals containing wood or ore always make Rock-Hard Food.');
	} else if (recipe.some((ingredient) => ingredient.materialCategory === 'FireWoodBundle')) {
		rockHard = true;
		errors.push('Meals containing wood or ore always make Rock-Hard Food.');
	} else if (recipe.length > 0 && recipe.filter((ingredient) => ingredient.type !== 'Rock Salt').length === 0) {
		rockHard = true;
		errors.push('Cooking with only Rock Salt makes Rock-Hard Food.');
	}

	return { rockHard, errors };
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
