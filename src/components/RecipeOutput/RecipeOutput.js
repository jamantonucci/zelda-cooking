import './RecipeOutput.sass';
import { cook } from '../../calc';
import { TiHeartHalfOutline, TiHeartFullOutline } from 'react-icons/ti';
import heartIcon from '../../data/assets/ui-icons/Heart.svg';
import halfHeartIcon from '../../data/assets/ui-icons/Heart Half.svg';
import { FiClock } from 'react-icons/fi';

export default function RecipeOutput({ recipe }) {
	let recipeOutput = cook(recipe);
	let buff = recipeOutput.buff;
	let effectOutput = '';
	let hearts = [];
	let buffHearts = [];
	let buffIcons = [];
	let wheelIcons = [];

	if (buff.effect === 'ExtraHearts') {
		hearts.push(
			<span>
				<img src={heartIcon} className='ui-icon' />
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

		{
			for (let i = 1; i <= hearts; i++) {
				heartIcons.push(<img src={heartIcon} className='ui-icon' />);
			}

			if (hearts % 1 !== 0) {
				heartIcons.push(<img src={halfHeartIcon} className='ui-icon' />);
			}
		}

		return heartIcons;
	}

	function convertBuffStrengthToIcons(strength) {
		const buffIcons = [];

		{
			for (let i = 1; i <= strength; i++) {
				buffIcons.push(<img className='ui-icon' src={buff.icon} />);
			}
		}

		return buffIcons;
	}

	function convertStaminaToWheels(wheels) {
		const wheelIcons = [];

		for (let i = 1; i <= wheels; i++) {
			wheelIcons.push(<img src={buff.icon} className='ui-icon' />);
		}

		wheels = (wheels % 1).toFixed(1);

		if (wheels > 0) {
			wheels = (wheels / 0.2 - 1).toFixed(0);
			wheelIcons.push(<img src={buff.icons[wheels]} className='ui-icon' />);
		}

		return wheelIcons;
	}

	function convertBuffHeartsToIcons(hearts) {
		const heartIcons = [];

		for (let i = 1; i <= hearts; i++) {
			heartIcons.push(<img src={buff.icon} className='ui-icon' />);
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
							{buffIcons} {wheelIcons} {buff.displayName}
						</div>
						<div className='effect-duration-div'>
							<FiClock />
							{recipeOutput.buffDuration}
						</div>
					</>
				)}
				{buff.effectType !== 'duration' && <div>{buffIcons}{' '}{buff.displayName}</div>}
			</div>
		</div>
	);
}
