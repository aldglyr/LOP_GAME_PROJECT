/* Tamanho do canvas ************************************************/
const canvaX = 512;
const canvaY = 512;

/* Tamanho da area de jogo ******************************************/
var areaJogoX = 0;
var areaJogoY = 0;

/* Variaveis do jogo ************************************************/
var vidas = 0;
var jogada = 0;
var pontos = 0;
var pontosMax = 0;

/* Variaveis do projetil ********************************************/
var tiroD = 0;
var tiroVel = 0;
var tiroPosX = 0;
var tiroPosY = 0;
var tiroMovX = 0;
var tiroMovY = 0;
var tiroDisparado = false;

/* Variaveis do alvo ************************************************/
var alvoD = 0;
var alvoPosX = 0;
var alvoPosY = 0;
var alvoMovX = 0;
var alvoMovY = 0;

/* Variaveis do bloco ***********************************************/
var blocoPosX = 0;
var blocoPosY = 0;
var blocoComW = 0;
var blocoAltH = 0;
var blocoMovX = 0;
var blocoMovY = 0;

/* Variaveis da arma ************************************************/
var armaEsqX = 0;
var armaEsqY = 0;
var armaCenX = 0;
var armaCenY = 0;
var armaDirX = 0;
var armaDirY = 0;
var armaAngulo = 0;

/* Variaveis de inicializacao ***************************************/
var tela = "INICIO";
var fase = "INICIO";
var faseSet = true;

function setup(){
    createCanvas(canvaX, canvaY);
    angleMode(DEGREES);
    frameRate(60);
    ConfigFase(fase);
}

function draw(){
    if(tela === "INICIO"){
        background("GREY");

        if(faseSet){
            ConfigFase(fase);
        }

        BotaoJogo     ("JOGO"     ,15 ,"BLACK",canvaX - 120, 25,110,30,"GREEN");
        BotaoControles("CONTROLES",15 ,"BLACK",canvaX - 120, 75,110,30,"ORANGE");
        BotaoCreditos ("CREDITOS" ,15 ,"WHITE",canvaX - 120,125,110,30,"BLACK");
        
        HudDemo();

        Bloco();
        Alvo();
        Arma();
    }

    if(tela === "JOGO"){
        if(vidas > 0){
            background("GREEN");

            if(faseSet){
                ConfigFase(fase);
            }

            Hud();
            Tiro();
            Arma();
            Bloco();
            Alvo();
        }else{
            Hud();
            Caixa("FIM DE JOGO",15,"BLACK",canvaX/2-55,canvaY/2,110,30,"GREY");
        }
        
        BotaoVoltarIniciar("VOLTAR",15,"BLACK",canvaX - 120,canvaY-45,110,30,"GREY")
    }

    if(tela === "CONTROLES") {
        background("ORANGE");

        if(faseSet){
            ConfigFase(fase);
        }

        Caixa("CONTROLES",15,"BLACK",canvaX/2-55,30,110,30,"ORANGE");
        
        textAlign(LEFT);
        text("As teclas Direita e Esquerda controlam\numa arma e a tecla Espaço dispara\nprojéteis para atingir alvos gerados\naleatoriamente.",50,100);
        
        stroke(1);
        line(0, areaJogoY, areaJogoX, areaJogoY);
        Arma();
        Tiro()
        
        BotaoVoltarIniciar("VOLTAR",15,"BLACK",canvaX - 120,canvaY-45,110,30,"GREY")
    }

    if(tela === "CREDITOS") {
        background("BLACK");
        textAlign(CENTER);
        text("DESENVOLVEDOR",250,50);
        text("Aldglyr Dias (aldglyr@outlook.com)",250,100);
        
        BotaoVoltarIniciar("VOLTAR",15,"BLACK",canvaX - 120,canvaY-45,110,30,"GREY")
    }
}

/* FUNCOES DO JOGO **************************************************/
function HudDemo(){
    fill("GREEN");
    noStroke();
    rect(0,0,areaJogoX,areaJogoY);
    stroke(1);
    line(        0, areaJogoY, areaJogoX, areaJogoY);
    line(areaJogoX,        0 , areaJogoX, areaJogoY);
}

