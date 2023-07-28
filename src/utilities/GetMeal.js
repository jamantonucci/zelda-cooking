import { meals } from '../data/meals';

export default function getMeal(recipe) {
	let possibleMatches = [];
	let perfectMatch = undefined;

	// Outer loop - per meal
	for (let i = 0; i < meals.length; i++) {
		let InputIng = [...recipe];
		let ingredientsToFind = meals[i].ingredients.length;

		// Inner loop - per meal ingredient
		for (let j = 0; j < meals[i].ingredients.length; j++) {	
			let found = false;

			// Inner inner loop - per input ingredient
			for (let k = 0; k < InputIng.length; k++) {
				if (
					InputIng[k].type === meals[i].ingredients[j] ||
					InputIng[k].materialCategory === meals[i].ingredients[j] ||
					InputIng[k].tags.includes(meals[i].ingredients[j])
				) {
					found = true;
					let idToRemove = InputIng[k].id;
					InputIng = InputIng.filter((ing) => ing.id !== idToRemove);
					ingredientsToFind--;
					break;
				}
			} // End of inner-inner (input ingredient) loop

			if (!found) {
				break;
			}

		} // End of inner (meal ingredient) loop

		if (ingredientsToFind === 0) {
			possibleMatches.push(meals[i]);

			if (InputIng.length === 0) {
				perfectMatch = meals[i];
			}
		}

	} // End of outer (meals) loop


	if (perfectMatch) {
		return perfectMatch;
	} else if (possibleMatches.length > 0) {
		let betterMatches = findBestFit(possibleMatches);
		return betterMatches[betterMatches.length - 1];
	} else {
		return meals[145];
	}
}

function findBestFit(possibleMatches) {
	const betterMatches = [];
	const maxIngredients = Math.max(...possibleMatches.map(meal => meal.ingredients.length));

	possibleMatches.map(meal => {
		if (meal.ingredients.length === maxIngredients) {
			betterMatches.push(meal);
		}
	})

	betterMatches.sort((a,b) => a.priority - b.priority);
	return betterMatches;
}