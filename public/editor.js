(async function () {
  const canvasStyles = [
    '/assets/external/vendor/grapes.min.css'
  ];

  try {
    const res = await fetch('/style.css', { method: 'HEAD' });
    if (res.ok) canvasStyles.unshift('/style.css');
  } catch (e) {}

  const editor = grapesjs.init({
    container: '#gjs',
    height: '100vh',
    fromElement: false,
    storageManager: false,
    canvas: {
      styles: canvasStyles
    }
  });

  try {
    const res = await fetch('/templates/index.html');
    if (!res.ok) throw new Error('Template non trovato: /templates/index.html');
    let html = await res.text();

    html = html
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<html[^>]*>/gi, '')
      .replace(/<\/html>/gi, '')
      .replace(/<head[\s\S]*?<\/head>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '');

    editor.setComponents(html);
  } catch (err) {
    console.error(err);
    editor.setComponents('<section style="padding:40px;font-family:Arial,sans-serif;"><h1>Errore editor</h1><p>' + err.message + '</p></section>');
  }
})();