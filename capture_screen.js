const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // High res viewport
    await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });

    const fileUrl = 'file:///' + path.resolve(__dirname, 'size chart', 'camisas-size.html').replace(/\\/g, '/');
    await page.goto(fileUrl);

    // Wait to make sure font is fully loaded
    await new Promise(r => setTimeout(r, 500));

    // Evaluate the container's bounding box
    const rect = await page.evaluate(() => {
        const element = document.getElementById('capture');
        const { x, y, width, height } = element.getBoundingClientRect();
        return { x, y, width, height };
    });

    // Take screenshot with that exact clip
    await page.screenshot({
        path: path.resolve(__dirname, 'size chart', 'size chart camisas.png'),
        clip: {
            x: rect.x,
            y: rect.y,
            width: Math.ceil(rect.width),
            height: Math.ceil(rect.height)
        }
    });

    await browser.close();
    console.log('Compact screenshot saved successfully!');
})();
