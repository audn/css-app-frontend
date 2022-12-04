import { iframeSrcDoc } from '../../utils/data/libraries';

function Preview({
  initialCode = '',
  library,
  version,
}: {
  initialCode?: string;
  library: string;
  version: string;
}) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        title="Preview"
        className={'-z-10 absolute inset-0 w-full h-full bg-white'}
        sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-top-navigation allow-modals"
        srcDoc={iframeSrcDoc({ initialCode, library, version })}
      />
    </div>
  );
}

export default Preview;
