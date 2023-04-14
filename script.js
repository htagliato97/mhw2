function main(event)
{   
    let vettore_elementi=[];
    const elemento=event.currentTarget;
    vettore_elementi=controlla_domanda(elemento);
    aggiorna_grafica(vettore_elementi,elemento);
    aggiorna_valori(elemento);
    if(controllo_fine())
        risultato();
}

function controlla_domanda(element){
    let vettore=[];
    const num_domanda=element.dataset.questionId;
    for(const risposta of risposte)
        if(risposta.dataset.questionId===num_domanda)
            vettore.push(risposta);
    return vettore;
}

function aggiorna_grafica(vettore,element){
    for(const risposta of vettore){
        if (risposta.classList.contains('checked')){
            uncheckbox(risposta);
        }
        if(risposta!==element)
            risposta.classList.add('opacity'); 
        else{
            risposta.classList.remove('opacity');
            checkbox(element);
        }
    }
}

function aggiorna_valori(element){
    const num_domanda=element.dataset.questionId;
    const risposta=element.dataset.choiceId;
    selected_boxes.add(num_domanda);
    switch(num_domanda){
        case 'one':
            selected_answer.splice(0,1);
            selected_answer.splice(0,0,risposta);
            break;
        case 'two':
            selected_answer.splice(1,1);
            selected_answer.splice(1,0,risposta);
            break;
        case 'three':
            selected_answer.splice(2,1);
            selected_answer.splice(2,0,risposta);
            break;
    }
}

function controllo_fine(){
    let i=0
    for(const box of selected_boxes)
        if(box!==undefined)
            i++;
    if(i===3)
        return true;
    else
        return false;
}

function risultato(){
    const risposta_finale=calcolo_risposta();
    for(const risposta of risposte){
        risposta.removeEventListener('click',main);
    }
    crea_grafica_risultato(RESULTS_MAP[risposta_finale]);
}

function checkbox(element){
    const checkin = document.createElement('img');
    checkin.src="./images/checked.png";
    checkin.classList.add("checkbox");
    const box=element.querySelector('.checkbox');
    box.remove();
    element.appendChild(checkin);
    element.classList.add("checked");
    element.removeEventListener('click',main);
    
}

function uncheckbox(element){
    const uncheck = document.createElement('img');
    uncheck.src="./images/unchecked.png";
    uncheck.classList.add("checkbox");
    const box=element.querySelector('.checkbox');
    box.remove();
    element.appendChild(uncheck);
    element.classList.remove("checked");
    element.addEventListener('click',main);
}

function calcolo_risposta(){
    if(selected_answer[1]===selected_answer[2])
        return selected_answer[1];
    return selected_answer[0];
}

function crea_grafica_risultato(elemento){
    const final_div=document.querySelector('.finale_prima');
    const title=elemento.title;
    const titolo=document.createElement('h1');
    titolo.classList.add('title');
    titolo.textContent=title;
    const paragrafo=document.createElement('p');
    paragrafo.classList.add('text');
    paragrafo.textContent=elemento.contents;
    const bottone=document.createElement('button');
    bottone.textContent="Ricomincia il quiz";
    bottone.addEventListener('click',ricomincia);
    final_div.appendChild(titolo);
    final_div.appendChild(paragrafo);
    final_div.appendChild(bottone);
    final_div.classList.add('finale_dopo');
}

function ricomincia(){
    selected_boxes=new Set();
    selected_answer=[undefined,undefined,undefined];
    document.body.innerHTML = initialPageHTML;
    risposte = document.querySelectorAll('.choice-grid div');
    for(const risposta of risposte){
        risposta.addEventListener('click',main);
    }
    window.scrollTo(0, 0);

}

let risposte=document.querySelectorAll('.choice-grid div');
const initialPageHTML = document.body.innerHTML;
let selected_boxes=new Set();
let selected_answer=[undefined,undefined,undefined];

for(const risposta of risposte){
    risposta.addEventListener('click',main);
}