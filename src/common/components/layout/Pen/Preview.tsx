import { IPostSchemas } from '../../../lib/interfaces';
import { iframeSrcDoc } from '../../../utils/data/libraries';
import concat from '../../../utils/helpers/concat';

function Preview({
  initialCode = '',
  library,
  version,
  className,
  type,
}: {
  initialCode?: string;
  type: IPostSchemas;
  library?: string;
  version?: string;
  className?: string;
}) {
  return (
    <iframe
      id="capture"
      title="Preview"
      className={concat(
        className ? className : '',
        'absolute inset-0 w-full h-full bg-[#f8fafd] animate',
      )}
      sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-top-navigation allow-modals"
      srcDoc={iframeSrcDoc({ initialCode, library, version, type })}
    />
  );
}

export default Preview;
