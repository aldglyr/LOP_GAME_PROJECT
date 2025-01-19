// Tamanho do canvas
const canvaX = 500;
const canvaY = 500;

// Tamanho da area de jogo
const areaJogoX = canvaX;
const areaJogoY = canvaY - 60;

// Variaveis do jogo
var vidas = 3;
var jogada = 0;
var pontos = 0;

// Variaveis do projetil
var tiroD = 0;
var tiroVel = 0;
var tiroPosX = 0;
var tiroPosY = 0;
var tiroMovX = 0;
var tiroMovY = 0;
var tiroDisparado = false;

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
var armaEsqX = 0;
var armaEsqY = 0;
var armaCenX = 0;
var armaCenY = 0;
var armaDirX = 0;
var armaDirY = 0;
var armaAngulo = 0

// Variaveis de inicializacao
var tela = "FASE 1";
var telaSet = true;

function setup(){
    createCanvas(canvaX, canvaY);
    angleMode(DEGREES);
    frameRate(30);
}

function draw(){
    if(tela === "INICIO"){
        background("GREY");
        BotaoJogo     ("JOGO"     ,15 ,"WHITE",380, 25,110,30,"GREEN");
        BotaoControles("CONTROLES",15 ,"WHITE",380, 75,110,30,"ORANGE");
        BotaoCreditos ("CREDITOS" ,15 ,"WHITE",380,125,110,30,"BLACK");
    }
    
    if(tela === "FASE 1") {
        if(vidas > 0){
            background("GREEN");
            
            if(telaSet){
                ConfigTela("FASE 1");
            }
            
            Hud();
            Projetil();
            Arma();
            Bloco();
            Alvo();

        }else{
            Caixa("Fim de Jogo!",15,"BLACK",canvaX/2-55,canvaY/2,110,30,"GREY");
        }
        BotaoVoltarIniciar("VOLTAR",15,"WHITE",380,455,110,30,"GREY")
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
   // console.log("x: " + blocoPosX + ", y: " + blocoPosY);
}

function Projetil(){
    
    // === CONDICAO DE DISPARO ===
    if(tiroDisparado === true){
        // === DISPARO ==
        if((tiroPosX - tiroD/2) > 0 && (tiroPosX + tiroD/2) < areaJogoX){
            tiroPosX += tiroMovX;
        }else{
            tiroMovX = tiroMovX * -1;
            tiroPosX += tiroMovX;
        }
        if((tiroPosY - tiroD/2) > 0 && (tiroPosY + tiroD/2) < areaJogoY){
            tiroPosY += tiroMovY;
        }else{
            // === DESTUICAO DO PROJETIL E DIMINUICAO DAS TENTATIVAS ===
            tiroD = 0;
            telaSet = true;
            vidas--;
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
    Caixa(            tela  ,15,"BLACK",10 ,455,100,30,"GREY")
    Caixa("PONTOS: "+ pontos,15,"BLACK",120,455,100,30,"GREY")
    Caixa("VIDAS: " + vidas ,15,"BLACK",230,455,100,30,"GREY")
}

function Arma(){
    
    if(armaAngulo >= -60 && armaAngulo <= 60){
        if(keyIsDown(37) && armaAngulo !== -60){
            armaAngulo--;
        }
        if(keyIsDown(39) && armaAngulo !== 60){
            armaAngulo++;
        }
    }
    if(keyIsDown(32)){
        tiroDisparado = true;
        tiroD = 15;
    }
    if(tiroDisparado === false){
        if(armaAngulo < 0){
            tiroMovX = - tiroVel * abs(sin(armaAngulo));
        }else{
            tiroMovX =   tiroVel * abs(sin(armaAngulo));
        }
        tiroMovY     = - tiroVel * cos(armaAngulo);
        
        Caixa("ang: " + armaAngulo ,15,"BLACK",380,420,110,30,"WHITE");
        Caixa("Tx: " + tiroMovX + ", Ty: " + tiroMovY ,15,"BLACK",380,385,110,30,"WHITE");
    }
    push();
        translate(areaJogoX/2,areaJogoY - 10);
        rotate(armaAngulo);
        fill("ORANGE");
        triangle(armaEsqX,armaEsqY,
                 armaCenX,armaCenY,
                 armaDirX,armaDirY);
    pop();
    Caixa("Ax: " + armaCenX + ", Ay: " + armaCenY ,15,"BLACK",380,350,110,30,"WHITE");
}

function ConfigTela(tela) {
    if(tela === "FASE 1"){
        // Variaveis da arma
        armaEsqX = -10;
        armaEsqY =  10;
        armaCenX =   0;
        armaCenY = -15;
        armaDirX =  10;
        armaDirY =  10;        
        armaAngulo = 0;

        // Variaveis do projetil
        tiroD = 0;
        tiroVel = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - 10;
        tiroMovX = -1;
        tiroMovY = -1;
        tiroDisparado = false;

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
        
        telaSet = false;
    }
    if(tela === "FASE 2"){
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
    if(tela === "FASE 3"){
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
        // Variaveis do jogo
        tela = "FASE 1";
        vidas = 3;
        jogada = 0;
        pontos = 0;
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