'use strict';

function executaAoTocar(btn, funcao){
  if('ontouchstart' in window){
    btn.addEventListener('touchstart', funcao, {passive: false});
  } else {
    btn.addEventListener('mousedown', funcao, {passive: false});
  }
}

(()=>{

  const lg = new GradienteTransicao(document.getElementById('primeiro'));
  lg.inicio = 'linear-gradient(360deg, rgba(0,255, 0,1) 0%, rgba(0,0,255,1) 100%)';
  lg.final =  'linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 0%)';

  const btnInicializa = document.getElementById('btnPrimeiroInicializa');
  const btnFinaliza = document.getElementById('btnPrimeiroFinaliza');

  executaAoTocar(btnInicializa, ()=>{
    btnInicializa.disabled = true;
    btnFinaliza.disabled = false;
    executar();
  });

  executaAoTocar(btnFinaliza, ()=>{
    btnFinaliza.disabled = true;
    btnInicializa.disabled = false;
    lg.interruptor = true;
  });

  function executar(){

    lg.executar();

    lg.esperarDeRodar(ex);

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
  
  }
})();

(()=>{

  const lg = new GradienteTransicao(document.getElementById('segundo'));
  lg.inicio = 'linear-gradient(45deg, rgba(0, 170, 255, 0.1) 15%, rgba(170, 255, 0, 0.7) 100%)';
  lg.final =  'linear-gradient(45deg, rgba(170, 255, 0, 0.7) 0%, rgba(0, 170, 255, 0.1) 85%)';
  lg.idaEVolta = true;

  const btnInicializa = document.getElementById('btnSegundoInicializa');
  const btnFinaliza = document.getElementById('btnSegundoFinaliza');

  executaAoTocar(btnInicializa, ()=>{
    btnInicializa.disabled = true;
    btnFinaliza.disabled = false;
    lg.executar();
  });

  executaAoTocar(btnFinaliza, ()=>{
    btnFinaliza.disabled = true;
    btnInicializa.disabled = false;
    lg.interruptor = true;
  });

})();

(()=>{
  const lg = new GradienteTransicao(document.getElementById('terceiro'));
  lg.inicio = 'linear-gradient(360deg, rgb(179, 62, 62) 10%, rgb(72, 193, 72) 10%, rgb(84, 255, 232) 100%)';
  lg.final =  'linear-gradient(360deg, rgb(179, 62, 62) 100%, rgb(72, 193, 72) 100%, rgb(84, 255, 232) 100%)';
  lg.ehUmLoop = true;

  const btnInicializa = document.getElementById('btnTerceiroInicializa');
  const btnFinaliza = document.getElementById('btnTerceiroFinaliza');

  executaAoTocar(btnInicializa, ()=>{
    btnInicializa.disabled = true;
    btnFinaliza.disabled = false;
    lg.executar();
  });

  executaAoTocar(btnFinaliza, ()=>{
    btnFinaliza.disabled = true;
    btnInicializa.disabled = false;
    lg.interruptor = true;
  });

})();


(()=>{
  const alvo = document.getElementById('hoverDiv1');
  const lg = new GradienteTransicao(alvo);

  alvo.addEventListener('mouseenter',()=>{
    lg.interruptor = true;
    lg.segundos = 2;
    lg.inicio = 'linear-gradient(72deg, rgba(0,255,255,0.1) 0%, rgba(0,0,255,1) 5%, rgba(0,255,255,0.1) 10%)';
    lg.final =  'linear-gradient(45deg, rgba(0,255,255,0.1) 100%, rgba(0,0,255,1) 100%, rgba(0,255,255,0.1) 100%)';
    lg.executar();
  });
  alvo.addEventListener('mouseout',()=>{
    lg.interruptor = true;
    lg.segundos = 0;
    lg.inicio = 'linear-gradient(72deg, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 100%)';
    lg.final =  'linear-gradient(72deg, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 100%)';
    lg.executar();
  });
})();

(()=>{
  const alvo = document.getElementById('hoverDiv2');
  const lg = new GradienteTransicao(alvo);

  alvo.addEventListener('mouseout',()=>{
    lg.interruptor = true;
    lg.segundos = 1;
    lg.inicio = 'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,0) 0%, rgba(235,141,73,0) 100%)';
    lg.executar();
  });
  alvo.addEventListener('mouseenter',()=>{
    lg.interruptor = true;
    lg.segundos = 0;
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    lg.executar();
  });
})();

(()=>{
  const alvo = document.getElementById('hoverDiv3');
  const lg = new GradienteTransicao(alvo);
  lg.segundos = 1;

  alvo.addEventListener('mouseenter',()=>{
    lg.interruptor = true;
    if(lg.ondeParou == ''){
      lg.inicio = 'linear-gradient(45deg, rgba(144,98,61,0) 0%, rgba(235,141,73,0) 100%)';
    } else {
      lg.inicio = lg.ondeParou;
    }
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    lg.executar();
  });
  alvo.addEventListener('mouseout',()=>{
    lg.interruptor = true;
    if(lg.ondeParou == ''){
      lg.inicio = 'linear-gradient(45deg, rgba(144,98,61,1) 0%, rgba(235,141,73,1) 100%)';
    } else {
      lg.inicio = lg.ondeParou;
    }
    lg.final =  'linear-gradient(45deg, rgba(144,98,61,0) 0%, rgba(235,141,73,0) 100%)';
    lg.executar();
  });
})();

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
