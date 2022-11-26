import { useState } from 'react';

function Preview({ code }: { code: string }) {
  const [contentRef, setContentRef] = useState(null);

  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe
      ref={setContentRef}
      title="Preview"
      className={'absolute inset-0 w-full h-full bg-types-100'}
      sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-top-navigation allow-modals"
      srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style id="_style"></style>
                    <script>
                    var hasHtml = false
                    var hasCss = false
                    var visible = false
                    window.addEventListener('message', (e) => {
                      if (typeof e.data.clear !== 'undefined') {
                        setHtml()
                        setCss()
                        checkVisibility()
                        return
                      }
                      if (typeof e.data.css !== 'undefined') {
                        setCss(e.data.css)
                      }
                      if (typeof e.data.html !== 'undefined') {
                        setHtml(e.data.html)
                      }
                      checkVisibility()
                    })
                    function checkVisibility() {
                      if (!visible && hasHtml && hasCss) {
                        visible = true
                        document.body.style.display = ''
                      } else if (visible && (!hasHtml || !hasCss)) {
                        visible = false
                        document.body.style.display = 'none'
                      }
                    }
                    function setHtml(html) {
                      if (typeof html === 'undefined') {
                        document.body.innerHTML = ''
                        hasHtml = false
                      } else {
                        document.body.innerHTML = html
                        hasHtml = true
                      }
                    }
                    
                    function setCss(css) {
                      const style = document.getElementById('_style')
                      console.log(style)
                      const newStyle = document.createElement('style')
                      newStyle.id = '_style'
                      newStyle.innerHTML = typeof css === 'undefined' ? '' : css
                      style.parentNode.replaceChild(newStyle, style)
                      hasCss = typeof css === 'undefined' ? false : true
                    }
                    </script>
                  </head>
                  <body>
                  ${code}
                  </body>
                  <script>
                  // https://github.com/sveltejs/svelte-repl/blob/master/src/Output/srcdoc/index.html
                  // https://github.com/sveltejs/svelte-repl/blob/master/LICENSE
                  document.body.addEventListener('click', event => {
                    if (event.which !== 1) return;
                    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                    if (event.defaultPrevented) return;
                    // ensure target is a link
                    let el = event.target;
                    while (el && el.nodeName !== 'A') el = el.parentNode;
                    if (!el || el.nodeName !== 'A') return;
                    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external' || el.target) return;
                    event.preventDefault();
                    window.open(el.href, '_blank');
                  });
                  </script>
                </html> `}
    />
  );
}

export default Preview;
