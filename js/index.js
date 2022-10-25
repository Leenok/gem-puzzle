let count = 0;
let norm = 3;
let res = ["3*3, move 5, time 02:15", "5*5, move 84, time 09:15"];
let allSeconds = 0;
let minV = 0;
let secV = 0;
var timerInterval;

//create arr
function create_arr(n) {
    count = 0;
    let y = Array.from(Array(n ** 2).keys());
    y.splice(0, 1);
    y.push(0);
    return y;
}
//mix arr
function shuffle(arr) {
    // return arr;
    let z = arr.sort(() => Math.random() - 0.5);
    let y = z.indexOf(0);
    // console.log(y);
    z[y] = z[z.length - 1];
    z[z.length - 1] = 0;
    return z;
}
// del na mini arr
function nrr(arr) {
    let y = [];
    let s = Math.sqrt(arr.length);
    for (let i = 0; i < arr.length; i += s) {
        y.push(arr.slice(i, i + s));
    }
    return y;
}

//write arr in html
function bloki(x) {
    let z = "";
    let d = "<div class='item-block'>";
    let dz = "</div>";
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[i].length; j++) {
            if (x[i][j] == 0) {
                z += "<div class='empty-block'> </div>";
            } else {
                z += d + x[i][j] + dz;
            }
        }
    }
    return z;
}

//size 
let sizes = document.querySelectorAll('.item-size');
// choose size
for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener('click', function () {
        norm = sizes[i].classList[1];
        console.log(norm);
    })
}

///////////////////////////START!!!!
let starts = document.querySelector('.start');

//itog massiv
let itog, random_arr, itogger;
function addcl(n) {
    if (n == 3) {
        return 'grid-three';
    }
    if (n == 4) {
        return 'grid-four';
    }
    if (n == 5) {
        return 'grid-five';
    }
    if (n == 6) {
        return 'grid-six';
    }
    if (n == 7) {
        return 'grid-seven';
    }
    if (n == 8) {
        return 'grid-eight';
    }
}
let win_block = document.createElement('div');
win_block.classList.add('win');
win_block.classList.add('block');
let container = document.createElement('div');
let counter = document.createElement('div');
let size_name = document.createElement('div');

size_name.classList.add('center');
counter.classList.add('center');
container.classList.add('game-block');
container.classList.add('center');
document.body.append(win_block);
document.body.append(counter);
document.body.append(container);
document.body.append(size_name);


starts.addEventListener('click', function (e) {
    resetTimer();
    startTimer();
    win_block.classList.add('block');
    count = 0;
    container.classList = "game-block center " + addcl(norm);

    itog = create_arr(norm);
    itogger = nrr(itog);
    random_arr = nrr(shuffle(itog));
    container.innerHTML = bloki(random_arr);
    size_name.innerHTML = `Size : ${norm} * ${norm}`;

    counter.innerHTML = `Move: ${count}, time: ${minV}: ${secV}`;

    counter.append();
    container.append();
    size_name.append();

})

//MOVE items

function moveItem(n, ar) {

    let razm = ar.length;
    let coord_zer = [];
    let coord_ch = []
    for (let i = 0; i < razm; i++) {
        let m = ar[i].indexOf(+n);
        let z = ar[i].indexOf(0);
        if (m != -1) {
            coord_ch.push(i);
            coord_ch.push(m);
        }
        if (z != -1) {
            coord_zer.push(i);
            coord_zer.push(z);
        }
    }


    if (+check(coord_ch, coord_zer) < 5) {
        ar[coord_ch[0]][coord_ch[1]] = 0;
        ar[coord_zer[0]][coord_zer[1]] = +n;
        count++;
        document.getElementById('sound').play();

    }

    container.innerHTML = bloki(ar);
    counter.innerHTML = ` Move: ${count}, time: ${minV}: ${secV}`
    counter.append();
    container.append();

    //win

    if (ar.join("") == itogger.join("")) {
        stopTimer();
        win_block.innerHTML = `Ура! Вы решили головоломку за  ${minV}: ${secV} и ${count} ходов!`;
        win_block.classList.remove("block");
        res.push(`size: ${norm}, move:${count}, time: ${minV}: ${secV}`);
    }
    return ar;
}

function check(a, z) {
    if (a[0] == z[0]) {
        if (a[1] + 1 == z[1]) {
            return '1';
        }
        if (a[1] - 1 == z[1]) {
            return '2';
        }
    }
    if (a[1] == z[1]) {
        if (a[0] + 1 == z[0]) {
            return '3';

        }
        if (a[0] - 1 == z[0]) {
            return '4';
        }
    }
    return '5';
}

container.addEventListener('click', function (e) {
    let ch = e.target.innerHTML;
    random_arr = moveItem(ch, random_arr);

})
//stop
let blok_grey = document.createElement('div');
blok_grey.classList.add("block-grey");
let btn_stop = document.querySelector('.stop');
let box_btn = document.querySelector('.button-box');

btn_stop.addEventListener('click', function () {
    let z = btn_stop.innerHTML;
    if (z == 'Stop') {
        pauseTimer(allSeconds);
        btn_stop.innerHTML = "Run ";
        btn_stop.append();
        container.classList.add('block');
        i = 1;
    }
    if (z == "Run ") {
        startTimer();
        btn_stop.innerHTML = "Stop";
        btn_stop.append();
        container.classList.remove('block');
    }

})

function startTimer() {
    // stopTimer();
    timerInterval = setInterval(function () {
        allSeconds += 1;
        minV = Math.floor(allSeconds / 60);
        secV = allSeconds % 60;
        secV = secV < 10 ? "0" + secV.toString() : secV;
        minV = minV < 10 ? "0" + minV.toString() : minV;
        counter.innerHTML = ` Move: ${count}, time: ${minV}: ${secV}`;
    }, 1000);
}
function pauseTimer(sec) {
    allSeconds = sec;
    stopTimer();
    // startTimer();
}
function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    allSeconds = 0;
    counter.innerHTML = ` Move: ${count}, time: 00: 00`;
}

//result 
let btn_result = document.querySelector('.res');
let block_result = document.createElement('div');
block_result.classList.add('block');
document.body.append(block_result);

btn_result.addEventListener('click', function () {
    block_result.innerHTML = writeResults(res);
    console.log(writeResults(res));
    block_result.classList.toggle('block');
    block_result.append();
})


function writeResults(arr) {
    let z = '';
    for (let i in arr) {
        z += `<p>${i}) size ${norm}*${norm}, ${arr[i]}</p>`;
    }
    return z;
}