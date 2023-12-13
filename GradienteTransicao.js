/**
 * Uma classe JavaScript  que possibilita fazer transição em gradiente uma vez que o CSS não consegue fazer com transition e linear-gradient.
 *
 * @author Valério Luz Hasman Junior
 * @version 2.0.0
 */
class GradienteTransicao {

  /**
   * @type {Element}
   */
  #alvo;
  #inicio = String();
  #final = String();
  #segundos = Number(4);
  #eventTarget = new EventTarget();
  #tipoDeRotacao = String();
  #ondeParou = Array();
  #funcao = null;
  #ehUmLoop = Boolean(false) ;
  #interruptor = Boolean(false);
  #rodando = Boolean(false);
  #idaEVolta = Boolean(false);
  #esperaDeExecucao = Boolean(false);
  #porcentagemTempo = 1;

  constructor(alvo = this.alvo, inicio = this.inicio, final = this.final){
    this.alvo = alvo;
    this.inicio = inicio;
    this.final = final;
  }

  set inicio(valor){
    this.#inicio = String(valor);
  }
  set final(valor){
    this.#final = String(valor);
  }
  set alvo(valor){
    if(valor instanceof Element){
      this.#alvo = valor;
    } else {
      throw new TypeError('alvo deve ser uma instância de Element');
    }
  }
  set segundos(valor){
    this.#segundos = Number(valor);
  }
  set ehUmLoop(valor){
    if(this.#idaEVolta){
      console.warn('"ehUmLoop" não pode rodar porque "idaEVolta" está ligado.');
    } else {
      this.#ehUmLoop = Boolean(valor);
      if(this.#ehUmLoop){
        this.#eventTarget.addEventListener('finalizado', this.#executarLoop);
      } else {
        this.#eventTarget.removeEventListener('finalizado', this.#executarLoop);
      }
    }
  }
  set idaEVolta(valor){
    if(this.#ehUmLoop){
      console.warn('"idaEVolta" não pode rodar porque "ehUmLoop" está ligado.');
    } else {
      this.#idaEVolta = Boolean(valor);
      if(this.#idaEVolta){
        this.#eventTarget.addEventListener('finalizado', this.#executaridaEVolta);
      } else {
        this.#eventTarget.removeEventListener('finalizado', this.#executaridaEVolta);
      }
    }
  }
  set interruptor(valor){
    this.#interruptor = Boolean(valor);
  }
  set tipoDeRotacao(valor){
    this.#tipoDeRotacao = String(valor);
  }

  get inicio(){
    return this.#inicio;
  }
  get final(){
    return this.#final;
  }
  get intermedio(){
    return this.#ondeParou;
  }
  get alvo(){
    return this.#alvo;
  }
  get segundos(){
    return this.#segundos;
  }
  get ehUmLoop(){
    return this.#ehUmLoop;
  }
  get interruptor(){
    return this.#interruptor;
  }
  get idaEVolta(){
    return this.#idaEVolta;
  }
  get rodando(){
    return this.#rodando;
  }
  get tipoDeRotacao(){
    return this.#tipoDeRotacao;
  }
  get ondeParou(){
    return GradienteTransicao.recomporLG(this.#ondeParou);
  }

  static aguardar(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  #executaridaEVolta = ()=>{
    if(!this.#interruptor){
      const troca = this.#final;
      this.#final = this.#inicio;
      this.#inicio = troca;
      this.executar();
    }
  }

  #executarLoop = ()=>{
    if(!this.#interruptor){
      this.executar();
    }
  }

