// Detectar bandeira do cartão
const bandeiraSpan = document.getElementById('bandeira-cartao');

function detectarBandeira(numero) {
  const prefixo = numero.replace(/\s/g, '').substring(0, 6);
  if (/^4/.test(prefixo)) return 'Visa';
  if (/^5[1-5]/.test(prefixo)) return 'MasterCard';
  if (/^3[47]/.test(prefixo)) return 'American Express';
  if (/^6(?:011|5)/.test(prefixo)) return 'Discover';
  return '';
}

numeroInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '').substring(0, 16);
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  e.target.value = value;

  // Detecta bandeira
  const bandeira = detectarBandeira(value);
  bandeiraSpan.textContent = bandeira ? `(${bandeira})` : '';
});
