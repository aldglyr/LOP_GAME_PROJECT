// Tamanho do canvas
const canvaX = 500;
const canvaY = 500;

// Tamanho da area de jogo
const areaJogoX = canvaX;
const areaJogoY = canvaY - 75;

// Variaveis do jogo
var tentativas = 3;
var jogada =0;
var pontos = 0;

// Variaveis do projetil
var ProjetilX = areaJogoX/2;
var ProjetilY = areaJogoY - 5;
var ProjetilD = 15;

// Variaveis do alvo
var alvoX = areaJogoX/2;
var alvoY = 100;
var alvoD = 40;

// Incremento de movimento do projetil
const movimentoInicialX = 6;
const movimentoInicialY = 3;

var projetilMovimentoX = movimentoInicialX;
var projetilMovimentoY = movimentoInicialY;

// Qual tela sera inicializada
var tela = "JOGO";

function setup(){
    createCanvas(canvaX, canvaY);
}

function draw(){
    if(tela === "INICIAL"){
        background("GREY");
        
        BotaoJogo     ("JOGO"     ,15 ,"WHITE",380, 25,110,30,"GREEN");
        BotaoControles("CONTROLES",15 ,"WHITE",380, 75,110,30,"ORANGE");
        BotaoCreditos ("CREDITOS" ,15 ,"WHITE",380,125,110,30,"BLACK");
    }
    
    if(tela === "JOGO") {
        background("GREEN");

        // === HUD ===
        
        // Definicao da tela com informacoes do jogo e area util
        // Inicialmente pensei em um subespaco quadrado x e y menor que o canvas, mas o x nao sera utilizado
        // Deixei apenas para maior flexibiidade no design final
           
        line(        0, areaJogoY, areaJogoX, areaJogoY);
        line(areaJogoX,        0 , areaJogoX, areaJogoY);

        // === JOGO ===

        while(jogada <= tentativas){
            // === ARMA ===

            // === ALVO ===

            fill("RED");
            circle(alvoX,alvoY,alvoD);
    
            // === PROJETIL ===

            fill("BLUE");
            circle(ProjetilX,ProjetilY,ProjetilD);

            if((ProjetilX - ProjetilD/2)  > 0 && (ProjetilX + ProjetilD/2) < areaJogoX){
                ProjetilX += projetilMovimentoX;
            }else{
                projetilMovimentoX = projetilMovimentoX * -1;
                ProjetilX += projetilMovimentoX;
            }
            
            if((ProjetilY - ProjetilD/2) >= 0 && (ProjetilY + ProjetilD/2) <= areaJogoY){
                ProjetilY += projetilMovimentoY;
            }else{
                projetilMovimentoY = projetilMovimentoY * -1;
                ProjetilY += projetilMovimentoY;
            }
            
            if(ProjetilY === ProjetilD){
                projetilMovimentoX = 0;
                projetilMovimentoY = 0;            
            }
    
            jogada++;
        }

        BotaoTentar("TENTAR NOVAMENTE",15,"WHITE",areaJogoX/2 - 90,areaJogoY/2,180,30,"GREY")
        
        BotaoVoltarIniciar("VOLTAR",15,"WHITE",380,450,110,30,"GREY")
    }
    
    if(tela === "CONTROLES") {
        background("ORANGE");
        
        textAlign(CENTER);
        text("CONTROLES",250,50);
        
        textAlign(LEFT);
        text("As teclas Direita e Esquerda controlam\numa arma e a tecla Espaço dispara\nprojéteis para atingir alvos gerados\naleatoriamente.\n\nA arma estará centralizada na área de\njogo e rotacionará em seu próprio eixo\naos comandos das teclas Esqueda e\nDireita.",20,100);
        
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
function BotaoTentar(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor);
    if(BotaoClicado(retX, retY, retC, retA)){
        tela = "JOGO";
    }
    projetilMovimentoX = movimentoInicialX;
    projetilMovimentoY = movimentoInicialY;
    ProjetilX = areaJogoX/2;
    ProjetilY = areaJogoY - 5;
    tentativas = 3;
    jogada =0;
    pontos = 0;
    
}

function BotaoJogo(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor);
    if(BotaoClicado(retX, retY, retC, retA)){
        tela = "JOGO";
    }
    projetilMovimentoX = movimentoInicialX;
    projetilMovimentoY = movimentoInicialY;
    ProjetilX = areaJogoX/2;
    ProjetilY = areaJogoY - 5;
    tentativas = 3;
    jogada =0;
    pontos = 0;
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