// global variables ======================================
var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var addBtn = document.getElementById('addBtn');
var tableBody = document.getElementById('tableBody');
var webSites;
let nameFlag = false;
let urlFlag = false;

// check localstorage first======================================

if (localStorage.getItem("webSites") == null) {
    webSites = [];
} else {
    webSites = JSON.parse(localStorage.getItem("webSites"));
    display();

}

// addbtn ======================================

addBtn.addEventListener('click', function () {
    if (nameFlag && urlFlag) {
        createMark()
        nameFlag = false;
        urlFlag = false;
        console.log(1, nameFlag, urlFlag)
    } else {
        console.log(2, nameFlag, urlFlag)
        window.alert(`Site Name or Url is not valid, Please follow the rules below :
                Site name must contain at least 3 characters
                Site URL must be a valid one`)
    }
    localStorage.setItem('webSites', JSON.stringify(webSites));
    display()
    resetInput();
})
// Regular Expressions vaildation======================================
var nameRegex = /\w+/gm;
var urlRegex = /(^https:\/\/){1}(www\.)?\w+\.\w{3}(\/)?$/gm;

siteName.addEventListener('input', function () {
    if (nameRegex.test(siteName.value)) {
        console.log("tmam name");
        nameFlag = true;
    } else {
        nameFlag = false;
    }
})
siteUrl.addEventListener('input', function () {
    if (urlRegex.test(siteUrl.value)) {
        console.log("tmam url");
        urlFlag = true;
    } else {
        console.log(siteUrl.value);
        urlFlag = false;
    }
})
// function create json ======================================

function createMark() {
    var webSite = {
        name: siteName.value,
        url: siteUrl.value
    }
    webSites.push(webSite);
}
// display bookmark json ======================================

function display() {
    var trs = ``;
    for (var i = 0; i < webSites.length; i++) {
        trs += `
        <tr>
            <td>${i + 1}</td>
            <td>${webSites[i].name}</td>
            <td><a href="${webSites[i].url} target="_blank""><button class="btn btn-success"> <i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
            <td><button class="btn btn-danger deleteBtn" onclick="deleteMark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
    `
    }
    tableBody.innerHTML = trs;
}

// delete function ======================================

function deleteMark(idx) {
    webSites.splice(idx, 1);
    localStorage.setItem('webSites', JSON.stringify(webSites));
    display()
}
// clear function ======================================

function resetInput() {
    siteName.value = '';
    siteUrl.value = '';
}


