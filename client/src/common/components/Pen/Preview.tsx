import useAuthState from '../../store/auth';

function Preview({ code }: { code: string }) {
  const user = useAuthState((s) => s.user);
  const library = user.preferences?.preferredLibrary || 'TailwindCSS';

  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        title="Preview"
        className={'absolute inset-0 w-full h-full bg-types-100'}
        sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-top-navigation allow-modals"
        srcDoc={`
<!DOCTYPE htmla>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    ${
      library == 'TailwindCSS'
        ? "<script src='https://cdn.tailwindcss.com'></script>"
        : "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css' />"
    }
  </head>
  <body>
    ${code}
  </body>
</html>`}
      />
    </div>
  );
}

export default Preview;
