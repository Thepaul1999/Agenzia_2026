(async function () {
  const canvasStyles = [
    '/assets/external/vendor/grapes.min.css'
  ];

  try {
    const res = await fetch('/style.css', { method: 'HEAD' });
    if (res.ok) {
      canvasStyles.unshift('/style.css');
    }
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

  editor.Panels.addButton('options', [
    {
      id: 'save-project',
      label: 'Salva',
      attributes: { title: 'Salva bozza' },
      command: async () => {
        try {
          const projectData = editor.getProjectData();

          const res = await fetch('/api/editor/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              page: 'main',
              data: projectData
            })
          });

          const result = await res.json();

          if (!res.ok || !result.ok) {
            throw new Error(result.error || 'Errore salvataggio');
          }

          alert('Bozza salvata');
        } catch (err) {
          console.error(err);
          alert('Errore durante il salvataggio');
        }
      }
    },
    {
      id: 'publish-project',
      label: 'Pubblica',
      attributes: { title: 'Pubblica sito' },
      command: async () => {
        try {
          const html = editor.getHtml();
          const css = editor.getCss();

          const res = await fetch('/api/editor/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html, css })
          });

          const result = await res.json();

          if (!res.ok || !result.ok) {
            throw new Error(result.error || 'Errore pubblicazione');
          }

          alert('Pubblicato in: ' + result.url);
          window.open(result.url, '_blank');
        } catch (err) {
          console.error(err);
          alert('Errore durante la pubblicazione');
        }
      }
    }
  ]);

  try {
    const res = await fetch('/templates/index.html');
    if (!res.ok) {
      throw new Error('Template non trovato: /templates/index.html');
    }

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
    editor.setComponents(`
      <section style="padding:40px;font-family:Arial,sans-serif;">
        <h1>Errore editor</h1>
        <p>${err.message}</p>
      </section>
    `);
  }
})();