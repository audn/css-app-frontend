import { Request } from 'express';
import puppeteer from 'puppeteer';
import { APIJson } from '../../../../lib/types/types';

export const renderImage = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        let browser = puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disabled-setupid-sandbox'],
        });

        console.log(`loads post ${id}`);
        (async () => {
            const page = await (await browser).newPage();
            await page.goto(
                `${process.env.FRONTEND_URL}/component/${id}/preview`,
                {
                    waitUntil: 'networkidle0',
                }
            );

            const image = await page.screenshot({ fullPage: true });

            res.set('Content-Type', 'image/png');
            res.send(image);

            await page.close();
        })();
    } catch (error) {
        console.log(error);
    }
};
