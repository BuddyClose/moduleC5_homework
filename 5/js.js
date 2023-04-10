
const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');
const btnClearNode = document.querySelector('.j-btn-clear');
const btnListNode = document.querySelector('.j-btn-list');

const myJSON = localStorage.getItem('myJSON');
if (myJSON) {
       displayResult(JSON.parse(myJSON)); 
}

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};
function displayResult(apiData) {
  let cards = '';
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });

    
  resultNode.innerHTML = cards;
}

var reqUrl = "https://picsum.photos/v2/list?page=";

btnNode.addEventListener('click', () => {
        value = document.getElementById('input1').value;
        value1 = document.getElementById('input2').value;
        url = reqUrl + value + "&limit=" + value1;
  
        if (((value < 1 || value > 10) && (value1 < 1 || value1 > 10)) || ((isNaN(value)) && (isNaN(value1))))  {
              resultNode.innerHTML = "Номер страницы " + value + " и лимит " + value1 + " вне диапазона от 1 до 10";
              } else {  
                if (((value < 1 || value > 10) || (isNaN(value))) && (value1 >= 1 || value1 <= 10)) {
                resultNode.innerHTML = "Номер страницы " + value + " вне диапазона от 1 до 10";
                } else {
                  if ((value >= 1 || value <= 10) && ((value1 < 1 || value1 > 10)) || (isNaN(value1))) {
                  resultNode.innerHTML = "Лимит " + value1 + " вне диапазона от 1 до 10";
                  } else {
                    resultNode.innerHTML = "Получаем ссылку вида: " + url ;
                    useRequest(url, (json) => {
                      localStorage.setItem('myJSON', JSON.stringify(json));
                      displayResult(json);
                      });
                  };
                };
            };
});

btnClearNode.addEventListener('click', () => {
  localStorage.clear();
  console.log('Данные из localStorage удалены');
});

btnListNode.addEventListener('click', () => {
  let myJSON = localStorage.getItem('myJSON');
  console.log('1. myJSON', myJSON);
  console.log('Данные из localStorage.');
});