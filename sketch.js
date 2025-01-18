// Tamanho do canvas
const canvaX = 500;
const canvaY = 500;

// Tamanho da area de jogo
const areaJogoX = canvaX;
const areaJogoY = canvaY - 75;

// Variaveis do jogo
var tentativas = 3;
var jogada = 0;
var pontos = 0;

// Variaveis do projetil
var tiroD = 0;
var tiroPosX = 0;
var tiroPosY = 0;
var tiroMovX = 0;
var tiroMovY = 0;

// Variaveis do alvo
var alvoD = 0;
var alvoPosX = 0;
var alvoPosY = 0;
var alvoMovX = 0;
var alvoMovY = 0;

// Variaveis do bloco
var blocoPosX = 100;
var blocoPosY = 100;
var blocoComW = 100;
var blocoAltH = 100;
var blocoMovX = 0;
var blocoMovY = 0;

// Variaveis da arma
var verEsqX = areaJogoX/2 - 10;
var verEsqY = areaJogoY;

var verCenX = areaJogoX/2 - 15;
var verCenY = areaJogoY - 30;

var verDirX = areaJogoX/2+10;
var verDirY = areaJogoY;

// Variaveis de inicializacao
var tela = "TELA_1";
var telaSet = true;

function setup(){
    createCanvas(canvaX, canvaY);
}

function draw(){
    if(tela === "INICIO"){
        background("GREY");
        BotaoJogo     ("JOGO"     ,15 ,"WHITE",380, 25,110,30,"GREEN");
        BotaoControles("CONTROLES",15 ,"WHITE",380, 75,110,30,"ORANGE");
        BotaoCreditos ("CREDITOS" ,15 ,"WHITE",380,125,110,30,"BLACK");
    }
    
    if(tela === "TELA_1") {
        if(tentativas > 0){
            background("GREEN");
            
            if(telaSet){
                ConfigTela("TELA_1");
            }
            
            Hud();
            Arma();
            Projetil();
            Bloco();
            Alvo();

        }else{
            /* mostrar que perdeu
               mostrar pontuacao
               voltar pra tela inicial
            */
        }
    }
    
    if(tela === "CONTROLES") {
        background("ORANGE");
        
        textAlign(CENTER);
        text("CONTROLES",250,50);
        
        textAlign(LEFT);
        text("As teclas Direita e Esquerda controlam\numa arma e a tecla Espaço dispara\nprojéteis para atingir alvos gerados\naleatoriamente.\n\nA arma estará centralizada na área de\njogo e rotacionará em seu próprio eixo\naos comandos das teclas Esqueda e\nDireita.",20,100);
        
        BotaoVoltarIniciar("VOLTAR",15,"WHITE",380,450,110,30,"GREY")
    }
    
    if(tela === "CREDITOS") {
        background("BLACK");
        textAlign(CENTER);
        text("DESENVOLVEDOR",250,50);
        text("Aldglyr Dias (aldglyr@outlook.com)",250,100);
        
        BotaoVoltarIniciar("VOLTAR",15,"WHITE",380,450,110,30,"GREY")
    }
}

// === FUNCOES DO JOGO ===
function Alvo(){
    fill("RED");
    circle(alvoPosX,alvoPosY,alvoD);
}

function Bloco(){
    fill("BLACK");
    rect(blocoPosX,blocoPosY,blocoComW,blocoAltH);
    //console.log("x: " + tiroPosX + ", y: " + tiroPosY);
}

function Projetil(){
    
    // === CONDICAO DE DISPARO ===
    if(keyCode === 32){
        // === DISPARO ==
        if((tiroPosX - tiroD/2) > 0 && (tiroPosX + tiroD/2) < areaJogoX){
            tiroPosX += tiroMovX;
        }else{
            tiroMovX = tiroMovX * -1;
            tiroPosX += tiroMovX;
        }
        
        if((tiroPosY - tiroD/2) > 0 && (tiroPosY + tiroD/2) <= areaJogoY){
            tiroPosY += tiroMovY;
        }else{
            // === CONDICAO PARA DESTUICAO DO PROJETIL E RESET DO JOGO ===
            tiroMovX = 0;
            tiroMovY = 0;
            tiroD = 1;
            keyCode = 3;
            console.log("x: " + tiroPosX + ", y: " + tiroPosY);
            console.log("botao tentar");
            noLoop();
        }
    }
    
    fill("BLUE");
    circle(tiroPosX,tiroPosY,tiroD);
}

