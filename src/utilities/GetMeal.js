import { meals } from '../data/meals';

export default function getMeal(recipe) {
	let possibleMatches = [];
	let MealIng = [];
	let InputIng = [];
	let perfectMatch = undefined;

	console.log('===== NEW =====');

	// 1. Check for rock hard food
	// TODO: All rock salt should also give rock hard food?
	for (let i = 0; i < recipe.length; i++) {
		if (recipe[i].tags.includes('CookOre')) {
			return meals[146]; // 146 = Rock Hard Food
		}
	}

	// Outer loop - per meal
	for (let i = 0; i < meals.length; i++) {
		let MealIng = [...meals[i].ingredients];
		let InputIng = [...recipe];

		// Inner loop - per meal ingredient
		for (let j = 0; j < meals[i].ingredients.length; j++) {
			let found = false;
			let ingredientsToFind = meals[i].ingredients.length;

			// Inner inner loop - per input ingredient
			for (let k = 0; k < InputIng.length; k++) {
				// console.log(`i = ${i} / j = ${j} / k = ${k}`);

				if (
					InputIng[k].type === meals[i].ingredients[j] || 
					InputIng[k].materialCategory === meals[i].ingredients[j] ||
					InputIng[k].tags.includes(meals[i].ingredients[j])
					) {
					// console.log(`${InputIng[k].type} IS ${meals[i].ingredients[j]}!`);
					MealIng.shift();
					let idToRemove = InputIng[k].id;
					InputIng = InputIng.filter((ing) => ing.id !== idToRemove);
					found = true;
					ingredientsToFind--;
					break;
				} else {
					found = false;
				}
			} // End of inner-inner (input ingredient) loop

			if (found) {
				// console.log(`Found ${meals[i].ingredients[j]}!`)
				// console.log(`Therefore MIGHT BE ${meals[i].type}!`)
			} else {
				break;
			}

			if (ingredientsToFind === 0) {
				// console.log(`Match! ${meals[i].type}`);
				possibleMatches.push(meals[i]);
			}
		} // End of inner (meal ingredient) loop

		// console.log(`InputIng.length === ${InputIng.length} / MealIng.length === ${MealIng.length}`);
		if (InputIng.length === 0 && MealIng.length === 0) {
			console.log(`Perfect Match: ${meals[i].type}`);
			perfectMatch = meals[i];
		} else {
		}

		// if (possibleMatches.length > 0) {
		// 	console.log(`Possible Matches:`);
		// 	console.log(possibleMatches);
		// } else {
		// 	console.log('0 matches!');
		// }
	} // End of outer (meals) loop

	if (perfectMatch) {
		return perfectMatch;
	} else if (possibleMatches.length === 1) {
		return possibleMatches[0];
	} else {
		return meals[0];
	}
}
