class GradienteTransicao {
  #alvo = Object();
  #inicio = String();
  #final = String();
  #tipoDeRotacao = String();
  #intermedio = Array();
  #iteravel = Array();
  #fracao = Number();
  #desacelera = Number();
  #iteracao = Number(500);
  #ehUmLoop = false;
  #interruptor = false;
  #rodando = false;
  #idaEVolta = false;

  constructor(alvo = this.alvo, inicio = this.inicio, final = this.final){
    this.alvo = alvo;
    this.inicio = inicio;
    this.final = final;
  }

  set inicio(valor){
    this.interruptor = true;
    this.#inicio = String(valor);
  }
  set final(valor){
    this.interruptor = true;
    this.#final = String(valor);
  }
  set alvo(valor){
    this.#alvo = valor;
  }
  set intervalo(valor = 500){
    this.#interruptor = true;
    this.#fracao = Number((1 / Number(valor)).toFixed(13));
    this.#iteracao = Number(valor);
  }
  set ehUmLoop(valor){
    this.#ehUmLoop = (valor == true);
  }
  set interruptor(valor){
    this.#rodando = false;
    this.#interruptor = (valor == true);
  }
  set idaEVolta(valor){
    this.#idaEVolta = (valor == true);
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
  get alvo(){
    return this.#alvo;
  }
  get intervalo(){
    return this.#iteracao;
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
    return this.recomporLG(this.#intermedio);
  }

  static aguardar(ms = 1) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  desaceleracao(i = 0){
    let metade = this.#iteracao/2;
    switch (this.tipoDeRotacao) {
      case 'ease':
        return (i < metade ? this.#desacelera-- : i > this.#iteracao - metade ? ++this.#desacelera : 0)/30;
      case 'easeIn':
        return (i < metade ? this.#desacelera-- : 0)/30;
      case 'easeOut':
        return (i < metade ? 0 : ++this.#desacelera)/30;
      default:
        return 1;
    }
  }

  async pintar() {
    let volta = false;
    this.#desacelera = this.#iteracao/2;
    do{
      if(!this.idaEVolta){
        volta = false;
        this.#intermedio = this.decomporLG(this.inicio);
      }
      for (let i = 0; i <= this.#iteracao && !this.interruptor; i++) {
        this.alvo.style.background = this.recomporLG(this.#intermedio);
        this.#intermedio.forEach((valor, index) => {
          valor.forEach((valSub, indSub)=>{
            if(volta){
              this.#intermedio[index][indSub] = Number((this.#intermedio[index][indSub] + (this.#iteravel[index][indSub][1] ?
                                                                                          -this.#iteravel[index][indSub][0] :
                                                                                          +this.#iteravel[index][indSub][0])).toFixed(13));
            } else {
              this.#intermedio[index][indSub] = Number((this.#intermedio[index][indSub] + (this.#iteravel[index][indSub][1] ?
                                                                                          +this.#iteravel[index][indSub][0] :
                                                                                          -this.#iteravel[index][indSub][0])).toFixed(13));
            }
          });
        });
        await GradienteTransicao.aguardar(this.desaceleracao(i));
      }
      if(this.ehUmLoop){
        volta = !volta;
      }
    } while (this.ehUmLoop && !this.interruptor);
    this.#rodando = false;
  }

  decomporLG(str){
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

  recomporLG(array){
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

  executar(intervalo = this.intervalo){
    if(!this.#rodando){
      this.intervalo = intervalo;
      this.interruptor = false;
      this.#rodando = true;
      let inicioArr = this.decomporLG(this.inicio);
      let finalArr = this.decomporLG(this.final);
      this.#intermedio = inicioArr;
      this.valorIteravelParalelo(inicioArr, finalArr);
      this.pintar();
    }
  }

  valorIteravelParalelo(arr1, arr2){

    this.#iteravel = [];

    arr1.forEach((arrSub, index) => {
      arrSub.forEach((valor, indSub)=>{

        if(this.#iteravel[index] == undefined){
          this.#iteravel[index] = [];
        }

        this.#iteravel[index][indSub] = this.fimMaior(arr1[index][indSub], arr2[index][indSub]);

      });
    });
  }
  
  fimMaior(ini, fim){
    if(ini > fim){
      return [(ini-fim) * this.#fracao, false];
    }
    if(ini <= fim){
      return [(fim-ini) * this.#fracao, true];
    }
  }

  async esperarDeRodar(funcao = function(){}){
    this.ehUmLoop = false;
    if(this.rodando){
      while(this.rodando && !this.interruptor){
        await GradienteTransicao.aguardar(1);
      }
      if(!this.interruptor){
        funcao();
      }
    }
  }
  
  toString(){
    return JSON.stringify(
      {
        alvo: this.alvo.id,
        inicio: this.inicio,
        final: this.final,
        intervalo: this.intervalo,
        ehUmLoop: this.ehUmLoop,
        interruptor: this.interruptor,
        idaEVolta: this.idaEVolta,
        rodando: this.rodando,
        tipoDeRotacao: this.tipoDeRotacao,
      },
      0,
      2
    );
  }

}