function Hud(){
    // Definicao da tela com informacoes do jogo e area util
    // Inicialmente pensei em um subespaco quadrado x e y menor que o canvas, mas o x nao sera utilizado
    // Deixei apenas para maior flexibiidade no design final
    line(        0, areaJogoY, areaJogoX, areaJogoY);
    line(areaJogoX,        0 , areaJogoX, areaJogoY);
    BotaoVoltarIniciar("VOLTAR",15,"WHITE",380,450,110,30,"GREY")
    Caixa("PONTOS: "+ pontos,15,"BLACK",20,450,110,30,"GREY")
    Caixa("TENTATIVAS: "+ tentativas,15,"BLACK",160,450,130,30,"GREY")
}

function Arma(){
    fill("ORANGE");
    beginShape(TRIANGLES);

    vertex(verEsqX,verEsqY);
    vertex(verCenX,verCenY);
    vertex(verDirX,verDirY);

    endShape();
}

function ConfigTela(tela) {
    if(tela = "TELA_1"){
        // Variaveis do projetil
        tiroD = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - tiroD/2;
        tiroMovX = 6;
        tiroMovY = -3;
        
        // Variaveis do alvo
        alvoD = 40;
        alvoPosX = areaJogoX/2;
        alvoPosY = 50;
        alvoMovX = 0;
        alvoMovY = 0;
        
        // Variaveis do bloco
        blocoPosX = areaJogoX/2;
        blocoPosY = 100;
        blocoComW = 100;
        blocoAltH = 50;
        blocoMovX = 0;
        blocoMovY = 0;
        
        // Variaveis da arma
        verEsqX = areaJogoX/2 - 10;
        verEsqY = areaJogoY;
        
        verCenX = areaJogoX/2 - 15;
        verCenY = areaJogoY - 30;
        
        verDirX = areaJogoX/2+10;
        verDirY = areaJogoY;        
        
        telaSet = false;
    }
    if(tela = "TELA_2"){
        // Variaveis do projetil
        tiroD = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - tiroD/2;
        tiroMovX = 6;
        tiroMovY = -3;
        
        // Variaveis do alvo
        alvoD = 40;
        alvoPosX = areaJogoX/2;
        alvoPosY = 50;
        alvoMovX = 0;
        alvoMovY = 0;
        
        // Variaveis do bloco
        blocoPosX = 0;
        blocoPosY = 0;
        blocoComW = 0;
        blocoAltH = 0;
        blocoMovX = 0;
        blocoMovY = 0;
        
        telaSet = false;
    }
    if(tela = "TELA_3"){
        // Variaveis do projetil
        tiroD = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - tiroD/2;
        tiroMovX = 6;
        tiroMovY = -3;
        
        // Variaveis do alvo
        alvoD = 40;
        alvoPosX = areaJogoX/2;
        alvoPosY = 50;
        alvoMovX = 0;
        alvoMovY = 0;
        
        // Variaveis do bloco
        blocoPosX = 0;
        blocoPosY = 0;
        blocoComW = 0;
        blocoAltH = 0;
        blocoMovX = 0;
        blocoMovY = 0;
        
        telaSet = false;
    }
}

// === BOTOES ===
function BotaoJogo(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    if(Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor)){
        tela = "TELA_1";
    }
    telaSet = true;
}

function BotaoControles(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    if(Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor)){
        tela = "CONTROLES";
    }
}

function BotaoCreditos(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    if(Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor)){
        tela = "CREDITOS";
    }
}

function BotaoVoltarIniciar(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    if(Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor)){
        tela = "INICIO";
    }
}

// === FUNCOES AUXILIARES ===
function Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){

    // === CONSTRUCAO DO BOTAO ===
    textSize(textoTamanho);
    fill(retCor);
    rect(retX, retY, retC, retA);
    fill(textoCor);
    textAlign(CENTER);
    text(texto, retX + retC / 2, retY + retA - 10);

    // === VERIFICA SE O BOTAO FOI CLICADO E RETORNA VERDADEIRO OU FALSO ===
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

function Caixa(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){

    // === CONSTRUCAO DO BOTAO ===
    textSize(textoTamanho);
    fill(retCor);
    rect(retX, retY, retC, retA);
    fill(textoCor);
    textAlign(CENTER);
    text(texto, retX + retC / 2, retY + retA - 10);
}