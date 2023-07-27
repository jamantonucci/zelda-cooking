import attackUp from '../data/assets/ui-icons/Attack Up.svg';
import glow from '../data/assets/ui-icons/Boost Glow.svg';
import speedUp from '../data/assets/ui-icons/Boost Speed Up.svg';
import stealthUp from '../data/assets/ui-icons/Boost Stealth Up.svg';
import swimSpeedUp from '../data/assets/ui-icons/Boost Swim Speed Up.svg';
import defenseUp from '../data/assets/ui-icons/Defense Up.svg';
import coldWeatherAttack from '../data/assets/ui-icons/Elemental Cold ATK Up.svg';
import hotWeatherAttack from '../data/assets/ui-icons/Elemental Heat ATK Up.svg';
import stormyWeatherAttack from '../data/assets/ui-icons/Elemental Lighting ATK Up.svg';
import coldResist from '../data/assets/ui-icons/Resist Cold Resist.svg';
import fireResist from '../data/assets/ui-icons/Resist Flame Guard.svg';
import heatResist from '../data/assets/ui-icons/Resist Fire Resist.svg';
import gloomResist from '../data/assets/ui-icons/Resist Gloom Resist.svg';
import shockResist from '../data/assets/ui-icons/Resist Lighting Resist.svg';
import slipResist from '../data/assets/ui-icons/Resist Slip Resist.svg';
import extraHearts from '../data/assets/ui-icons/Heart Extra.svg';
import gloomHearts from '../data/assets/ui-icons/Gloom Repair.svg';
import staminaRecovery from '../data/assets/ui-icons/Stamina.svg';
import extraStamina from '../data/assets/ui-icons/Stamina Extra.svg';
import stamina02 from '../data/assets/ui-icons/stamina 0.2.png';
import stamina04 from '../data/assets/ui-icons/stamina 0.4.png';
import stamina06 from '../data/assets/ui-icons/stamina 0.6.png';
import stamina08 from '../data/assets/ui-icons/stamina 0.8.png';
import estamina02 from '../data/assets/ui-icons/e stamina 0.2.png';
import estamina04 from '../data/assets/ui-icons/e stamina 0.4.png';
import estamina06 from '../data/assets/ui-icons/e stamina 0.6.png';
import estamina08 from '../data/assets/ui-icons/e stamina 0.8.png';



const effects = [
  {
    effect: null,
    effectType: null
  },
  {
    effect: 'error',
    effectType: 'error',
    errorText: 'Ingredients with different effects are cancelling each other out.'
  },
  {
    effect: 'AttackUp',
    displayName: 'Attack Up',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 20,
    icon: attackUp,
    prefix: 'Mighty'
  },
  {
    effect: 'ColdResist',
    displayName: 'Cold Resistance',
    effectType: 'duration', 
    midThreshold: 6,
    highThreshold: 99,
    duration: 120,
    icon: coldResist,
    prefix: 'Spicy'
  },
  {
    effect: 'DefenseUp',
    displayName: 'Defense Up',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 20,
    icon: defenseUp,
    prefix: 'Tough'
  },
  {
    effect: 'Fireproof',
    displayName: 'Fireproof',
    effectType: 'duration',
    midThreshold: 7,
    highThreshold: 99,
    duration: 120,
    icon: fireResist,
    prefix: 'Fireproof'
  },
  {
    effect: 'HeatResist',
    displayName: 'Heat Resistance',
    effectType: 'duration',
    midThreshold: 6,
    highThreshold: 99,
    duration: 120,
    icon: heatResist,
    prefix: 'Chilly'
  },
  {
    effect: 'ShockResist',
    displayName: 'Shock Resistance',
    effectType: 'duration',
    midThreshold: 4,
    highThreshold: 6,
    duration: 120,
    icon: shockResist,
    prefix: 'Electro'
  },
  {
    effect: 'SpeedUp',
    displayName: 'Speed Up',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 30,
    icon: speedUp,
    prefix: 'Hasty'
  },
  {
    effect: 'StealthUp',
    displayName: 'Stealth Up',
    effectType: 'duration',
    midThreshold: 6,
    highThreshold: 9,
    duration: 90,
    icon: stealthUp,
    prefix: 'Sneaky'
  },
  {
    effect: 'ExtraHearts',
    displayName: 'Extra Hearts',
    effectType: 'hearts',
    icon: extraHearts,
    prefix: 'Hearty'
  },
  {
    effect: 'GloomRecovery',
    displayName: 'Gloom Recovery',
    effectType: 'hearts',
    icon: gloomHearts,
    prefix: 'Sunny'
  },
  {
    effect: 'StaminaRecovery',
    displayName: 'Stamina Recovery',
    effectType: 'stamina',
    icon: staminaRecovery,
    icons: [stamina02, stamina04, stamina06, stamina08],
    prefix: 'Energizing'
  },
  {
    effect: 'ExtraStamina',
    displayName: 'Extra Stamina',
    effectType: 'stamina',
    icon: extraStamina,
    icons: [estamina02, estamina04, estamina06, estamina08],
    prefix: 'Enduring'
  },
  {
    effect: 'HotWeatherAttack',
    displayName: 'Hot Weather Attack Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 30,
    icon: hotWeatherAttack,
    prefix: 'Scorching'
  },
  {
    effect: 'ColdWeatherAttack',
    displayName: 'Cold Weather Attack Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 30,
    icon: coldWeatherAttack,
    prefix: 'Biting'
  },
  {
    effect: 'StormyWeatherAttack',
    displayName: 'Stormy Weather Attack Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 30,
    icon: stormyWeatherAttack,
    prefix: 'Stormy'
  },
  {
    effect: 'SwimSpeedUp',
    displayName: 'Swim Speed Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 90,
    icon: swimSpeedUp,
    prefix: 'Rapid'
  },
  {
    effect: 'Glow',
    displayName: 'Glow',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 90,
    icon: glow,
    prefix: 'Bright'
  },
  {
    effect: 'GloomResist',
    displayName: 'Gloom Resistance',
    effectType: 'duration',
    midThreshold: 2,
    highThreshold: 3,
    duration: 120,
    icon: gloomResist,
    prefix: 'Warding'
  },
  {
    effect: 'SlipResist',
    displayName: 'Slip Resistance',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 90,
    icon: slipResist,
    prefix: 'Sticky'
  }


];

export { effects };