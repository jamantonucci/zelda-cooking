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
import extraStamina from '../data/assets/ui-icons/Stamina Plus.svg';
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
    effect: 'AttackUp',
    displayName: 'Attack Up',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 20,
    icon: attackUp,
  },
  {
    effect: 'ColdResist',
    displayName: 'Cold Resistance',
    effectType: 'duration', 
    midThreshold: 6,
    highThreshold: 99,
    duration: 120,
    icon: coldResist
  },
  {
    effect: 'DefenseUp',
    displayName: 'Defense Up',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 20,
    icon: defenseUp
  },
  {
    effect: 'Fireproof',
    displayName: 'Fireproof',
    effectType: 'duration',
    midThreshold: 7,
    highThreshold: 99,
    duration: 120,
    icon: fireResist
  },
  {
    effect: 'HeatResist',
    displayName: 'Heat Resistance',
    effectType: 'duration',
    midThreshold: 6,
    highThreshold: 99,
    duration: 120,
    icon: heatResist
  },
  {
    effect: 'ShockResist',
    displayName: 'Shock Resistance',
    effectType: 'duration',
    midThreshold: 4,
    highThreshold: 6,
    duration: 120,
    icon: shockResist
  },
  {
    effect: 'SpeedUp',
    displayName: 'Speed Up',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 30,
    icon: speedUp
  },
  {
    effect: 'StealthUp',
    displayName: 'Stealth Up',
    effectType: 'duration',
    midThreshold: 6,
    highThreshold: 9,
    duration: 90,
    icon: stealthUp
  },
  {
    effect: 'ExtraHearts',
    displayName: 'Extra Hearts',
    effectType: 'hearts',
    icon: extraHearts
  },
  {
    effect: 'GloomRecovery',
    displayName: 'Gloom Recovery',
    effectType: 'hearts',
    icon: gloomHearts
  },
  {
    effect: 'StaminaRecovery',
    displayName: 'Stamina Recovery',
    effectType: 'stamina',
    icon: staminaRecovery,
    icons: [stamina02, stamina04, stamina06, stamina08]
  },
  {
    effect: 'ExtraStamina',
    displayName: 'Extra Stamina',
    effectType: 'stamina',
    icon: extraStamina,
    icons: [estamina02, estamina04, estamina06, estamina08]
  },
  {
    effect: 'HotWeatherAttack',
    displayName: 'Hot Weather Attack Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 30,
    icon: hotWeatherAttack
  },
  {
    effect: 'ColdWeatherAttack',
    displayName: 'Cold Weather Attack Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 30,
    icon: coldWeatherAttack
  },
  {
    effect: 'StormyWeatherAttack',
    displayName: 'Stormy Weather Attack Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 30,
    icon: stormyWeatherAttack
  },
  {
    effect: 'SwimSpeedUp',
    displayName: 'Swim Speed Up',
    effectType: 'duration',
    midThreshold: 99,
    highThreshold: 99,
    duration: 90,
    icon: swimSpeedUp
  },
  {
    effect: 'Glow',
    displayName: 'Glow',
    effectType: 'duration',
    midThreshold: 5,
    highThreshold: 7,
    duration: 90,
    icon: glow
  },
  {
    effect: 'GloomResist',
    displayName: 'Gloom Resistance',
    effectType: 'duration',
    midThreshold: 2,
    highThreshold: 3,
    duration: 120,
    icon: gloomResist
  },


];

export { effects };