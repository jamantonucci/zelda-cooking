import './RecipeInput.sass';

export default function RecipeInput({ recipe, setRecipe }) {
	const handleClearIngredients = () => {
		setRecipe([]);
	};

	const handleRemoveIngredient = (index) => {
		let newRecipe = [...recipe];
		newRecipe.splice(index, 1);
		setRecipe(newRecipe);
	};

	return (
		<div className='input-div'>
			<div className='card-header'>
				<h2>Recipe Input</h2>
			</div>

			{recipe.map((ingredient, index) => (
				<div key={index}>
					{ingredient.type}
					<button onClick={() => handleRemoveIngredient(index)}>x</button>
				</div>
			))}
			<button onClick={handleClearIngredients}>Clear</button>
		</div>
	);
}
