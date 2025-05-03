const produtos = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  nome: `Tênis Modelo ${i + 1}`,
  preco: (150 + i).toFixed(2),
  imagem: `https://via.placeholder.com/200x200?text=Tenis+${i + 1}`
}));

const container = document.getElementById('produtos-container');
const itensCarrinho = document.getElementById('itens-carrinho');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Exibe os produtos na página inicial
if (container) {
  produtos.forEach(produto => {
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" width="150">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco}</p>
        <button onclick='adicionarCarrinho(${produto.id})'>Adicionar</button>
    `;
    container.appendChild(div);
  });
}

// Função para adicionar produtos ao carrinho
function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (produto) {
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert("Produto adicionado!");
  }
}

// Função para esvaziar o carrinho
function esvaziarCarrinho() {
  carrinho = [];
  localStorage.removeItem('carrinho');
  renderizarCarrinho();
}

// Função para remover um item específico do carrinho
function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Função para renderizar os itens no carrinho
function renderizarCarrinho() {
  if (!itensCarrinho) return;

  itensCarrinho.innerHTML = '';
  let total = 0;
  carrinho.forEach((item, index) => {
    total += parseFloat(item.preco);
    const div = document.createElement('div');
    div.innerHTML = `
      <p>
        <img src="${item.imagem}" width="50"> ${item.nome} - R$ ${item.preco}
        <button onclick="removerItem(${index})">Remover</button>
      </p>
    `;
    itensCarrinho.appendChild(div);
  });

  if (carrinho.length > 0) {
    const totalDiv = document.createElement('p');
    totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    itensCarrinho.appendChild(totalDiv);
  }
}

// Exibe o carrinho ao carregar a página
if (itensCarrinho) {
  renderizarCarrinho();
}

// Função de busca para filtrar os produtos
function filtrarProdutos() {
  const termo = document.getElementById('busca').value.toLowerCase();
  container.innerHTML = '';
  produtos.filter(p => p.nome.toLowerCase().includes(termo)).forEach(produto => {
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" width="150">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco}</p>
        <button onclick='adicionarCarrinho(${produto.id})'>Adicionar</button>
    `;
    container.appendChild(div);
  });
}

// Função para confirmar o pagamento
function confirmarPagamento(metodo) {
  const msg = `Pagamento por ${metodo} confirmado! Obrigado pela compra.`;
  const confirmacao = document.getElementById('confirmacao');
  if (confirmacao) {
    confirmacao.innerHTML = `<p style="color:green">${msg}</p>`;
    esvaziarCarrinho();
  }
}
// Renderiza os itens do carrinho na página de pagamento
function renderizarCarrinhoPagamento() {
  const itensCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const itensContainer = document.getElementById('itens-carrinho');
  const totalPreco = document.getElementById('total-preco');

  itensCarrinho.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>
        <img src="${item.imagem}" width="50"> ${item.nome} - R$ ${item.preco}
      </p>
    `;
    itensCarrinho.appendChild(div);
  });

  // Calcular total
  const total = itensCarrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0);
  totalPreco.textContent = total.toFixed(2);
}

// Chama a função para renderizar os itens ao carregar a página
renderizarCarrinhoPagamento();

// Máscara do número do cartão (1234 5678 9012 3456)
numeroInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '').substring(0, 16);
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  e.target.value = value;
});
