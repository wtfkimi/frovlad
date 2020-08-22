let PAGE = require("../Pages/BASE_PAGE")
let locators = require("../locators/locators.json");




async function test() {
    let page = new PAGE();
    await page.open("https://google.com");
    await page.setValue(locators.inputFieldGoogle, "Xuy");
    await page.click(locators.SearchButton);
    let kartinki = await page.getText(locators.kartinki)
    await page.equal(kartinki, "Картинки", "Тут должны быть картинки");
    console.log("");
}






test();