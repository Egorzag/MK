const $arenas = document.querySelector('.arenas');
const $buttonFight = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['chain'],
    attack: function (){console.log(this.name + ' Fight');},
    changeHp: changeHp,
    renderHP: renderHP,
    elHP: elHP
};

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['ribbon'],
    attack: function (){console.log(this.name + ' Fight');},
    changeHp: changeHp,
    renderHP: renderHP,
    elHP: elHP
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
$arenas.appendChild(createReloadButton());

const $reloadButton = document.querySelector('.reloadWrap').children[0];

//кнопка сражения
$buttonFight.addEventListener('click', function(){
    player1.changeHp(randomizerHp(20));
    player2.changeHp(randomizerHp(20));

    player1.renderHP();
    player2.renderHP();

    if (player1.hp == 0 && player2.hp == 0) {
        $buttonFight.disabled = true;
        $arenas.appendChild(playerWin());
    } else {
        if (player1.hp == 0 || player2.hp == 0) {
            $buttonFight.disabled = (player1.hp == 0 || player2.hp == 0);
            $arenas.appendChild(playerWin(player1.hp > player2.hp ? player1.name : player2.name));
        }
    }

    if ($buttonFight.disabled) {
        $reloadButton.style.visibility = 'visible';
    }
});

//кнопка перезагрузки
function createReloadButton (){
    const $reloadWrap  = createElement('div','reloadWrap');
    const $reloadBut  = createElement('div','button');

    $reloadBut.innerText = 'Reload';

    $reloadWrap.appendChild($reloadBut);

    $reloadBut .style.visibility = 'hidden';

    return $reloadWrap;
} 

$reloadButton.addEventListener('click', function(){
    window.location.reload();
});

//создаем героев
function createPlayer(hero){
    const $player = createElement('div','player' + hero.player);
    const $progressbar = createElement('div','progressbar');
    const $life = createElement('div','life');
    const $name = createElement('div','name');
    const $character = createElement('div','character');
    const $img  = createElement('img');

    $name.innerText = hero.name;
    $life.style.width = hero.hp + '%';
    $img.src = hero.img;

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);
   
    return $player;
}

function changeHp(countHp){
    this.hp -= countHp;
    this.hp = this.hp < 0 ? 0 : this.hp;
}

function elHP (){
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP(){
    this.elHP().style.width = this.hp + '%';
}

//создание элемента с классом
function createElement (tag, className){
    const $tag = document.createElement(tag);
    if (className){
        $tag.classList.add(className);
    }
    
    return $tag;
}

//игрок победитель
function playerWin (name){
    const $winTitle = createElement('div', 'winTitle');
        if (name) {
            $winTitle.innerText = name + ' win';
        } else
        {
            $winTitle.innerText = 'draw';
        }
    
    return $winTitle;
}

function randomizerHp (numb){
    const hp = Math.ceil(Math.random()*numb);

    return hp;
}