import { expect, test } from '@playwright/test';

test('Main page should contain correct title as h1', async ({ page }) => {
    await page.goto('https://postcodes-uk.vercel.app/');
    const titleLocator = page.locator('h1', { hasText: 'Search UK postcode' });
    await expect(titleLocator).toBeVisible();
    await expect(titleLocator).toHaveText('Search UK postcode');
});

test('Typing "bt" in the postcode input should display at least one correct suggestion', async ({
    page,
}) => {
    await page.goto('https://postcodes-uk.vercel.app/');

    const inputSelector = 'input[placeholder="Enter postcode..."]';

    await page.fill(inputSelector, 'bt');

    const suggestionsSelector = 'ul';

    await expect(page.locator(suggestionsSelector)).toBeVisible();

    await expect(page.locator('ul >> text=BT10 0AA')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AB')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AD')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AE')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AF')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AG')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AH')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AJ')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AL')).toBeVisible();
    await expect(page.locator('ul >> text=BT10 0AN')).toBeVisible();
});

test('Typing "D" and selecting "DA10 0AD" from suggestions and validating specific table data', async ({
    page,
}) => {
    await page.goto('https://postcodes-uk.vercel.app/');

    const inputSelector = 'input[placeholder="Enter postcode..."]';

    await page.fill(inputSelector, 'D');

    await page.waitForSelector('ul', { state: 'visible' });

    const suggestionSelector = 'ul >> text="DA10 0AD"';

    await page.click(suggestionSelector);

    await page.waitForSelector('table', { state: 'visible' });

    async function getTextByTh(thText) {
        return await page.evaluate(thText => {
            const th = Array.from(document.querySelectorAll('th')).find(
                th => th.textContent.trim() === thText,
            );
            if (!th) return '';
            return th.closest('tr').querySelector('td').textContent.trim();
        }, thText);
    }

    const postcode = await getTextByTh('postcode');
    expect(postcode).toBe('DA10 0AD');

    const country = await getTextByTh('country');
    expect(country).toBe('England');

    const longitude = await getTextByTh('longitude');
    expect(longitude).toBe('0.308759');

    const latitude = await getTextByTh('latitude');
    expect(latitude).toBe('51.44778');

    const nhsHa = await getTextByTh('nhs ha');
    expect(nhsHa).toBe('South East Coast');
});

test('Typing "J" and selecting "DA10 0AD" from suggestions and information on map', async ({
    page,
}) => {
    await page.goto('https://postcodes-uk.vercel.app/');

    const inputSelector = 'input[placeholder="Enter postcode..."]';

    await page.fill(inputSelector, 'J');

    await page.waitForSelector('ul', { state: 'visible' });

    const suggestionSelector = 'ul >> text="JE1 0BD"';

    await page.click(suggestionSelector);

    const spanSelector = 'span:text("Coordinates not available")';

    await expect(page.locator(spanSelector)).toBeVisible();
});

test('Typing a non-matching query and expecting "No results found" in dropdown', async ({
    page,
}) => {
    await page.goto('https://postcodes-uk.vercel.app/');

    const inputSelector = 'input[placeholder="Enter postcode..."]';

    await page.fill(inputSelector, 'fdgkjgfdj');

    const dropdownSelector = 'ul';

    await page.waitForSelector(dropdownSelector, { state: 'visible' });

    const noResultsSelector = `${dropdownSelector} >> text="No results found"`;

    await expect(page.locator(noResultsSelector)).toBeVisible();
});