  #executarDaFila = ()=>{
    this.#esperaDeExecucao = false;
    this.executar();
    this.#eventTarget.removeEventListener('finalizado', this.#executarDaFila);
  }

  executar(){
    if(!this.#rodando){
      this.#rodando = true;
      this.#interruptor = false;
      this.mudaCor();
    } else if(!this.#esperaDeExecucao) {
      this.#esperaDeExecucao = true;
      this.#eventTarget.addEventListener('finalizado', this.#executarDaFila);
    } else {
      // fila lotada
    }
  }

  async mudaCor(){

    let milesegundos;
    let inicio;
    const comecoMilesegundos = new Date().getTime();

    if(this.#porcentagemTempo < 1 && ( this.#idaEVolta ^ this.#ehUmLoop )){
      inicio = this.#ondeParou;
      milesegundos = this.#segundos * 1000 * (1 - this.#porcentagemTempo);
    } else {
      inicio = GradienteTransicao.decomporLG(this.#inicio);
      milesegundos = this.#segundos * 1000 * this.#porcentagemTempo;
    }

    const final = GradienteTransicao.decomporLG(this.#final);
    this.#ondeParou = GradienteTransicao.clonarVetor(inicio);

    for(let intervaloTempo = 0 ; intervaloTempo <= milesegundos && !this.interruptor; intervaloTempo = new Date().getTime() - comecoMilesegundos){

      const porcentagemTempo = this.corrigirImprecisao( intervaloTempo / milesegundos );

      this.#porcentagemTempo = porcentagemTempo;

      this.alvo.style.background = GradienteTransicao.recomporLG(this.#ondeParou);

      this.#ondeParou.forEach((valor, index) => {
        valor.forEach((valSub, indSub)=>{

          const numeroInicial = Number(inicio[index][indSub]);
          const numeroFinal = Number(final[index][indSub]);

          let novoValor = 0;
          let intervalo = 0;

          if(numeroInicial > numeroFinal){
            intervalo = numeroInicial - numeroFinal;
            novoValor = this.corrigirImprecisao(numeroInicial - intervalo * porcentagemTempo);
          } else {
            intervalo = numeroFinal - numeroInicial;
            novoValor = this.corrigirImprecisao(numeroInicial + intervalo * porcentagemTempo);
          }
          this.#ondeParou[index][indSub] = novoValor;

        });
      });
      if(!this.#interruptor){
        await GradienteTransicao.aguardar();
      }
    }
    this.#rodando = false;
    if(!this.#interruptor){
      this.#ondeParou = [];
      this.#porcentagemTempo = 1;
      this.alvo.style.background = this.#final;
    }
    this.#eventTarget.dispatchEvent(new Event('finalizado'));
  }

  /**
   * @param {!number} numero
   * @returns {!number}
   */
  corrigirImprecisao(numero = 0){
    return Number((numero).toFixed(13));
  }

  static decomporLG(str){
    str = str.substring(str.indexOf('(') + 1, str.lastIndexOf(')'));
    let arr = str.split( /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/ ) ;
    let valores = [];

    arr.forEach((valor) => {
      let dado = valor.split( /[a-zA-Z(), %]+/ );

      dado.forEach((v, i) => {
        if(v === ''){
          dado.splice(i, 1);
        }
      });
      dado.forEach((v, i) => {
        dado.splice(i, 1, Number(v))
      });
      if(dado.length === 4){
        dado.splice(3, 0, 1);
      }
      valores.push(dado);
    });

    return valores;
  }

  static recomporLG(array){
    let lg = ``;

    array.forEach((subArr, index)=>{
      if(index === 0){
        lg += `${subArr[0]}deg`;
      } else {
        lg += `rgba(${subArr[0]}, ${subArr[1]}, ${subArr[2]}, ${subArr[3]}) ${subArr[4]}%`;
      }
      if(array[index + 1] != undefined){
        lg += `, `;
      } else {
        lg = `linear-gradient(${lg})`;
      }
    });

    return lg;
  }

 //interruptor(){
 //  return interruptor;
 //}

  static clonarVetor(vetor = []) {
    const novoVetor = Array();
    vetor.forEach((dado) => {
      if(Array.isArray(dado)){
        novoVetor.push( GradienteTransicao.clonarVetor(dado) );
      } else {
        novoVetor.push(dado);
      }
    });
    return novoVetor;
  }
  
  esperarDeRodar(funcao = Function()){
    if(typeof funcao === typeof Function() ){
      this.#funcao = ()=>{
        if(this.#interruptor){
          this.#porcentagemTempo = 1;
        } else {
          funcao();
        }
      };
      this.#eventTarget.addEventListener('finalizado', this.#rodaDaEspera);
    } else {
      throw new TypeError('funcao deve ser uma função.');
    }
  }

  #rodaDaEspera = (funcao = Function()) => {
    this.#funcao();
    //this.#eventTarget.removeEventListener('finalizado', this.#rodaDaEspera);
  }

  toString(){
    return JSON.stringify(
      {
        alvo: this.alvo.id,
        inicio: this.inicio,
        intermedio: GradienteTransicao.recomporLG(this.#ondeParou),
        final: this.final,
        segundos: this.#segundos,
        ehUmLoop: this.ehUmLoop,
        interruptor: this.interruptor,
        idaEVolta: this.idaEVolta,
        rodando: this.#rodando,
        tipoDeRotacao: this.tipoDeRotacao,
      },
      0,
      2
    );
  }

}