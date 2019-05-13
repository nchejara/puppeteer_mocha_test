const puppeteer = require("puppeteer"),
      should = require("should");

let browser = null,
    page = null;

    
describe("Google Home", function (){
    this.timeout(60 * 1000);

    before(async () => {
        browser = await puppeteer.launch({headless: false}) // with visual
        page = await browser.newPage();
        
    });
    after(async () => {
        await browser.close();    

    });
    it("Should show home Page", async function() {
        await page.goto("https://www.google.com");
        await page.waitFor(1000);
        let title = await page.title();
        title.should.equal("Google");
    });
    it("Should display search result", async () => {
        // await page.click("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
        await page.waitForSelector('input[title="Search"]', {visible: true});
        await page.click('input[title="Search"]');
        
        await page.keyboard.type("Naren Chejara");
        await page.click("#tsf > div:nth-child(2) > div > div.FPdoLc.VlcLAe > center > input.gNO89b");

        //Validate Title of the page after trigger search
        let title = await page.title();
        title.should.equal("Naren Chejara - Google Search");
        await page.waitFor(5000);
    });
    it("content should exist in the search result", async () => {
        let content = await page.evaluate(() => document.querySelector('a[href="http://chinesenri.com/members/pchejara/"]').firstElementChild.textContent);
        // let content = await page.evaluate(() => document.querySelector('a[href="http://chinesenri.com/members/pchejara/"] > h3')).textContent);
        content.should.equal("Naren Chejara – NRI in China");
        
    })
})