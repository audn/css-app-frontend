const puppeteer = require('puppeteer-core');
const chrome = require('chrome-aws-lambda');

const exePath =
  process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function getOptions(isDev) {
  let options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
}

module.exports = async (req, res) => {
  const id = req.query.id;

  const isDev = req.query.isDev === 'true';

  try {
    // check for https for safety!
    // get options for browser
    const options = await getOptions(isDev);

    // launch a new headless browser with dev / prod options
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    // set the viewport size
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // tell the page to visit the url
    await page.goto(`http://localhost:3000/component/${id}/preview`);

    // take a screenshot
    const file = await page.screenshot({
      type: 'png',
    });

    // close the browser
    await browser.close();

    res.statusCode = 200;
    res.setHeader('Content-Type', `image/png`);

    // return the file!
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    console.log(e.message);
    res.json({
      body: 'Sorry, Something went wrong!',
    });
  }
};
