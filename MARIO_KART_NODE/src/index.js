import { personagem } from "./data/players.js";
import { tracks } from "./data/tracks.js";
async function getPersonagem(){
    return personagem[Math.floor(Math.random() * personagem.length)];
}
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}
async function rollTrack(){
    const track = Math.floor(Math.random() * tracks.length);
    return tracks[track];
}
function espace(){
    console.log("--------------------------------");
}
async function Points(pontos1, pontos2, personagem1, personagem2){
    if(pontos1 > pontos2){
        if(personagem2.pontos > 0){
            personagem2.pontos--;
        }
        espace();
        console.log(`${personagem1.nome} ganhou a volta`);
        personagem1.pontos = personagem1.pontos + 1;
        console.log(`${personagem1.nome} tem ${personagem1.pontos} pontos e ${personagem2.nome} tem ${personagem2.pontos} pontos`);
        espace();
    }else if(pontos2 > pontos1){
        if(personagem1.pontos > 0){
            personagem1.pontos--;
        }
        espace();
        console.log(`${personagem2.nome} ganhou a volta`);
        personagem2.pontos = personagem2.pontos + 1;
        console.log(`${personagem2.nome} tem ${personagem2.pontos} pontos e ${personagem1.nome} tem ${personagem1.pontos} pontos`);
        espace();
    }else{
        console.log("Empate");
        espace();
        console.log(`${personagem1.nome} tem ${personagem1.pontos} pontos e ${personagem2.nome} tem ${personagem2.pontos} pontos`);
        espace();
    }
}

async function getWinner(personagem1, personagem2){
    if(personagem1.pontos > personagem2.pontos){
        console.log(`${personagem1.nome} ganhou a corrida`);
    }else if(personagem2.pontos > personagem1.pontos){
        console.log(`${personagem2.nome} ganhou a corrida`);
    }else{
        console.log("Empate");
    }
}
async function getPoints(personagem1, personagem2, track){
    let pontos1 = 0;
    let pontos2 = 0;
    let dados1 = 0;
    let dados2 = 0;
    let personagemValue1 = 0;
    let personagemValue2 = 0;
    dados1 = await rollDice();
    dados2 = await rollDice();
    if (track.tipo === "velocidade"){

        personagemValue1 = personagem1.velocidade
        pontos1 = personagemValue1 + dados1;

        personagemValue2 = personagem2.velocidade
        pontos2 = personagemValue2 + dados2;
    }else if (track.tipo === "manobrabilidade"){
        personagemValue1 = personagem1.manobrabilidade
        pontos1 = personagemValue1 + dados1;

        personagemValue2 = personagem2.manobrabilidade
        pontos2 = personagemValue2 + dados2;
    }else if (track.tipo === "poder"){
        personagemValue1 = personagem1.poder
        pontos1 = personagemValue1 + dados1;

        personagemValue2 = personagem2.poder
        pontos2 = personagemValue2 + dados2;
    }
    return {pontos1, pontos2,dados1,dados2};
}

async function PlayRaceEngine(personagem1, personagem2){
    for(let i = 0; i <  5; i++){
        console.log(`Volta ${i + 1}`);
        const track = await rollTrack();
        console.log(`A pista é ${track.nome}`);
        const {pontos1, pontos2, dados1, dados2} = await getPoints(personagem1, personagem2, track);
        console.log(`${personagem1.nome} tirou ${dados1} e ${personagem2.nome} tirou ${dados2}`);
        console.log(`${personagem1.nome} tem ${pontos1} pontos e ${personagem2.nome} tem ${pontos2} pontos`);
        espace();
        await Points(pontos1, pontos2, personagem1, personagem2);

    }
}

(async function main(){
   console.log("Corrida de Kart");
   espace();
   const personagem1 = await getPersonagem();
   const personagem2 = await getPersonagem();
   console.log(`Você escolheu o personagem: ${personagem1.nome} vs ${personagem2.nome}`);
   espace();
   await PlayRaceEngine(personagem1, personagem2);
   await getWinner(personagem1, personagem2);
})()

