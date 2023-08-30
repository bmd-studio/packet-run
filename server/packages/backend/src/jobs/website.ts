import { MikroORM } from '@mikro-orm/core';
import puppeteer from 'puppeteer';
import Run from '../entities/run/index.entity';

export default async function website(runId: string, orm: MikroORM) {
    // Retrieve the run
    const run = await orm.em.findOneOrFail(Run, runId, { populate: ['id', 'url']});

    // GUARD: Check that the run exists
    if (!run) {
        throw new Error('RunNotFound');
    }

    // Launch puppeteer and create a new page
    const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1440, height: 1024 } });
    const page = await browser.newPage();

    // Go to the page URL and wait until there are no idle network connections
    // for 500ms
    await page.goto(run.url, { waitUntil: 'networkidle0' });

    // Then, take a screenshot and save it
    const path = `images/${runId}.png`;
    await page.screenshot({
        fullPage: false,
        captureBeyondViewport: false,
        path: `./data/${path}`,
    });

    // Save the path in the entity
    run.imagePath = path;
    await orm.em.flush();
}