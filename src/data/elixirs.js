import { effects } from './effects';
import img1 from '../data/assets/elixirs/1.png';
import img2 from '../data/assets/elixirs/2.png';
import img3 from '../data/assets/elixirs/3.png';
import img4 from '../data/assets/elixirs/4.png';
import img5 from '../data/assets/elixirs/5.png';
import img6 from '../data/assets/elixirs/6.png';
import img7 from '../data/assets/elixirs/7.png';
import img8 from '../data/assets/elixirs/8.png';
import img9 from '../data/assets/elixirs/9.png';
import img10 from '../data/assets/elixirs/10.png';
import img11 from '../data/assets/elixirs/11.png';
import img12 from '../data/assets/elixirs/12.png';
import img13 from '../data/assets/elixirs/13.png';
import img14 from '../data/assets/elixirs/14.png';

const images = [];

images.push(null, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14);

function Elixir(id, type, effect) {
	this.id = id;
	this.type = type;
	this.effect = effect;
	this.image = images[id];
}

const elixirs = [];

elixirs.push(new Elixir(1, 'Energizing Elixir', effects[12]));
elixirs.push(new Elixir(2, 'Hasty Elixir', effects[8]));
elixirs.push(new Elixir(3, 'Spicy Elixir', effects[3]));
elixirs.push(new Elixir(4, 'Chilly Elixir', effects[6]));
elixirs.push(new Elixir(5, 'Electro Elixir', effects[7]));
elixirs.push(new Elixir(6, 'Fireproof Elixir', effects[5]));
elixirs.push(new Elixir(7, 'Mighty Elixir', effects[2]));
elixirs.push(new Elixir(8, 'Tough Elixir', effects[4]));
elixirs.push(new Elixir(9, 'Sneaky Elixir', effects[9]));
elixirs.push(new Elixir(10, 'Sticky Elixir', effects[20]));
elixirs.push(new Elixir(11, 'Bright Elixir', effects[18]));
elixirs.push(new Elixir(12, 'Enduring Elixir', effects[13]));
elixirs.push(new Elixir(13, 'Hearty Elixir', effects[10]));
elixirs.push(new Elixir(14, 'Fairy Tonic', effects[0]));

export { elixirs };
