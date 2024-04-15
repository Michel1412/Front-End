const input = document.getElementById('input');
const fila  = document.getElementById('fila');

function push(){
    const item = document.createElement('li');
    item.innerHTML = input.value;
    input.value = '';
    const nullList = fila.getElementsByTagName('h3')[0];
    if(nullList?.textContent)
        fila.removeChild(nullList);
    fila.appendChild(item);
}

function pop() {
    const arritem = fila.getElementsByTagName('li');
    if(arritem.length == 1) {
        fila.removeChild(arritem[0]);
        const nullList = document.createElement('h3');
        nullList.textContent = 'A Fila está vazia';
        fila.appendChild(nullList);
    }
    fila.removeChild(arritem[0]);
}