function Hud(){
    line(        0, areaJogoY, areaJogoX, areaJogoY);
    line(areaJogoX,        0 , areaJogoX, areaJogoY);
    Caixa(            fase  ,15,"BLACK",10 ,canvaY-45,100,30,"GREY")
    Caixa("PONTOS: "+ pontos,15,"BLACK",120,canvaY-45,100,30,"GREY")
    Caixa("VIDAS: " + vidas ,15,"BLACK",230,canvaY-45,100,30,"GREY")
}

function Arma(){
    /* Limite e incremento do angulo de rotacao *********************/
    if(armaAngulo >= -60 && armaAngulo <= 60){
        if(keyIsDown(LEFT_ARROW) && armaAngulo !== -60){
            armaAngulo--;
        }

        if(keyIsDown(RIGHT_ARROW) && armaAngulo !== 60){
            armaAngulo++;
        }
    }
    
    /* Disparo, sinalizando que foi disparado para nao receber mais 
       comandos de disparos.
        O diametro do tiro eh iniciado zero e criado aqui.
     */
    if(keyIsDown(32)){
        tiroDisparado = true;
        tiroD = 15;
    }

    /* Condicao para atribuir os referenciais de movimento apenas se o
       tiro ainda nao tiver sido disparado
    */
    if(tiroDisparado === false){
        if(armaAngulo < 0){
            tiroMovX = - tiroVel * abs(sin(armaAngulo));
        }else{
            tiroMovX =   tiroVel * abs(sin(armaAngulo));
        }

        tiroMovY     = - tiroVel * cos(armaAngulo);
    }
    
    /* Estrategia de rotacao de objeto do P5, onde se muda o 
       referencial de origem do sistema para o centro do objeto a ser 
       rotacionado. As funcoes push() e pop() isolam os outros 
       elementos dessa mudança de referencial.
    */
    push();
        translate(areaJogoX/2,areaJogoY - 10);
        rotate(armaAngulo);
        fill("SILVER");
        stroke(1);
        triangle(armaEsqX,armaEsqY,
                 armaCenX,armaCenY,
                 armaDirX,armaDirY);
        line(0,-600,armaCenX,armaCenY);
    pop();
    //Caixa("arma " + armaAngulo,15,"BLACK",50,250,110,30,"WHITE")
}

function Tiro(){
    /* Condicao para movimento do tiro ******************************/
    if(tiroDisparado === true){
        if((tiroPosX - tiroD/2) > 0 && (tiroPosX + tiroD/2) < areaJogoX){
            tiroPosX += tiroMovX;
        }else{
            tiroMovX = -tiroMovX;
            tiroPosX += tiroMovX;
        }
        
        if((tiroPosY - tiroD/2) > 0 && (tiroPosY + tiroD/2) < areaJogoY){
            tiroPosY += tiroMovY;
        }else{
            /* Destruicao do tiro pelo fim do trajeto sem acertar o 
               alvo, reconfiguracao da nova tentativa
            */
            tiroD = 0;
            faseSet = true;
            vidas--;
        }
        
        /* Destruicaodo do tiro por acertar no bloco e reconfiguracao
           de nova tentativa.
        */
        if((tiroPosX + tiroD/2) >= (blocoPosX) &&
           (tiroPosX + tiroD/2) <= (blocoPosX + blocoComW) &&
           (tiroPosY + tiroD/2) <= (blocoPosY + blocoAltH) &&
           (tiroPosY + tiroD/2) >= (blocoPosY)){

            tiroD = 0;
            tiroMovX = 0;
            tiroMovY = 0;
            faseSet = true;
            vidas--;
        }
        
        if((tiroPosX + tiroD/2) >= (alvoPosX - alvoD/2) &&
           (tiroPosX + tiroD/2) <= (alvoPosX + alvoD/2) &&
           (tiroPosY + tiroD/2) >= (alvoPosY - alvoD/2) &&
           (tiroPosY + tiroD/2) <= (alvoPosY + alvoD/2)){

            tiroD = 0;
            tiroMovX = 0;
            tiroMovY = 0;
            pontos++;
            
            if(pontos <= pontosMax){
                faseSet = true;
                fase = "FASE " + parseInt(pontos + 1);
            }else{
                Hud();
                Caixa("PARABÉNS",15,"BLACK",canvaX/2-55,canvaY/2,110,30,"GREY");
                
                alvoMovX = 0;
                alvoMovY = 0;
                tiroMovX = 0;
                tiroMovY = 0;
                blocoMovX = 0;
                blocoMovY = 0;
                tiroPosX = 0;
                tiroPosY = 0;
                tiroD = 0;
            }
        }

    fill("BLUE");
    circle(tiroPosX,tiroPosY,tiroD);
    }
}

