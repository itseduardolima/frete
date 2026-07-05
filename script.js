document.getElementById('ano').textContent = new Date().getFullYear();

document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  const icon = item.querySelector('.faq-icon');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    icon.textContent = isOpen ? '–' : '+';
  });
});

document.getElementById('quote-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const v = (name) => (f.elements[name]?.value || '').trim();

  const formatarData = (iso) => {
    if (!iso) return 'a combinar';
    const [ano, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const linhas = [
    'Olá! Quero um orçamento de frete.',
    '',
    'Nome: ' + v('nome'),
    'WhatsApp: ' + v('fone'),
    'Origem: ' + v('origem'),
    'Destino: ' + v('destino'),
    'Tipo de carga: ' + v('tipo'),
    'Data: ' + formatarData(v('data')),
    'Observações: ' + (v('obs') || '—')
  ];

  const url = 'https://wa.me/5592999842312?text=' + encodeURIComponent(linhas.join('\n'));
  window.open(url, '_blank', 'noopener');
});
