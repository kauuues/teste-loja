// Dados dos produtos
const produtos = [
    { 
      id: 1, 
      nome: "Colar Elegância", 
      descricao: "Colar de prata elegante com detalhes finos.", 
      preco: "R$ 120,00", 
      imagem: "images/colar.jpg" 
    },
    { 
      id: 2, 
      nome: "Anel Clássico", 
      descricao: "Anel de prata com design clássico e sofisticado.", 
      preco: "R$ 90,00", 
      imagem: "images/anel.jpg" 
    },
    { 
      id: 3, 
      nome: "Pulseira Moderna", 
      descricao: "Pulseira de prata com um toque moderno e exclusivo.", 
      preco: "R$ 150,00", 
      imagem: "images/pulseira.jpg" 
    }
  ];
  
  // Função para carregar o produto com base no ID passado na URL
  function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);  // Pega os parâmetros da URL
    const productId = urlParams.get('id');  // Obtém o ID do produto da URL
    
    if (!productId) {
      alert("Produto não encontrado.");
      return;
    }
  
    // Busca o produto com o ID correspondente
    const produto = produtos.find(p => p.id == productId);
  
    if (produto) {
      // Preenche os dados do produto na página
      document.getElementById('nome-produto').textContent = produto.nome;
      document.getElementById('descricao-produto').textContent = produto.descricao;
      document.getElementById('preco-produto').textContent = produto.preco;
      document.getElementById('imagem-produto').src = produto.imagem;
      document.getElementById('imagem-produto').alt = produto.nome;
    } else {
      alert("Produto não encontrado.");
    }
  }
  
  // Chama a função de carregar o produto assim que a página é carregada
  window.onload = carregarProduto;
  