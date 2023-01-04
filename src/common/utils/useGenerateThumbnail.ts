import html2canvas from 'html2canvas';
import { API, IPostSchemas } from '../lib/interfaces';
import { useLocalhost } from './helpers/useOnLocal';
import { uploadThumbnail } from './hooks/api/components';

export async function useGenerateThumbnail(
  type: IPostSchemas,
  id: string,
): Promise<API.Response<API.Models.Component>> {
  const iframe = document.getElementsByTagName('iframe');
  const screen = iframe[0]?.contentDocument?.body as HTMLElement;

  return html2canvas(screen, {
    allowTaint: true,
    useCORS: true,
    height: type === 'component' ? 600 : 936,
    width: type === 'component' ? 800 : 626,
    windowWidth: type === 'component' ? 800 : 626,
    windowHeight: type === 'component' ? 600 : 936,
  }).then(async (canvas) => {
    const base64image = canvas.toDataURL('image/png');

    const buffer = Buffer.from(
      base64image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    {
      useLocalhost && document.body.appendChild(canvas);
    }
    return await uploadThumbnail(id, type, {
      buffer: buffer,
      encoding: '7bit',
      fieldname: 'image',
      mimetype: 'image/png',
      originalname: id,
    });
  });
}

export default useGenerateThumbnail;
