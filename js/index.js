console.log("hello")
let norm = 4;
let container = document.createElement('div');
let itog = Array.from(Array(norm ** 2).keys());


function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5)
}
let random_arr = nrr(shuffle(itog));
// console.log(random_arr);

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
    //

}


container.className = "game-block";
switch (norm) {
    case 3: container.classList.add('grid-three'); break;
    case 4: container.classList.add('grid-four'); break;
    case 5: container.classList.add('grid-five'); break;
    case 6: container.classList.add('grid-six'); break;
    case 7: container.classList.add('grid-seven'); break;
    case 8: container.classList.add('grid-eight'); break;
}
container.innerHTML = bloki(random_arr);
// console.log(random_arr);
document.body.append(container);

function nrr(arr) {
    let y = [];
    let s = Math.sqrt(arr.length);
    for (let i = 0; i < arr.length; i += s) {
        y.push(arr.slice(i, i + s));
    }
    return y;
}
// console.log(nrr(random_arr));
// let cont = document.getElementsByClassName('item-block');


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
    }

    container.innerHTML = bloki(ar);
    document.body.append(container);
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

window.addEventListener('click', function (e) {
    if (e.path[0].className == 'item-block') {
        console.log(e.path[0].innerHTML);
        let ch = e.path[0].innerHTML;
        console.log(random_arr);
        // console.log(random_arr.indexOf(+ch));
        // console.log(moveItem(ch, random_arr));
        random_arr = moveItem(ch, random_arr);


    }
    //console.log(e.path[0].className);

})
