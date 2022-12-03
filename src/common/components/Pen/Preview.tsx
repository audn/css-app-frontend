function Preview({
  code,
  library,
  version,
}: {
  code: string;
  library: string;
  version: string;
}) {
  const getLink = () => {
    console.log({ library, version });

    if (library === 'tailwindcss') {
      switch (version) {
        case '3.2.4':
          return "<script src='https://cdn.tailwindcss.com/3.2.4'></script>";
        case '2.2.19':
          return "<link rel='stylesheet' href='https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css' />";
        case '1.9.6':
          return "<link rel='stylesheet' href='https://unpkg.com/tailwindcss@1.9.6/dist/tailwind.min.css' />";
      }
    }
  };
  console.log(getLink());

  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        title="Preview"
        className={'absolute inset-0 w-full h-full bg-types-100'}
        sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-top-navigation allow-modals"
        srcDoc={`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${getLink()}
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