function Alvo(){
    fill("RED");
    circle(alvoPosX,alvoPosY,alvoD);
    
    if((alvoPosX >= 50) && (alvoPosX + alvoD/ 2) <= (areaJogoX -50)){
        alvoPosX += alvoMovX;
    }else{
        alvoMovX = -alvoMovX;
        alvoPosX += alvoMovX;
    }

    if((alvoPosY >= 25) && (alvoPosY <= 75)){
        alvoPosY += alvoMovY;
    }else{
        alvoMovY = -alvoMovY;
        alvoPosY += alvoMovY;
    }
}

function Bloco(){
    fill("BLACK");
    rect(blocoPosX,blocoPosY,blocoComW,blocoAltH);

    if((blocoPosX >= 75) && (blocoPosX + blocoComW) <= (areaJogoX -75)){
        blocoPosX += blocoMovX;
    }else{
        blocoMovX = -blocoMovX;
        blocoPosX += blocoMovX;
    }

    if((blocoPosY >= 100) && (blocoPosY <= 150)){
        blocoPosY += blocoMovY;
    }else{
        blocoMovY = -blocoMovY;
        blocoPosY += blocoMovY;
    }
}

function ConfigFase(fase) {
    if(fase === "INICIO"){
        areaJogoX = canvaX -130;
        areaJogoY = canvaY - 60;
    
        /* Variaveis da arma ****************************************/
        armaEsqX = -10;
        armaEsqY =  10;
        armaCenX =   0;
        armaCenY = -15;
        armaDirX =  10;
        armaDirY =  10;
        armaAngulo = 0;

        /* Variaveis do alvo ****************************************/
        alvoD = 40;
        alvoPosX = areaJogoX/ 2;
        alvoPosY = 50;
        alvoMovX = 1;
        alvoMovY = 1;
        
        /* Variaveis do bloco ***************************************/
        blocoPosX = areaJogoX/2;
        blocoPosY = 100;
        blocoComW = 50;
        blocoAltH = 10;
        blocoMovX = -1;
        blocoMovY = -1;
        
        /* Variaveis de inicializacao *******************************/
        faseSet = false;
    }
    
    if(fase === "CONTROLES"){
        areaJogoX = canvaX;
        areaJogoY = canvaY - 60;

        /* Variaveis da arma ****************************************/
        armaEsqX = -10;
        armaEsqY =  10;
        armaCenX =   0;
        armaCenY = -15;
        armaDirX =  10;
        armaDirY =  10;
        armaAngulo = 0;

        /* Variaveis do projetil ************************************/
        tiroD = 0;
        tiroVel = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - 10;
        tiroMovX = -1;
        tiroMovY = -1;
        tiroDisparado = false;
        
        /* Variaveis de inicializacao *******************************/
        faseSet = false;
    }

    if(fase === "FASE 1"){
        areaJogoX = canvaX;
        areaJogoY = canvaY - 60;
    
        /* Variaveis da arma ****************************************/
        armaEsqX = -10;
        armaEsqY =  10;
        armaCenX =   0;
        armaCenY = -15;
        armaDirX =  10;
        armaDirY =  10;
        armaAngulo = 0;

        /* Variaveis do projetil ************************************/
        tiroD = 0;
        tiroVel = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - 10;
        tiroMovX = -1;
        tiroMovY = -1;
        tiroDisparado = false;

        /* Variaveis do alvo ****************************************/
        alvoD = 50;
        alvoPosX = random(50,areaJogoX -50);
        alvoPosY = random(25,75);
        alvoMovX = -1;
        alvoMovY = -1;
        
        /* Variaveis do bloco ***************************************/
        blocoPosX = areaJogoX/2;
        blocoPosY = 125;
        blocoComW = 75;
        blocoAltH = 20;
        blocoMovX = 1;
        blocoMovY = 0;
        
        /* Variaveis de inicializacao *******************************/
        faseSet = false;
    }
    if(fase === "FASE 2"){
        areaJogoX = canvaX;
        areaJogoY = canvaY - 60;
    
        /* Variaveis da arma ****************************************/
        armaEsqX = -10;
        armaEsqY =  10;
        armaCenX =   0;
        armaCenY = -15;
        armaDirX =  10;
        armaDirY =  10;
        armaAngulo = 0;

        /* Variaveis do projetil ************************************/
        tiroD = 0;
        tiroVel = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - 10;
        tiroMovX = -1;
        tiroMovY = -1;
        tiroDisparado = false;

        /* Variaveis do alvo ****************************************/
        alvoD = 40;
        alvoPosX = random(50,areaJogoX -50);
        alvoPosY = random(25,75);
        alvoMovX = 2;
        alvoMovY = 1;
        
        /* Variaveis do bloco ***************************************/
        blocoPosX = areaJogoX/2;
        blocoPosY = 125;
        blocoComW = 150;
        blocoAltH = 20;
        blocoMovX = 2;
        blocoMovY = 0;
        
        /* Variaveis de inicializacao *******************************/
        faseSet = false;
    }
    if(fase === "FASE 3"){
        areaJogoX = canvaX;
        areaJogoY = canvaY - 60;
    
        /* Variaveis da arma ****************************************/
        armaEsqX = -10;
        armaEsqY =  10;
        armaCenX =   0;
        armaCenY = -15;
        armaDirX =  10;
        armaDirY =  10;
        armaAngulo = 0;

        /* Variaveis do projetil ************************************/
        tiroD = 0;
        tiroVel = 15;
        tiroPosX = areaJogoX/2;
        tiroPosY = areaJogoY - 10;
        tiroMovX = -2;
        tiroMovY = -1;
        tiroDisparado = false;

        /* Variaveis do alvo ****************************************/
        alvoD = 30;
        alvoPosX = random(50,areaJogoX -50);
        alvoPosY = random(25,75);
        alvoMovX = 2;
        alvoMovY = 2;
        
        /* Variaveis do bloco ***************************************/
        blocoPosX = areaJogoX/2;
        blocoPosY = 125;
        blocoComW = 125;
        blocoAltH = 20;
        blocoMovX = 3;
        blocoMovY = 1;
        
        /* Variaveis de inicializacao *******************************/
        faseSet = false;
    }
}

