import './RecipeOutput.sass';
import { cook } from '../../calc';
import { TiHeartHalfOutline, TiHeartFullOutline } from 'react-icons/ti';
import { CgChevronDoubleUp } from 'react-icons/cg';
import { FiClock } from 'react-icons/fi';

export default function RecipeOutput({ recipe }) {
	let recipeOutput = cook(recipe);
	let buff = recipeOutput.buff;
	let effectOutput = '';
	let hearts = [];
	let buffHearts = [];

	if (buff.effect === 'ExtraHearts') {
		hearts.push(
			<span>
				<TiHeartFullOutline />
				Full Recovery
			</span>
		);
		buffHearts = convertHeartsToIcons(recipeOutput.buffHearts);
	} else hearts = convertHeartsToIcons(recipeOutput.hearts);

	if (recipeOutput.buff.effect === null) {
		effectOutput = '';
	} else if (recipeOutput.buffHearts !== '') {
		effectOutput = recipeOutput.buffHearts + ' ' + recipeOutput.buff.displayName;
	} else if (recipeOutput.buffStamina !== '') {
		effectOutput = recipeOutput.buffStamina + ' wheels of ' + recipeOutput.buff.displayName;
	}

	function convertHeartsToIcons(hearts) {
		const heartIcons = [];

		if (recipeOutput.buffHearts !== '') {
			heartIcons.push();
		} else {
			for (let i = 1; i <= hearts; i++) {
				heartIcons.push(<TiHeartFullOutline />);
			}

			if (hearts % 1 !== 0) {
				heartIcons.push(<TiHeartHalfOutline />);
			}
		}

		return heartIcons;
	}

	return (
		<div className='output-div'>
			<div className='card-header'>
				<h2>Effect</h2>
			</div>

			<div className='effects-div'>
				<div className='hearts-div'>{hearts}</div>
				{buff.effectType === 'duration' && (
					<>
						<div className='effect-type-div'>
							<CgChevronDoubleUp />
							{buff.displayName}
						</div>
						<div className='effect-duration-div'>
							<FiClock />
							{recipeOutput.buffDuration}
						</div>
					</>
				)}
				{(recipeOutput.buffHearts !== '' || recipeOutput.buffStamina !== '') && <div>{effectOutput}</div>}
			</div>
		</div>
	);
}
