
let norm = 3;
let count = 0;


//create arr
function create_arr(n) {
    count = 0;
    return Array.from(Array(n ** 2).keys());
}
//mix arr
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5)
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

//size \
let sizes = document.querySelectorAll('.item-size');
console.log(sizes);


for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener('click', function () {
        // console.log(sizes[i].classList[1]);
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

let container = document.createElement('div');
let counter = document.createElement('div');
console.log(norm + " hi switch norm");

starts.addEventListener('click', function (e) {
    allSeconds = 0;
    startTimer();
    count = 0;
    container.className = "game-block";
    container.classList.add(addcl(norm));
    itog = create_arr(norm);
    //itoger
    itog.splice(0, 1);
    itog.push(0);
    itogger = nrr(itog);

    random_arr = nrr(shuffle(itog));
    container.innerHTML = bloki(random_arr);
    // counter.innerHTML = "move: " + 0;

    counter.innerHTML = ` Move: ${count}, time: ${minV}: ${secV}`
    document.body.append(counter);
    document.body.append(container);

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
    }

    container.innerHTML = bloki(ar);
    counter.innerHTML = ` Move: ${count}, time: ${minV}: ${secV}`
    document.body.append(counter);
    document.body.append(container);

    //win
    if (ar.join("") == itogger.join("")) {
        let z = document.createElement('div')
        z.innerHTML = "YOU WIN!!!!!!";
        z.className = "win";
        document.body.append(z);
        container.classList.add('block');
        document.body.append(container);
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

btn_stop.addEventListener('click', function () {
    // clearTimeout(timeer);
    // timer.innerHTML += " stop";
    // stopTimer();

    stopTimer();
})


//time
let allSeconds = 0;
let minV = 0;
let secV = 0;
var timerInterval;
function startTimer() {
    stopTimer();
    timerInterval = setInterval(function () {
        allSeconds += 1;
        minV = Math.floor(allSeconds / 60);
        secV = allSeconds % 60;
        secV = secV < 10 ? "0" + secV.toString() : secV;
        minV = minV < 10 ? "0" + minV.toString() : minV;
        counter.innerHTML = ` Move: ${count}, time: ${minV}: ${secV}`
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}
/*
str_btn.addEventListener('click', function () {
    startTimer();
});
stop_btn.addEventListener('click', function () {
    stopTimer();
})
/*
let i = 0;
function func(i) {
    timer.innerHTML = "time: " + i;
}
let timeer = setTimeout(function run() {
    func(i);
    i++;
    setTimeout(run, 1000)
}, 1000)

*/



