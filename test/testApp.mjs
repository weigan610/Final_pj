import {By, Key, Builder} from 'selenium-webdriver';
import chromedriver from 'chromedriver';

async function testApp() {
    await new Promise(r => setTimeout(r, 1000));
    let driver = await new Builder().forBrowser("chrome").build();

    // await driver.get("http://127.0.0.1:3000/");
    await driver.get("http://linserv1.cims.nyu.edu:37272");
    if (driver.findElement(By.css("body"))) {
        console.log("Test 1 passed: The page is served");
    }
    else {
        console.log("Test 1 failed: The page is not served");
        console.log("The test finished");
        return;
    }
    if (driver.findElement(By.id("urlAskFormInputField"))) {
        console.log("Test 2 passed: The website could be lauched successfully");
    }
    else {
        console.log("Test 2 failed: The website could not be lauched successfully");
        console.log("The test finished");
        return;
    }
    await driver.findElement(By.id("urlAskFormInputField")).sendKeys("https://www.aozora.gr.jp/index.html", Key.RETURN);
    if (driver.findElement(By.id("favouriteLinksForm"))) {
        console.log("Test 3 passed: The result page is shown correctly");
    }
    else {
        console.log("Test 3 failed: The result page is not shown correctly");
        console.log("The test finished");
        return;
    }
    await driver.findElement(By.id("favouriteLinksForm")).sendKeys("", Key.RETURN);
    if (driver.findElement(By.css("body"))) {
        console.log("Test 4 passed: The db status page is shown successfully");
    }
    else {
        console.log("Test 4 failed: The db status page is shown successfully");
        console.log("The test finished");
        return;
    }
    setInterval(() => {
        driver.quit();
    }, 1000);
}

async function main() {
    await testApp();
    console.log("The test finished");
    await new Promise(r => setTimeout(r, 1000));
    return process.exit(0);
}

main();