/* BOTOES ***********************************************************/
function BotaoJogo(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    if(Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor)){
        /* Define as variaveis de inicio do jogo aqui para permitir a 
           tentativa das outras vidas sem redefinir tudo de novo.
        */
        tela = "JOGO";
        fase = "FASE 1"
        vidas = 5;
        jogada = 0;
        pontos = 0;
        pontosMax = 3;
        ConfigFase(fase);
    }
}

function BotaoControles(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    if(Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor)){
        tela = "CONTROLES";
        fase = "CONTROLES";
        faseSet = true;
        vidas = 1;
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
        fase = "INICIO";
        ConfigFase(fase);
    }
}

/* FUNCOES AUXILIARES ***********************************************/
function Botao(texto, textoTamanho, textoCor, retX, retY, retC, retA, retCor){
    /* Construcao do botao ******************************************/
    textSize(textoTamanho);
    fill(retCor);
    stroke(1);
    rect(retX, retY, retC, retA);
    fill(textoCor);
    textAlign(CENTER);
    text(texto, retX + retC / 2, retY + retA - 10);
    
    /* Verificacao de clique no interior do botao *******************/
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
    /* Construcao do botao ******************************************/
    textSize(textoTamanho);
    fill(retCor);
    noStroke();
    rect(retX, retY, retC, retA);
    fill(textoCor);
    textAlign(CENTER);
    text(texto, retX + retC / 2, retY + retA - 10);
}