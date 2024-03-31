var linhas, colunas, team, lookingOpts, origin, listBlocked = [], lastPlayerTeam;

function resetImg() {
    let manyKing = 0;
    let winner = '';
    let linhas = document.getElementsByTagName('tr');
    for(var i = 0; i < 8; i++){
        let spaces = linhas[i].getElementsByTagName('td');
        for(var j = 0; j < 8; j++){
            let textContent = spaces[j].textContent.split(' ');
            let tagImg = spaces[j].getElementsByTagName('img')[0];
            console.log("Elemento y: " + i + " x: " + j);
            switch(textContent[0]) {
                case 'peao':
                    tagImg.setAttribute('src',  textContent[1] == 'b' ? './pngs/peaoBranco.png' : './pngs/peaoPreto.png');
                    break;
                case 'torre':
                    tagImg.setAttribute('src', textContent[1] == 'b' ? './pngs/torreBranca.png' : './pngs/torrePreta.png');
                    break;
                case 'cavalo':
                    tagImg.setAttribute('src',  textContent[1] == 'b' ? './pngs/cavaloBranco.png' : './pngs/cavaloPreto.png');
                    break;
                case 'bispo':
                    tagImg.setAttribute('src',  textContent[1] == 'b' ? './pngs/bispoBranco.png' : './pngs/bispoPreto.png');
                    break;
                case 'Dama':
                    tagImg.setAttribute('src',  textContent[1] == 'b' ? './pngs/rainhaBranco.png' : './pngs/rainhaPreta.png');
                    break;
                case 'Rei':
                    manyKing++;
                    winner = textContent[1];
                    tagImg.setAttribute('src',  textContent[1] == 'b' ? './pngs/reiBranco.png' : './pngs/reiPreto.png');
                    break;
                default:
                    tagImg.setAttribute('src', './pngs/fundo.jpg');
                    tagImg.style.opacity = 0;
            }
        }
    }    
    if(manyKing == 1) {
        if(lastPlayerTeam == 'b') {
            alert("O jogo terminou!! \n O ganhador é o Branco");
        } else {
            alert("O jogo terminou!! \n O ganhadir é o Preto");
        }
        window.location.reload();
    }
}

function lookOpts(x, y){
    this.linhas  = document.getElementsByTagName('tr');
    this.colunas  = this.linhas[y].getElementsByTagName('td');
    let peca = this.colunas[x];
    this.team = peca.textContent.split(" ").pop();
    
    if(this.lookingOpts) {
        const backColor = peca.style.backgroundColor;

        if(backColor == 'red' || backColor == 'green') {    
            if (y == 0 && this.origin.textContent.includes('peao')) {
                peca.innerHTML = `<img src="#">${tranformPeao()}`;
            } else {
                peca.innerHTML = `<img src="#">${this.origin.textContent}`;
            }
            this.origin.innerHTML = '<img src="#">';
        } else {
            lastPlayerTeam = null;
        }
        cleanMap();
        this.lookingOpts = !this.lookingOpts;
        this.listBlocked = [];
        resetImg();
    } else if(peca.textContent) {
        this.lookingOpts = !this.lookingOpts;
        if(this.team == this.lastPlayerTeam){
            alert("Não pode repetir a equipe que vai jogar");
            return;
        } else {
            this.lastPlayerTeam = this.team;
            this.origin = peca;
            peca.style.backgroundColor = '#784e1a';
            let textContent = peca.textContent;
            if(textContent) {
                let moves = findMoves(textContent);
                canMove(moves, x, y);
            }   
        }
    }
}


function cleanMap() {
    let aux = true;
    for (const linha of this.linhas) {
        let oneLine = linha.getElementsByTagName('td');
        for (const lugar of oneLine) { 
            if(aux) {
                lugar.style.backgroundColor = '#808080';
            } else {
                lugar.style.backgroundColor = '#f0f8ff';
            }
            aux = !aux;
        }
        aux = !aux;
    }
}

