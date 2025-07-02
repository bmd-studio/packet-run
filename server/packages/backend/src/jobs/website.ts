import { MikroORM } from '@mikro-orm/core';
import puppeteer from 'puppeteer';
import Run from '../entities/run/index.entity';
import fs from 'fs/promises';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'data', 'images');

export default async function website(runId: string, orm: MikroORM) {
    // Retrieve the run
    const run = await orm.em.findOneOrFail(Run, runId, { populate: ['id', 'url'] });

    // GUARD: Check that the run exists
    if (!run) {
        throw new Error('RunNotFound');
    }

    // Launch puppeteer and create a new page
    const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1856, height: 992 } });
    const page = await browser.newPage();

    // Go to the page URL and wait until there are no idle network connections
    // for 500ms
    // FIXME: add a timeout on this function. Might nog complete for a long while
    await page.goto(run.url, { waitUntil: 'networkidle2' });

    // Then, take a screenshot and save it
    const destination = path.join(IMAGES_DIR, `${runId}.png`);
    const screenshot = await page.screenshot({
        encoding: 'binary',
        fullPage: false,
        captureBeyondViewport: false,
    });

    // Save the screenshot to the file system
    await fs.writeFile(destination, screenshot);

    await page.close();
    await browser.close();

    // Save the path in the entity
    run.imagePath = `images/${runId}.png`;
    await orm.em.flush();
}
