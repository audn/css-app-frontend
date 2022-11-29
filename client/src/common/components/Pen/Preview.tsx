import useMainState from '../../store/main';

function Preview({ code }: { code: string }) {
  const { src } = useMainState((s) => ({
    src: s.src,
  }));

  //   const validateSrc = () => {};

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
    ${src}
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
