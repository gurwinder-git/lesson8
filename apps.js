console.log("working")
shownotes();

let addtxt = document.getElementById('addtxt');
let addtitle = document.getElementById('addtitle');
let addbtn = document.getElementById('addbtn');

addbtn.addEventListener('click', func);

function func() {
    if (addtxt.value == '' && addtitle.value == '') {
        window.alert('Please Enter you data')
    }
    else {
        let notetitle = addtitle.value;
        let notetxt = addtxt.value;
        let lostitle = localStorage.getItem('titles');
        let los = localStorage.getItem('notes');
        

        if (los == null && lostitle == null) {
            losobj = [];
            lostitleobj = [];
        }
        else {
            losobj = JSON.parse(los);
            lostitleobj = JSON.parse(lostitle);
        }

        losobj.push(notetxt);
        lostitleobj.push(notetitle);
        localStorage.setItem('notes', JSON.stringify(losobj))
        localStorage.setItem('titles', JSON.stringify(lostitleobj))

        addtxt.value = '';
        addtitle.value = '';
        shownotes();
    }
}

function shownotes() {
    let los = localStorage.getItem('notes');
    let lostitle = localStorage.getItem('titles');
    if (los == null && lostitle == null) {
        losobj = [];
        lostitleobj = [];
    }
    else {
        losobj = JSON.parse(los);
        lostitleobj = JSON.parse(lostitle);
    }

    let html = '';
    for (let i = 0; i < losobj.length; i++) {
        html = html + `
        <div class=" mycard card mx-3 my-3" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">${lostitleobj[i]}</h5>
                    <p class="mypera card-text">${losobj[i]}</p>
                <button id="${i}" onclick="deletenote(this.id)"class="btn btn-primary">Delete Note</button>
            </div>
        </div>
    `
    }
    let mynotes = document.getElementById('mynotes');
    if (losobj.length == 0) {
        mynotes.innerHTML = `<h5>you have No note you can add from the above section.</h5>`
    }
    else {
        mynotes.innerHTML = html;
    }

}

function deletenote(index) {
    console.log('iam deleting', index);
    los = localStorage.getItem('notes');
    lostitle = localStorage.getItem('titles');
    losobj = JSON.parse(los);
    lostitleobj = JSON.parse(lostitle);
    losobj.splice(index, 1);
    lostitleobj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(losobj));
    localStorage.setItem('titles', JSON.stringify(lostitleobj));
    shownotes();
}

let search = document.getElementById('searchtxt');
search.addEventListener('input', searchfunc)

function searchfunc() {
    let searchtxt = search.value;
    let cards = document.getElementsByClassName('mycard');
    let mypera = document.getElementsByClassName('mypera');

    // console.log(mypera[0].innerHTML);
    
    for (let i = 0; i < cards.length; i++) {
        if (mypera[i].innerHTML.includes(searchtxt)) {
            cards[i].style.display = "block";
        }
        else {
            cards[i].style.display = "none";
        }
    }
}