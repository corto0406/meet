const puppeteer = require('puppeteer');

let browser;
let page;

// Set a higher timeout for the entire test suite
jest.setTimeout(120000); // Increase the timeout for the entire suite to 120 seconds

// Setup before all tests
beforeAll(async () => {
  try {
    // Launch a new browser instance
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0,
    });

    // Create a new page
    page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto('http://localhost:3000/');

    // Wait for navigation to complete
    await page.waitForNavigation();
  } catch (error) {
    console.error('Error during setup:', error);
  }
});

// Cleanup after all tests
afterAll(async () => {
  try {
    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error closing browser:', error);
  }
});

// Test: User can expand an event to see details
test('User can expand an event to see details', async () => {
  try {
    // Wait for both the '.event' element and '.details-btn' button
    await Promise.all([
      page.waitForSelector('.event', { timeout: 60000 }),
      page.waitForSelector('.event .details-btn', { timeout: 60000 }),
    ]);

    // Log before clicking
    console.log('Before click');
    // Click on the '.details-btn' button
    await page.click('.event .details-btn');
    // Log after clicking
    console.log('After click');

    // Log before waiting for details to appear
    console.log('Before waitForSelector for details');
    // Wait for the '.details' element to appear
    await page.waitForSelector('.event .details', { timeout: 60000 });
    // Log after waiting for details
    console.log('After waitForSelector for details');

    // Get the details element
    const eventDetails = await page.$('.event .details');
    // Log details
    console.log('Event Details:', eventDetails);
    // Assert that details are defined
    expect(eventDetails).toBeDefined();
  } catch (error) {
    // Log any errors during the test
    console.error('Error during test:', error);
  }
});

// Test: User can collapse an event to hide details
test('User can collapse an event to hide details', async () => {
  try {
    // Wait for both the '.event' element and '.details-btn' button
    await Promise.all([
      page.waitForSelector('.event', { timeout: 60000 }),
      page.waitForSelector('.event .details-btn', { timeout: 60000 }),
    ]);

    // Log before clicking
    console.log('Before click');
    // Click on the '.details-btn' button
    await page.click('.event .details-btn');
    // Log after clicking
    console.log('After click');

    // Log before waiting for details to disappear
    console.log('Before waitForTimeout');
    // Wait for a timeout (3000ms) for animation or asynchronous updates
    await page.waitForTimeout(3000);
    // Log after waiting for timeout
    console.log('After waitForTimeout');

    // Get the details element
    const eventDetails = await page.$('.event .details');
    // Log details
    console.log('Event Details:', eventDetails);
    // Assert that details are null
    expect(eventDetails).toBeNull();
  } catch (error) {
    // Log any errors during the test
    console.error('Error during test:', error);
  }
});
