const input = document.getElementById('input');
const pilha  = document.getElementById('pilha');

function push(){
    const item = document.createElement('li');
    item.innerHTML = input.value;
    input.value = '';
    const nullList = pilha.getElementsByTagName('h3')[0];
    if(nullList?.textContent)
        pilha.removeChild(nullList);
    const firstItem = pilha.getElementsByTagName('li')[0];
    pilha.insertBefore(item, firstItem);
}

function pop() {
    const arritem = pilha.getElementsByTagName('li');
    if(arritem.length == 1) {
        pilha.removeChild(arritem[0]);
        const nullList = document.createElement('h3');
        nullList.textContent = 'A pilha está vazia';
        pilha.appendChild(nullList);
    }
    pilha.removeChild(arritem[0]);
}