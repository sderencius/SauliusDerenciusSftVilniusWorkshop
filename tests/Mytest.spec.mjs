import { test, expect } from '@playwright/test';


test.only('basic test', async ({ page }) => {
  
  await page.goto('https://duckduckgo.com/?va=b&t=hc');
  const ducklogo = await page.isVisible('#logo_homepage_link');
  expect(ducklogo).toBe(true);
});

test('search test', async ({ page }) => {

  await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'test');
  await page.click('#search_button_homepage');

  const test = await page.textContent('#r1-0');
  expect(test).toContain('Test')
});

test('Check that cheat sheets are working', async ({ page }) => {
  await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'microsoft word cheat sheet');
  await page.click('#search_button_homepage');
  const isCheatSheetVisible = await page.isVisible('a[data-zci-link="cheat_sheets"]');
  const cheatSheetsTitle = await page.textContent('h3.c-base__title');
  expect(isCheatSheetVisible).toBe(true);
  expect(cheatSheetsTitle).toContain('Microsoft Word 2010');
});

test('www.wikipedia.com test', async ({ page }) => {
  await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
  await page.click('#search_button_homepage');
  await page.click ('#r1-0 > div > h2')
  const cheatSheetsTitle = await page.textContent('#firstHeading');
  expect(cheatSheetsTitle).toContain('Shorten');

});

test('testing wiki short link', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
  await page.click('#search_button_homepage');
  const shortenURL = await page.isVisible('#shorten-url');
  const shortenURLText = await page.inputValue('#shorten-url');
  expect(shortenURL).toBe(true);
  await page.goto(shortenURLText);
  const url = await page.url();
  expect(url).toBe('https://www.wikipedia.org/');
});


test('panda', async ({ page }) => {
  await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector("#search_form_input_homepage");
  await page.fill('#search_form_input_homepage', "intitle:panda");
  await page.click("#search_button_homepage");
 
const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
  results.forEach(result => {
    expect(result).toContain("Panda");
  });
});

const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
      await page.goto('https://start.duckduckgo.com/');
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const generatedPassword = await page.textContent(".c-base__title");
      expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });

const invalidPasswordLengths = ['7', '65'];
invalidPasswordLengths.forEach(passwordLength => {
  test(`Fails to Generate ${passwordLength} chracters long password`, async ({ page }) => {
    await page.goto('https://start.duckduckgo.com/');
    await page.waitForSelector("#search_form_input_homepage");
    await page.fill('#search_form_input_homepage', ("password " + passwordLength));
    await page.click("#search_button_homepage");
    const isPasswordElementVisible = await page.isVisible(".c-base__sub");
    expect(isPasswordElementVisible).toEqual(false)
  });
});

