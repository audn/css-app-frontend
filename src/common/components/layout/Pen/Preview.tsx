import { IPostSchemas } from '../../../lib/interfaces';
import { iframeSrcDoc } from '../../../utils/data/libraries';
import concat from '../../../utils/helpers/concat';

function Preview({
  files,
  initialCode = '',
  library,
  version,
  className,
  type,
}: {
  files?: {
    [key: string]: {
      language: 'html' | 'css';
      name: string;
      value: string;
    };
  };
  initialCode?: string;
  type: IPostSchemas;
  library?: string;
  version?: string;
  className?: string;
}) {
  function renderCode() {
    const banned = ['fetch', 'onload'];
    const code = initialCode || (files && files['HTML'].value);
    const includesBannedWord = banned?.some((x) => code?.includes(x));

    if (includesBannedWord) {
      return 'invalid component';
    } else return code;
  }
  return (
    <iframe
      id="capture"
      title="Preview"
      referrerPolicy="strict-origin"
      className={concat(
        className ? className : '',
        'absolute inset-0 w-full h-full bg-[#f8fafd] animate',
      )}
      sandbox="allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin "
      srcDoc={iframeSrcDoc({
        initialCode: renderCode(),
        library,
        version,
        type,
        files,
      })}
    />
  );
}

export default Preview;
