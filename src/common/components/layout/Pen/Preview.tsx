import { iframeSrcDoc } from '../../../utils/data/libraries';
import concat from '../../../utils/helpers/concat';

function Preview({
  initialCode = '',
  library,
  version,
  className,
}: {
  initialCode?: string;
  library?: string;
  version?: string;
  className?: string;
}) {
  return (
    <iframe
      title="Preview"
      className={concat(
        className ? className : '',
        'absolute inset-0 w-full h-full bg-white',
      )}
      sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-top-navigation allow-modals"
      srcDoc={iframeSrcDoc({ initialCode, library, version })}
    />
  );
}

export default Preview;
