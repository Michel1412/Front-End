const list = document.getElementById('list');
const input = document.getElementById('input');
const emptyList = document.getElementById('emptyList');
const btnAddOnEnd = document.getElementById('addOnEnd');
const btnAddOnStart = document.getElementById('addOnStart');
const btnAddOnIndex = document.getElementById('addOnIndex');
const btnPop = document.getElementById('pop');
const btnShift = document.getElementById('shift');

function updateBody() {
    if(list.children.length === 0) {
        list.style.display = 'none';
        emptyList.style.display = 'flex';
    } else {
        emptyList.style.display = 'none';
        list.style.display = 'flex';
    }
}

function hasValueOnInput() {
    if(!input.value.trim()) {
        alert('Não é possivel adicionar um item sem conteudo!!');
        return false
    }
    return true;
}

function startNewItem() {
    const newItem = document.createElement('li');

    const textElement = document.createElement('span');
    textElement.textContent = input.value;
    newItem.appendChild(textElement);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.onclick = function() { deleteItemById(this); }
    newItem.appendChild(deleteBtn);

    input.value = '';
    return newItem;
}

btnAddOnStart.addEventListener('click', () => {
    if(!hasValueOnInput()) return;

    if(list.childElementCount === 0) {
        list.appendChild(startNewItem());
        updateBody();
        return;
    }

    const arrItens = list.getElementsByTagName('li');
    list.insertBefore(startNewItem(), arrItens[0]);
});

btnAddOnIndex.addEventListener('click', () => {
    if(!hasValueOnInput()) return;

    if(list.childElementCount === 0) {
        list.appendChild(startNewItem());
        updateBody();
        return;
    }   
    
    let index = 1;

    do {
        index = Number(prompt("Qual a posição que vc deseja colocar esse item? "));
        console.log(index);
        console.log((list.childElementCount + 1));
    }while(index > (list.childElementCount + 1) || index <= 0);

    const arrItens = list.getElementsByTagName('li');
    list.insertBefore(startNewItem(), arrItens[--index]);
});

btnAddOnEnd.addEventListener('click', () => {
    if(!hasValueOnInput()) return;

    if(list.childElementCount === 0) {
        list.appendChild(startNewItem());
        updateBody();
        return;
    }   

    list.appendChild(startNewItem());
});

btnPop.addEventListener('click', () => {
    if(list.childElementCount === 0) {
        alert('A Lista já está vazia');
        return
    }

    const arrItens = list.children;
    arrItens[arrItens.length - 1].remove();
    updateBody();
});

btnShift.addEventListener('click', () => {
    if(list.childElementCount === 0) {
        alert('A Lista já está vazia');
        return
    }

    const arrItens = list.children;
    arrItens[0].remove();
    updateBody();
});

function deleteItemById(button) {
    const listItem = button.parentNode; 
    listItem.parentNode.removeChild(listItem)
    updateBody();
}


