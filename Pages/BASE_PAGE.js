let webdriver = require("selenium-webdriver");
let chai = require("chai")
let assert = chai.assert
let until = require("selenium-webdriver/lib/until");
By = webdriver.By;
chrome = require("selenium-webdriver/chrome");
o = new chrome.Options();
o.addArguments("disable-infobars");
const chromedriver = require("chromedriver");



let base_page =  function(){

    let driver;
    try {
        chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())
        this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()
        driver = this.driver;
    }catch (e) {
        console.error(e);
    }
    this.open = async function(url, email, password){
        await driver.get(url);
    }
    
    this.equal = async function equal(actual, expected, message) {
        await assert.equal(actual, expected, message);

    }
    
    this.click = async function(xpath){
        try {
            await (driver.wait(until.elementLocated(By.xpath(xpath.locator)), 45000)).click();
        }catch (e) {
            await console.log(e);
        }
    }

    this.xpathByLocator = async function(elem){
        let xpathByLocator = await driver.wait(await until.elementLocated(By.xpath(elem)), 45000);
        return xpathByLocator;
    }

    this.getText = async function(xpath) {
        let element = await driver.wait(until.elementLocated(By.xpath(xpath.locator)), 45000);
        let text = await element.getText();
        return text;
    }

    this.getTexts = async function (xpath){
        await driver.wait(until.elementLocated(By.xpath(xpath)), 45000);
        let texts = await driver.findElements(By.xpath(xpath))
        return texts;
    }
    this.setValue = async function(xpath, value){
        await driver.wait(until.elementLocated(By.xpath(xpath.locator)), 45000);
        return await (driver.findElement(By.xpath(xpath.locator))).sendKeys(value);
    }

}

module.exports = base_page;