function findMoves(textContent) {
    pecaType = textContent.split(" ")[0];
    switch(pecaType) {
        case 'peao':
            return [
                {y:1, x:0},
                {y:2, x:0},
                {y:1, x:1},
                {y:1, x:-1},
                {y:-1, x:0},    
                {y:-2, x:0},
                {y:-1, x:1},
                {y:-1, x:-1}
            ];
        case 'cavalo':
            return [
                {y:2, x:1},
                {y:2, x:-1},
                {y:-2, x:1},
                {y:-2, x:-1},
                {y:1, x:2},
                {y:-1, x:2},
                {y:-1, x:-2},
                {y:1, x:-2}
            ];
        case 'bispo':
            return [
                {y:1, x:1}, 
                {y:-1, x:-1},
                {y:-1, x:1},
                {y:1, x:-1},
                {y:2, x:2},
                {y:3, x:3}, 
                {y:4, x:4}, 
                {y:5, x:5}, 
                {y:6, x:6}, 
                {y:7, x:7}, 
                {y:8, x:8}, 
                {y:2, x:-2},
                {y:3, x:-3}, 
                {y:4, x:-4}, 
                {y:5, x:-5}, 
                {y:6, x:-6}, 
                {y:7, x:-7}, 
                {y:8, x:-8},
                {y:-2, x:2},
                {y:-3, x:3},
                {y:-4, x:4},
                {y:-5, x:5},
                {y:-6, x:6},
                {y:-7, x:7},
                {y:-8, x:8},
                {y:-2, x:-2},
                {y:-3, x:-3},
                {y:-4, x:-4},
                {y:-5, x:-5},
                {y:-6, x:-6},
                {y:-7, x:-7},
                {y:-8, x:-8}  
            ];
        case 'torre':
            return [
                {y:0, x:-1}, 
                {y:-1, x:0}, 
                {y:0, x:1}, 
                {y:1, x:0}, 
                {y:2, x:0},
                {y:3, x:0}, 
                {y:4, x:0}, 
                {y:5, x:0}, 
                {y:6, x:0}, 
                {y:7, x:0}, 
                {y:8, x:0},
                {y:-2, x:0},
                {y:-3, x:0}, 
                {y:-4, x:0}, 
                {y:-5, x:0}, 
                {y:-6, x:0}, 
                {y:-7, x:0}, 
                {y:-8, x:0}, 
                {y:0, x:2},
                {y:0, x:3}, 
                {y:0, x:4}, 
                {y:0, x:5}, 
                {y:0, x:6}, 
                {y:0, x:7}, 
                {y:0, x:8}, 
                {y:0, x:-2},
                {y:0, x:-3}, 
                {y:0, x:-4}, 
                {y:0, x:-5}, 
                {y:0, x:-6}, 
                {y:0, x:-7}, 
                {y:0, x:-8} 
            ];
        case 'Rei':
            return [
                {y:1, x:0},
                {y:0, x:1},
                {y:1, x:1},
                {y:-1, x:0},
                {y:0, x:-1},
                {y:-1, x:-1},
                {y:1, x:-1},
                {y:-1, x:1},
            ];
            case 'Dama':  
            return [
                {y:-1, x:-1}, 
                {y:-1, x:1}, 
                {y:1, x:0}, 
                {y:-1, x:0}, 
                {y:1, x:-1}, 
                {y:1, x:1}, 
                {y:0, x:1}, 
                {y:2, x:0},
                {y:3, x:0},            
                {y:4, x:0}, 
                {y:5, x:0}, 
                {y:6, x:0}, 
                {y:7, x:0}, 
                {y:8, x:0}, 
                {y:-2, x:0},
                {y:-3, x:0},            
                {y:-4, x:0}, 
                {y:-5, x:0}, 
                {y:-6, x:0}, 
                {y:-7, x:0}, 
                {y:-8, x:0}, 
                {y:0, x:2},
                {y:0, x:3}, 
                {y:0, x:4}, 
                {y:0, x:5}, 
                {y:0, x:6}, 
                {y:0, x:7}, 
                {y:0, x:8}, 
                {y:0, x:-1}, 
                {y:0, x:-2},
                {y:0, x:-3}, 
                {y:0, x:-4}, 
                {y:0, x:-5}, 
                {y:0, x:-6}, 
                {y:0, x:-7}, 
                {y:0, x:-8},
                {y:2, x:2},
                {y:3, x:3}, 
                {y:4, x:4}, 
                {y:5, x:5}, 
                {y:6, x:6}, 
                {y:7, x:7}, 
                {y:8, x:8},
                {y:-2, x:2},
                {y:-3, x:3}, 
                {y:-4, x:4}, 
                {y:-5, x:5}, 
                {y:-6, x:6}, 
                {y:-7, x:7}, 
                {y:-8, x:8},
                {y:2, x:-2},
                {y:3, x:-3}, 
                {y:4, x:-4}, 
                {y:5, x:-5}, 
                {y:6, x:-6}, 
                {y:7, x:-7}, 
                {y:8, x:-8},
                {y:-2, x:-2},
                {y:-3, x:-3}, 
                {y:-4, x:-4}, 
                {y:-5, x:-5}, 
                {y:-6, x:-6}, 
                {y:-7, x:-7}, 
                {y:-8, x:-8}    
            ];
    }
}

