// All In — firm site behaviour: mobile menu + contact form (opens WhatsApp with the message prefilled).
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  var form = document.getElementById('contact-form');
  if (form) {
    var msg = document.getElementById('form-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var org = form.elements.org.value.trim();
      var topic = form.elements.topic.value;
      var text = form.elements.message.value.trim();
      if (!name || !text) {
        msg.textContent = 'Please add your name and a short message so we know how to help.';
        msg.className = 'form-msg err';
        (name ? form.elements.message : form.elements.name).focus();
        return;
      }
      var body = 'Hello All In, this is ' + name + (org ? ' from ' + org : '') + '.\n' +
        'Topic: ' + topic + '\n\n' + text;
      var url = form.getAttribute('data-wa') + '?text=' + encodeURIComponent(body);
      msg.textContent = 'Opening WhatsApp with your message ready to send. If nothing opens, use the WhatsApp button on this page.';
      msg.className = 'form-msg';
      window.open(url, '_blank', 'noopener');
    });
  }
})();
