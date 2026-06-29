/* =================================================================
   UN MISMO RÍO · Encuentro de Música Vocal
   Funcionalidad del sitio
================================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MENÚ MÓVIL ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('abierto');
  });

  // cerrar el menú al hacer clic en un enlace (en móvil)
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('abierto');
    });
  });

  /* ---------- TOAST (aviso flotante) ---------- */
  const toast = document.getElementById('toast');
  function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add('mostrar');
    setTimeout(function () { toast.classList.remove('mostrar'); }, 2200);
  }

  /* ---------- SECCIÓN 3 · DESCARGAR CURRÍCULUMS ---------- */
  document.querySelectorAll('.btn-grupo[data-cv]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const archivo = btn.getAttribute('data-cv');
      const enlace = document.createElement('a');
      enlace.href = archivo;
      enlace.download = '';
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
    });
  });

  /* ---------- SECCIÓN 4 · GALERÍA + LIGHTBOX ---------- */
  const imagenes = Array.from(document.querySelectorAll('.galeria-item img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxDescargar = document.getElementById('lightboxDescargar');
  const btnCerrar = document.getElementById('lightboxCerrar');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');
  let indiceActual = 0;

  function abrirLightbox(indice) {
    indiceActual = indice;
    const src = imagenes[indice].getAttribute('data-full') || imagenes[indice].src;
    lightboxImg.src = src;
    lightboxDescargar.href = src;
    lightbox.classList.add('activo');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function cerrarLightbox() {
    lightbox.classList.remove('activo');
    lightbox.setAttribute('aria-hidden', 'true');
  }
  function navegar(direccion) {
    indiceActual = (indiceActual + direccion + imagenes.length) % imagenes.length;
    abrirLightbox(indiceActual);
  }

  imagenes.forEach(function (img, i) {
    img.addEventListener('click', function () { abrirLightbox(i); });
  });
  btnCerrar.addEventListener('click', cerrarLightbox);
  btnPrev.addEventListener('click', function () { navegar(-1); });
  btnNext.addEventListener('click', function () { navegar(1); });

  // cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) cerrarLightbox();
  });
  // navegación con el teclado
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('activo')) return;
    if (e.key === 'Escape') cerrarLightbox();
    if (e.key === 'ArrowLeft') navegar(-1);
    if (e.key === 'ArrowRight') navegar(1);
  });

  /* ---------- SECCIÓN 5 · COPIAR ALIAS ---------- */
  const btnAlias = document.getElementById('btnAlias');
  btnAlias.addEventListener('click', function () {
    const alias = btnAlias.getAttribute('data-alias');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(alias).then(function () {
        mostrarToast('Alias copiado: ' + alias + ' ?');
      }).catch(function () { copiarFallback(alias); });
    } else {
      copiarFallback(alias);
    }
  });

  function copiarFallback(texto) {
    const temp = document.createElement('textarea');
    temp.value = texto;
    document.body.appendChild(temp);
    temp.select();
    try { document.execCommand('copy'); mostrarToast('Alias copiado: ' + texto + ' ?'); }
    catch (e) { mostrarToast('No se pudo copiar el alias'); }
    document.body.removeChild(temp);
  }

});