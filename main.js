const scorpion = {
    name: 'SCORPION',
    hp: '100%',
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Knife'],
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

const subzero = {
    name: 'SUB-ZERO',
    hp: '100%',
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Axe', 'Ice'],
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

const player1 = 'player1';
const player2 = 'player2';

function createPlayer(playerClass, player) {
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $img = document.createElement('img');
    const arenas = document.querySelector('.arenas');

    $img.src = player.img;

    $progressbar.classList.add('progressbar');
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.classList.add('character');
    $character.appendChild($img);
    $life.classList.add('life');
    $life.style.width = player.hp;

    $name.classList.add('name');
    $name.innerText = player.name;

    $player.classList.add(playerClass);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    arenas.appendChild($player);

}

createPlayer(player1, scorpion);
createPlayer(player2, subzero);