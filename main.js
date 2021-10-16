const $arenas = document.querySelector('.arenas');
const $buttonFight = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword'],
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

const player2 = {
    player: 2,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Axe'],
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

function createElement (tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer (playerObj) {
    const $player = createElement('div', 'player'+playerObj.player);
    const $progressbar =createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $img.src = playerObj.img;
    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

function changeHp(player){
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randomizerHp();
    player.hp = player.hp < 0 ? 0 : player.hp;
    $playerLife.style.width = player.hp + '%';
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$buttonFight.addEventListener('click', function(){
    changeHp(player1);
    changeHp(player2);

    if (player1.hp == 0 && player2.hp == 0) {
        $buttonFight.disabled = false;
        $arenas.appendChild(playerWin('All'));
    } else {
        if (player1.hp == 0 || player2.hp == 0) {
            $buttonFight.disabled = (player1.hp == 0 || player2.hp == 0);
            $arenas.appendChild(playerWin(player1.hp > player2.hp ? player1.name : player2.name));
        }
    }
});

function playerWin (name){
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' win';

    return $winTitle;
}

function playerLose (name){
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';

    return $loseTitle;
}

function randomizerHp (){
    const hp = Math.ceil(Math.random()*20);

    return hp;
}