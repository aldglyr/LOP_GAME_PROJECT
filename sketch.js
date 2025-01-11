let canva_x = 500;
let canva_y = 500;
var tela = "INICIAL";

function setup(){
    createCanvas(canva_x, canva_y,);
}

function draw(){
    if(tela === "INICIAL"){
        background("GREY");
        
        
        BotaoJogo     ("JOGO"     ,25,"WHITE",320, 50,160,35,"GREEN");
        BotaoControles("CONTROLES",25,"WHITE",320,100,160,35,"ORANGE");
        BotaoCreditos ("CREDITOS" ,25,"WHITE",320,150,160,35,"BLACK");
    }
    
    if(tela === "JOGO") {
        background("GREEN");
        
        var areaJogoX = 400;
        var areaJogoY = 400;
        line(        0, areaJogoY, areaJogoX, areaJogoY);
        line(areaJogoX,        0 , areaJogoX, areaJogoY);
        
        fill("BLUE");

        if((cirX - cirD/2)  > 0 && (cirX + cirD/2) < areaJogoX){
            cirX += passoX;
        }else{
            passoX = passoX * -1;
            cirX += passoX;
        }
        
        if((cirY - cirD/2) > 0 && (cirY + cirD/2) < areaJogoY){
            cirY += passoY;
        }else{
            passoY = passoY * -1;
            cirY += passoY;
        }

        circle(cirX,cirY,cirD);

        BotaoVoltarIniciar("VOLTAR",25,"WHITE",350,430,110,35,"GREY")
    }

    if(tela === "CONTROLES") {
        background("ORANGE");

        textAlign(CENTER);
        text("CONTROLES",250,50);
        
        textAlign(LEFT);
        text("As teclas Direita e Esquerda controlam\numa arma e a tecla Espaço dispara\nprojéteis para atingir alvos gerados\naleatoriamente.\n\nA arma estará centralizada na área de\n jogo e rotacionará em seu próprio eixo\n aos comandos das teclas Esqueda e\n Direita.",20,100);

        BotaoVoltarIniciar("VOLTAR",25,"WHITE",350,430,110,35,"GREY")
    }

    if(tela === "CREDITOS") {
        background("BLACK");
        textAlign(CENTER);
        text("DESENVOLVEDOR",250,50);
        text("Aldglyr Dias (aldglyr@outlook.com)",250,100);

        BotaoVoltarIniciar("VOLTAR",25,"WHITE",350,430,110,35,"GREY")
    }
}

//BOTOES
function BotaoJogo(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor);
    if(BotaoClicado(retX, retY, retC, retA)){
        tela = "JOGO";
    }
    cirX = 250;
    cirY = 250;
    cirD =  70;
    passoX = 6;
    passoY = 3;
}

function BotaoControles(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor);
    if(BotaoClicado(retX, retY, retC, retA)){
        tela = "CONTROLES";
    }
}

function BotaoCreditos(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor);
    if(BotaoClicado(retX, retY, retC, retA)){
        tela = "CREDITOS";
    }
}

function BotaoVoltarIniciar(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor);
    if(BotaoClicado(retX, retY, retC, retA)){
        tela = "INICIAL";
    }
}

//FUNCOES AUXILIARES
function Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    textSize(textoTamanho);

    fill(retCor);
    rect(retX, retY, retC, retA);

    fill(textoCor);
    textAlign(CENTER);
    text(texto, retX + retC / 2, retY + retA - 10);
}

function BotaoClicado(retX, retY, retC, retA){
    if(mouseX > retX &&
       mouseX < retX + retC &&
       mouseY > retY &&
       mouseY < retY + retA &&
       mouseIsPressed
    ){
        return true;
    }else{
        return false;
    }
}