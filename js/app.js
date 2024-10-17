const body = document.querySelector('body');
const form = document.querySelector('#myForm');
const siteName = document.querySelector('#siteName');
const siteUrl = document.querySelector('#siteUrl');
const submitBtn = document.querySelector('.btn');
const displayDiv = document.querySelector('#bookmarksResults');
const key = 'bookmarks';

form.addEventListener('submit', storeData);
window.addEventListener('DOMContentLoaded', displayBookmarks);


function storeData(event){
    event.preventDefault();

    const nameValue = siteName.value.trim();
    const urlValue = siteUrl.value.trim();

    if(!validateInput(nameValue, urlValue)) return;
  
    let bookmark = {
        name: nameValue,
        url: urlValue
    }

     if(localStorage.getItem(key) === null ){
        const bookmarksArr = [];
        bookmarksArr.push(bookmark);
        localStorage.setItem(key, JSON.stringify(bookmarksArr));
     }else{
        const localArr = JSON.parse(localStorage.getItem(key));
        localArr.push(bookmark);
        localStorage.setItem(key, JSON.stringify(localArr));
     }

     form.reset();
     displayBookmarks();
}

function validateInput(name, url){

    const pattern = /^(https?:\/\/[^\s/$?.#].[^\s]*)$/;
    const validProtocol = new RegExp(pattern);
   
    if(!name){
        alert('Пожалуйста, введите имя сайта');
        return false;
    }
    
    if(!url){
        alert('Пожалуйста, введите ссылку сайта');
        return false;
    }

    if(!validProtocol.test(url)){
        alert('Пожалуйста, введите действительный URL.');
        return false;
    }

    return true;
}


function removeBookmark(url){
    const bookmarksArr = JSON.parse(localStorage.getItem(key));
    let urls = bookmarksArr.map((el, idx) => el.url === url ? idx : undefined);
    urls = urls.filter(el => !isNaN(el));
    urls.forEach((el, idx) => {
        bookmarksArr.splice(el - idx, 1);
    });

    localStorage.setItem(key, JSON.stringify(bookmarksArr));
    displayBookmarks();  
}


function displayBookmarks(){
    const bookmarksArr = JSON.parse(localStorage.getItem(key));
    displayDiv.innerHTML = '';
    bookmarksArr.forEach(el => {
        displayDiv.innerHTML += 
        `<div class="well">
        <h3>
        ${el.name}
        <a class="btn btn-default" target="_blank" href="${el.url}">Посетить</a>
        <a onclick="removeBookmark('${el.url}')"
        class="btn btn-danger" 
        href="#">Удалить</a>
        </h3>
        <div>`;
    });
}
