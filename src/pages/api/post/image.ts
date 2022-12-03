import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';

export default async function generatePdf(req: any, res: any) {
  const id = req.query.id;
  try {
    console.log(await chromium.executablePath);

    const browser = await playwright.chromium.launch({
      args: [...chromium.args, '--font-render-hinting=none'], // This way fix rendering issues with specific fonts
      executablePath:
        process.env.NODE_ENV === 'production'
          ? await chromium.executablePath
          : 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless:
        process.env.NODE_ENV === 'production' ? chromium.headless : true,
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    // This is the path of the url which shall be converted to a pdf file

    await page.goto(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/component/${id}/preview`,
      {
        waitUntil: 'load',
      },
    );

    const file = await page.screenshot({
      type: 'png',
    });

    await browser.close();

    res.setHeader('Content-Type', `image/png`);

    // return the file!
    return res.end(file);
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}
