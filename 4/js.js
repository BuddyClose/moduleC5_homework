const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');

var reqUrl = "https://picsum.photos/";

btnNode.addEventListener('click', () => {
        let width = document.getElementById('input1').value;
        let height = document.getElementById('input2').value;
        let url = reqUrl + width + "/" + height;
              
        if ((width < 100 || width > 300) || (height < 100 || height > 300)) {
             resultNode.innerHTML = "одно из чисел " + width + " или " + height + " вне диапазона от 100 до 300";
        } else {
            loadImg(url,width, height);
          };
});


function setBase64ToImage(result,url,width, height) {
      const cardBlock = `
      <div class="card">
        <img
          src="${result}"  
          width="${width}"        
          height="${height}"
          class="card-image"
        />
        <p>${url}</p>
      </div>
    `;
    resultNode.innerHTML = cardBlock;
}

  async function loadImg(url,width, height) {
  const response = await fetch(url);
  const data = await response.blob();

  let reader = new FileReader();
  reader.onloadend = function() {
    setBase64ToImage(reader.result,url,width, height)
  }
  reader.readAsDataURL(data);
}