function canMove(posibilits, x, y) {
    posibilits.forEach(posibilit => {
        let targetY = (posibilit.y + y);
        let targetX = (posibilit.x + x);
        let tdTarget = this.linhas[targetY]?.getElementsByTagName('td')[targetX];
        
        if(!tdTarget) return;

        let targetTeam = tdTarget.textContent.split(" ").pop();

        if(this.origin.textContent.includes('peao')) {
            handlePeao(targetY, y, targetX, x, targetTeam, tdTarget);
            
        } else if(!this.origin.textContent.includes('cavalo') && !this.origin.textContent.includes('Rei')) {
            console.log("Passando na validação");
            setTimeout(hasBarrier(tdTarget, targetTeam, targetX, targetY, x, y), 10);

        } else {
            if(!tdTarget.textContent) {
                colorTd(tdTarget, 'free');
            } else if(targetTeam != this.team) {
                colorTd(tdTarget, 'kill');
            }
        }
    });
}

function handlePeao(targetY, originY, targetX, originX, targetTeam, target) { 
    if (this.team == 'b') {
        if(targetY < originY) {
            if(targetX == originX) {
                if(((originY - 1 == targetY) || (originY == 6 && targetY == 4)) && !target.textContent ) {
                    colorTd(target, 'free');
                }
            } else if(targetTeam != this.team && target.textContent){
                colorTd(target, 'kill');
            }
        }
    } else {
        if(targetY > originY) {
            if (targetY == 7 && originY == 6) {
                tranformPeao();
            } else if(targetX == originX) {
                if(((originY + 1 == targetY) || (originY == 1 && targetY == 3)) && !target.textContent ) {
                    colorTd(target, 'free');
                }
            } else if(targetTeam != this.team && target.textContent){
                colorTd(target, 'kill');
            }
        } 
    }
}

function tranformPeao() {
    let team = this.origin.textContent.split(' ').pop();
    do {
        let opt = parseInt(prompt("Qual Peça vc deseja colocar no lugar do peão? \n 1- Torre \n 2- Bispo \n 3- cavalo \n 4- Dama "));
        switch (opt) {
            case 1:
                return `torre ${team}`;
            case 2:
                return `bispo ${team}`;
            case 3:
                return `cavalo ${team}`;
            case 4:
                return `Dama ${team}`;
        }
    } while(true);
}

function hasBarrier(target, targetTeam, targetX, targetY, x, y) {
    console.log("Target x: " + targetX + " y: " + targetY);
    console.log(isBlocked({x: targetX, y: targetY}));
    
    if(!isBlocked({x: targetX, y: targetY})) {
        console.log("Esse é o conteudo: " + target.textContent);
        if(target.textContent) {
            console.log("Tem conteudo");
            if(targetTeam != this.team) {
                target.style.backgroundColor = 'red';
            }
            addListBlocked({x: targetX, y: targetY}, {x, y});        
        } else {
            colorTd(target, 'free');
        }
    }
}

function isBlocked(targetPosition) {
    if(!this.listBlocked) {
        return false;
    }
    console.log(this.listBlocked);
    return (this.listBlocked || []).some(blocked => blocked.x === targetPosition.x && blocked.y === targetPosition.y);
}

function addListBlocked(targetPosition, originPosition) {
    console.log("Validando target x: " + targetPosition.x + " y: " + targetPosition.y);
    console.log("Validando origin x: " + originPosition.x + " y: " + originPosition.y);
    if((this.listBlocked || []).some(blocked => blocked.x === targetPosition.x && blocked.y === targetPosition.y)) return;

    if(originPosition.x == targetPosition.x) {
        if(originPosition.y < targetPosition.y) {
            for(var i = targetPosition.y; i <= 7; i++) {
                this.listBlocked.push({x: originPosition.x, y: i});
            }
        } else {
            for(var i = targetPosition.y; i >= 0; i--) {
                this.listBlocked.push({x: originPosition.x, y: i});
            }
        }
    } else if(originPosition.x < targetPosition.x) {
        let aux = targetPosition.x;
        if(originPosition.y == targetPosition.y) {
            for(var i = targetPosition.x; i <= 7; i++) {
                this.listBlocked.push({x: i, y: originPosition.y});
            }
        } else if(originPosition.y < targetPosition.y) {
            for(var i = targetPosition.y; i <= 7; i++) {
                this.listBlocked.push({x: aux++, y: i});
            }
        } else {
            for(var i = targetPosition.y; i >= 0; i--) {
                this.listBlocked.push({x: aux++, y: i});
            }
        }
    } else {
        let aux = targetPosition.x;
        if(originPosition.y == targetPosition.y) {
            for(var i = targetPosition.x; i >= 0; i--) {
                this.listBlocked.push({x: i, y: originPosition.y});
            }
        } else if(originPosition.y < targetPosition.y) {
            for(var i = targetPosition.y; i < 7; i++) {
                this.listBlocked.push({x: aux--, y: i});
            }
        } else {
            for(var i = targetPosition.y; i >= 0; i--) {
                this.listBlocked.push({x: aux--, y: i});
            }
        }
    }
}

function colorTd(td, type) {
    switch (type) {
        case 'kill':
            td.style.backgroundColor = 'red';
            break;
        case 'free':
            td.style.backgroundColor = 'green';
            break;
    }
}
