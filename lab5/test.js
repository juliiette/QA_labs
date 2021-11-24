const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Go to https://www.demoblaze.com/cart.html#
  await page.goto('https://www.demoblaze.com/cart.html#');

  // Click text=Home (current)
  await page.click('text=Home (current)');
  // assert.equal(page.url(), 'https://www.demoblaze.com/index.html');

  // Click text=Samsung galaxy s6
  await page.click('text=Samsung galaxy s6');
  // assert.equal(page.url(), 'https://www.demoblaze.com/prod.html?idp_=1');

  // Click text=Add to cart
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('text=Add to cart');
  // assert.equal(page.url(), 'https://www.demoblaze.com/prod.html?idp_=1#');

  // Click text=Cart
  await page.click('text=Cart');
  // assert.equal(page.url(), 'https://www.demoblaze.com/cart.html');

  // Click text=Delete
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
    page.click('text=Delete')
  ]);

  // Click a:has-text("Log in")
  await page.click('a:has-text("Log in")');

  // Click text=Log in × >> [aria-label="Close"]
  await page.click('text=Log in × >> [aria-label="Close"]');

  // ---------------------
  await context.close();
  await browser.close();
})();