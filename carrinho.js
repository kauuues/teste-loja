let carrinho = [];

function addToCart(nome, preco, quantidade) {
  const produto = { nome, preco, quantidade };
  carrinho.push(produto);
  alert(`${nome} foi adicionado ao seu carrinho!`);
}

function mostrarCarrinho() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let resumoCarrinho = "Carrinho de Compras:\n";
  let total = 0;
  carrinho.forEach(item => {
    resumoCarrinho += `${item.quantidade}x ${item.nome} - R$ ${item.preco}\n`;
    total += item.preco * item.quantidade;
  });
  resumoCarrinho += `\nTotal: R$ ${total.toFixed(2)}`;
  alert(resumoCarrinho);
}

function enviarCarrinhoParaWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let resumoCarrinho = "Carrinho de Compras:\n";
  let total = 0;
  carrinho.forEach(item => {
    resumoCarrinho += `${item.quantidade}x ${item.nome} - R$ ${item.preco}\n`;
    total += item.preco * item.quantidade;
  });
  resumoCarrinho += `\nTotal: R$ ${total.toFixed(2)}`;

  const url = `https://wa.me/5511977539681?text=${encodeURIComponent(resumoCarrinho)}`;
  window.open(url, "_blank");
}
