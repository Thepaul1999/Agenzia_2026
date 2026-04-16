/****************************************************
 *  EDITOR GRAPESJS – VERSIONE DEFINITIVA
 *  Importa il tuo index.html SENZA ROMPERLO
 ****************************************************/

const editor = grapesjs.init({
    container: '#gjs',
    height: '100vh',
    fromElement: false,

    storageManager: {
        type: 'local',
        autosave: true,
        autoload: true
    },

    canvas: {
        styles: [
            "../style.css",
            "https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        ]
    },

    parser: {
        htmlType: 'text/html',
    }
});

/****************************************************
 *  IMPORTA IL TUO index.html ORIGINALE
 *  RIMUOVENDO SOLO LE COSE CHE BLOCCANO GRAPESJS
 ****************************************************/

fetch('./templates/index.html')
    .then(res => res.text())
    .then(html => {

        // Rimuove SOLO quello che blocca GrapesJS
        html = html
            .replace(/<!DOCTYPE[^>]*>/gi, "")
            .replace(/<html[^>]*>/gi, "")
            .replace(/<\/html>/gi, "")
            .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
            .replace(/<script[\s\S]*?<\/script>/gi, "");

        const components = editor.Parser.parseHtml(html);
        editor.getWrapper().setComponents(components);
    });

/****************************************************
 *  FIX: Rende cliccabile e editabile TUTTO
 ****************************************************/
editor.addStyle(`
    *[contenteditable] {
        cursor: text !important;
        outline: 1px dashed rgba(255,255,255,0.4);
    }
    .overlay-colored {
        pointer-events: none !important;
    }
`);

/****************************************************
 *  AGGIUNGE "LOGIN" in alto a destra
 ****************************************************/
editor.on('load', () => {
    const iframe = editor.Canvas.getFrameEl();
    const login = iframe.contentDocument.createElement('a');

    login.innerText = "Login";
    login.href = "#";
    login.style.cssText = `
        position: fixed;
        top: 20px;
        right: 25px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        z-index: 99999;
        text-decoration: none;
    `;

    iframe.contentDocument.body.appendChild(login);
});