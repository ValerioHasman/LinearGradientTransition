'use strict'

function executar1(btn){
  function ex(){
    lg.inicio = 'linear-gradient(360deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 0%)';
    lg.final =  'linear-gradient(360deg, rgba(0,255, 0,1) 0%, rgba(0,0,255,1) 100%)';
    lg.executar();
    lg.esperarDeRodar(ex2);
  }
  function ex2(){
    lg.inicio = 'linear-gradient(360deg, rgba(0,255, 0,1) 0%, rgba(0,0,255,1) 100%)';
    lg.final =  'linear-gradient(360deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 0%)';
    lg.executar();
    lg.esperarDeRodar(ex3);
  }
  function ex3(){
    lg.inicio = 'linear-gradient(360deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 0%)';
    lg.final =  'linear-gradient(360deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 100%)';
    lg.executar();
    lg.esperarDeRodar(ex4);
  }
  function ex4(){
    lg.inicio = 'linear-gradient(360deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 100%)';
    lg.final =  'linear-gradient(360deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 0%)';
    lg.executar();
    lg.esperarDeRodar(ex);
  }

  btn.disabled = true;

  let lg = new GradienteTransicao(document.getElementById('primeiro'));
  lg.inicio = 'linear-gradient(360deg, rgba(0,255, 0,1) 0%, rgba(0,0,255,1) 100%)';
  lg.final =  'linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 0%)';
  lg.idaEVolta = false;
  lg.ehUmLoop = false;
  lg.tipoDeRotacao = 'ease';
  lg.executar();
  lg.esperarDeRodar(ex);

}

function executar2(btn){
  btn.disabled = true;
  let lg = new GradienteTransicao(document.getElementById('segundo'));
  lg.inicio = 'linear-gradient(45deg, rgba(26, 67, 92, 0.5) 0%, rgba(8, 142, 46, 0.5) 100%)';
  lg.final =  'linear-gradient(45deg, rgba(8, 142, 46, 0.5) 0%, rgba(26, 67, 92, 0.5) 100%)';
  lg.idaEVolta = true;
  lg.ehUmLoop = true;
  lg.tipoDeRotacao = 'ease';
  lg.executar(700);
}

function executar3(btn){
  btn.disabled = true;
  let lg = new GradienteTransicao(document.getElementById('terceiro'));
  lg.inicio = 'linear-gradient(360deg, rgb(179, 62, 62) 10%, rgb(72, 193, 72) 10%, rgb(84, 255, 232) 100%)';
  lg.final =  'linear-gradient(360deg, rgb(179, 62, 62) 100%, rgb(72, 193, 72) 100%, rgb(84, 255, 232) 100%)';
  lg.idaEVolta = false;
  lg.ehUmLoop = true;
  lg.tipoDeRotacao = 'ease';
  lg.executar(700);
}

(()=>{
  let alvo = document.getElementById('hoverDiv1');
  let lg = new GradienteTransicao(alvo);
  lg.tipoDeRotacao = 'ease';
  lg.idaEVolta = true;
  lg.ehUmLoop = false;

  alvo.addEventListener('mouseenter',()=>{
    lg.inicio = 'linear-gradient(72deg, rgba(0,255,255,0.1) 0%, rgba(0,0,255,1) 5%, rgba(0,255,255,0.1) 10%)';
    lg.final =  'linear-gradient(45deg, rgba(0,255,255,0.1) 100%, rgba(0,0,255,1) 100%, rgba(0,255,255,0.1) 100%)';
    lg.executar(100);
  });
  alvo.addEventListener('mouseout',()=>{
    lg.interruptor = true;
    lg.inicio = 'linear-gradient(72deg, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 100%)';
    lg.final =  'linear-gradient(72deg, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 100%)';
    lg.executar(1);
  });
})();


(()=>{
  let alvo = document.getElementById('hoverDiv2');
  let lg = new GradienteTransicao(alvo);
  lg.tipoDeRotacao = 'easeIn';
  lg.idaEVolta = true;
  lg.ehUmLoop = false;

  alvo.addEventListener('mouseout',()=>{
    lg.interruptor = true;
    lg.inicio = 'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,0) 0%, rgba(235,141,73,0) 100%)';
    lg.executar(50);
  });
  alvo.addEventListener('mouseenter',()=>{
    lg.inicio = 'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    lg.executar(1);
  });
})();

(()=>{
  let alvo = document.getElementById('hoverDiv3');
  let lg = new GradienteTransicao(alvo);
  lg.tipoDeRotacao = 'ease';
  lg.idaEVolta = true;
  lg.ehUmLoop = false;

  alvo.addEventListener('mouseenter',()=>{
    if(lg.ondeParou == ''){
      lg.inicio = 'linear-gradient(45deg, rgba(144,98,61,0) 0%, rgba(235,141,73,0) 100%)';
    } else {
      lg.inicio = lg.ondeParou;
    }
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    lg.executar(100);
  });
  alvo.addEventListener('mouseout',()=>{
    lg.interruptor = true;
    if(lg.ondeParou == ''){
      lg.inicio = 'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    } else {
      lg.inicio = lg.ondeParou;
    }
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,0) 0%, rgba(235,141,73,0) 100%)';
    lg.executar(100);
  });
})();

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))