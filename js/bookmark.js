
var bookmarkName = document.getElementById("bookname");
var bookmarkUrl = document.getElementById("url");
// btns
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
// search
var searchInput = document.getElementById("search");



if (localStorage.getItem('bookmark') !== null) {
    bookmarkContainer = JSON.parse(localStorage.getItem('bookmark'));
    displayBookmark(bookmarkContainer);
}


// Add bookmark
var bookmarkContainer = [];
function addBookmark() {
    var bookMark = {
        bookName: bookmarkName.value,
        bookmarkUrl: bookmarkUrl.value
    }

    // if (bookmarkContainer.length === 0) {
    //     bookmarkContainer.push(bookMark);
    //     localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    //     clearInputs();
    //     displayBookmark(bookmarkContainer);
    //     return;
    // } 
   
    // else{
    //     for (var i = 0; i < bookmarkContainer.length; i++) {
    //         if (bookmarkContainer[i].bookName === bookMark.bookName) {
    //             alert("This bookmark name already exists!");
    //             clearInputs();
    //             return;
    //         }
    //     }
    // }
    bookmarkContainer.push(bookMark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    clearInputs();
    displayBookmark(bookmarkContainer)
}
// Display Bookmark
function displayBookmark(arr) {
    var container = ``;
    for (var i = 0; i < arr.length; i++) {
        container += `<tr class="text-center border-top">
                <td class="px-md-5">${i + 1}</td>
                <td class="px-md-5">${arr[i].bookName}</td>
                <td class="px-md-5"><button class="btn btn-success btn-sm px-3"><a href="${arr[i].bookmarkUrl}" target="_blank"><i class="fa fa-solid fa-eye"></i> Visit</a></button>
                </td>
                <td class="px-md-5"><button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm px-3"><i class="fa fa-solid fa-trash-alt"></i> Delete</button></td>
                <td class="px-md-5"><button onclick="setForUpdate(${i})" class="btn btn-warning btn-sm px-3 text-white"><i class="fa fa-solid fa-pen"></i> Update</button></td>
            </tr>`
    }
    document.getElementById("table").innerHTML = container;
}
// Clear inputs
function clearInputs() {
    bookmarkName.value = null;
    bookmarkUrl.value = null;
}
function deleteBookmark(deletedItem) {
    bookmarkContainer.splice(deletedItem, 1);
    displayBookmark(bookmarkContainer);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
}
// Update functions
var updatedItem;
function setForUpdate(val) {
    updatedItem = val;
    bookmarkName.value = bookmarkContainer[val].bookName;
    bookmarkUrl.value = bookmarkContainer[val].bookmarkUrl;
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

function updateBookmark() {
    bookmarkContainer[updatedItem].bookName = bookmarkName.value;
    bookmarkContainer[updatedItem].bookmarkUrl = bookmarkUrl.value;
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    displayBookmark(bookmarkContainer);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    clearInputs();
}
// Search function
function searchBookmark() {
    var searcharr = [];
    var term = searchInput.value;
    for (var i = 0; i < bookmarkContainer.length; i++) {
        if (bookmarkContainer[i].bookName.toLowerCase().includes(term.toLowerCase())) {
            searcharr.push(bookmarkContainer[i]);
        }
    }
    displayBookmark(searcharr);

}

// validate function
function validate(val) {
    var regex = {
        bookname: /^\w{3,}$/,
        url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
    }
    if (regex[val.id].test(val.value)) {
        val.classList.add('is-valid');
        val.classList.remove('is-invalid');
        submitBtn.addEventListener('click', addBookmark);
    }
    else {
        val.classList.remove('is-valid');
        val.classList.add('is-invalid');
    }

}

// Events
updateBtn.addEventListener('click', updateBookmark);
searchInput.addEventListener('input', searchBookmark);
bookmarkName.addEventListener('input', function () {
    validate(this);
})
bookmarkUrl.addEventListener('input', function () {
    validate(this);
})
