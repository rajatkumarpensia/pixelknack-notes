// console.log("notes file")
showNotes();
//User added note to local storage
let addbtn = document.getElementById('addbtn');
let addtextarea = document.getElementById("addText");




addbtn.addEventListener("click", function () {
    if (addtextarea.value == ""){
        addtextarea.classList.add('border-danger');
    }
    else{
        addtextarea.classList.remove('border-danger');
    let addtext = document.getElementById("addText");
    let noteList = localStorage.getItem("notes");
    // let notesObj;
    if (noteList == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(noteList);
    }
    notesObj.push(addtext.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtext.value = "";
    // console.log(notesObj);

    showNotes();
}
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
    notesObj.forEach(function (element, index) {
        html += `<div class="col-md-4 notecard">
       <div class="card mb-3">
           <div class="card-body">
               <h5 class="card-title">Note ${index + 1}</h5>
               <p class="card-text">${element}</p>
               <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
           </div>
       </div>
   </div>`
    })

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<div class="col-12"><i>Notes not available</i></div>`
    }
}


// delete note

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



let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputval = search.value.toLowerCase();
    // console.log("typed", inputval);


    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        console.log(cardTxt);
    })
})