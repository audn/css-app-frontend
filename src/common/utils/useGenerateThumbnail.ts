import html2canvas from 'html2canvas';
import { uploadThumbnail } from './hooks/api/posts';

export async function useGenerateThumbnail(id: string) {
  const iframe =
    typeof window !== 'undefined' &&
    (document.getElementsByTagName('iframe') as any);
  const screen = iframe[0]?.contentDocument?.body;
  html2canvas(screen, {
    allowTaint: true,
    useCORS: true,
    windowWidth: 800,
    windowHeight: 600,
  }).then(async (canvas) => {
    //   scale: 2,
    const base64image = canvas.toDataURL('image/png');

    const buffer = Buffer.from(
      base64image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    await uploadThumbnail(id, {
      buffer: buffer,
      encoding: '7bit',
      fieldname: 'image',
      mimetype: 'image/png',
      originalname: id,
    });
  });
}

export default useGenerateThumbnail;
