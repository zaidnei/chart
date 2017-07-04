
const valor = document.querySelector('div.values'),
minimo = document.querySelector('div.minimo'),
maximo = document.querySelector('div.maximo'),
mediana = document.querySelector('div.mediana'),
media = document.querySelector('div.media'),
amplitude = document.querySelector('div.amplitude'),
columns = document.querySelector('div.columns'),
desvio = document.querySelector('div.desvio'),
firstForm = document.querySelector('form.first'),
secondForm = document.querySelector('form.second'),
nc = document.querySelector('div.nc'),
escrever = document.querySelector('div.escrever'),
Dados = {
  values: [],
  classes: [],
  get organizar() {
    this.values.sort(function (a, b) {
    return a - b;
    })
  },
  get mediana() {
    let vetor = this.values;
    if (vetor.length % 2 === 1) return vetor[parseInt(vetor.length / 2)];
    else return (vetor[parseInt(vetor.length / 2)] + vetor[parseInt(vetor.length / 2) - 1]) / 2;
  },
  get maximo() {
    return this.values[this.values.length - 1];
  },
  get minimo() {
    return this.values[0];
  },
  get amplitude() {
    return (this.maximo - this.minimo);
  },
  get media() {
    let r = 0;
    for (let c of this.values) r += c;
    return (r / this.values.length);
  },
  get desvio(){
    let desvio = 0;
    for (let c = 0; c < this.values.length; c++) desvio += Math.pow((this.values[c] - this.media), 2);
    return (desvio / this.values.length);
 },
  atualizaView: function () {
    let html = "",
    result = 0,
    escala = 0,
    height = 0;
    for (let valor of this.values) html += `<p>${valor}</p>`;
    valor.innerHTML = html;
    media.textContent = this.media;
    maximo.textContent = this.maximo;
    minimo.textContent = this.minimo;
    amplitude.textContent = this.amplitude;
    mediana.textContent = this.mediana;
    desvio.textContent = this.desvio;
    for (let c of this.classes) {
      c.zerar();
      result = 0;
      for (let n of this.values) c.conta(n);
      if (c.contagem > escala) escala = c.contagem;
      result += c.contagem;
    } for (let c of this.classes) c.desenha(escala);
    if((Dados.values.length - result) > escala) escala = (Dados.values.length - result);
    if(result === 0){
      height = (Dados.values.length - result) / Dados.values.length * 100;
      nc.style.height = `${height}%`;
      nc.textContent = Dados.values.length - result;
    } else{
      height = (Dados.values.length - result) / escala * 100;
      nc.style.height = `${height}%`;
      nc.textContent = Dados.values.length - result;
    }
  },
  adiciona: function (dado) {
    let r = parseFloat(dado);
    if (r >= 0) {
      this.values.push(r);
      this.values.sort(function (a, b) { return (a - b); });
      this.atualizaView();
    }
  }
};
function Classe(nome, de, ate) {
  this.nome = nome;
  this.de = de;
  this.ate = ate;
  this.contagem = 0;
  this.div = document.createElement('div');
  this.div.className = 'column';
  this.div.classList.add('column');
  this.div.textContent = '0'; //inicia com 0
  columns.appendChild(this.div);
  var label = document.createElement('label');
  label.textContent = this.nome;
  escrever.appendChild(label);
  this.desenha = function (escala) {
    let tamanho = this.contagem / escala * 100;
    this.div.style.height = `${tamanho}%`;
    this.div.textContent = this.contagem;
  }
  this.zerar = function () {
    this.contagem = 0;
  }
  this.conta = function(n) {
    if (this.verifica(n)) this.contagem++;
  }
  this.verifica = function(n) {
    if (this.de instanceof Classe) return n > this.de.ate && n <= this.ate;
    return n >= this.de && n <= this.ate;
  }
}
firstForm.addEventListener('submit', function (e) {
  Dados.adiciona(this.itemsValue.value);
  e.preventDefault();
});
secondForm.addEventListener('submit', function (e) {
  let r = new Classe(this.nameClass.value, this.numberOne.value, this.numberTwo.value);
  Dados.classes.unshift(r);
  Dados.atualizaView();
  e.preventDefault();
});
