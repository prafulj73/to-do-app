console.log("welcome to apps.js");
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addText = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value ,
        text: addText.value 
    }
    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));// we are doing this becasue we can not add array or any kind of object in local storage value
    addText.value = "";
    addTitle.value = "";
    // console.log(notesobj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element , index) {
        // if(element===""){
        //     alert("that is an empty note! can't add one");
        // }
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title} </h5>
                    <p class="card-text"> ${element.text} </p>
                    <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary"> Delete note </button>
                </div>
            </div> `;
    });
    let notesElm = document.getElementById('notes');
    if ((notesObj.length) != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `nothing to show here! please use Add note first`;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})

