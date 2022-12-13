import html2canvas from 'html2canvas';
import { uploadThumbnail } from './hooks/api/posts';

export async function useGenerateThumbnail(id: string) {
  if (typeof window !== 'undefined') {
    const iframe = document.getElementsByTagName('iframe');
    const screen = iframe[0]?.contentDocument?.body as HTMLElement;

    html2canvas(screen, {
      allowTaint: true,
      useCORS: true,
      height: 600,
      //   width: 800,
      windowWidth: 800,
      windowHeight: 600,
    }).then(async (canvas) => {
      const base64image = canvas.toDataURL('image/png');

      const buffer = Buffer.from(
        base64image.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );
      document.body.appendChild(canvas);
      await uploadThumbnail(id, {
        buffer: buffer,
        encoding: '7bit',
        fieldname: 'image',
        mimetype: 'image/png',
        originalname: id,
      });
    });
  }
}

export default useGenerateThumbnail;
