module.exports = {
    tags: ['google'],
   
    before:browser=> {
        global.amazonLogin = browser.page.gitHub.signIn();
        global.amazonPage = browser.page.gitHub.amazon();

    }, 
    'Login' : function (client) {
      client
        .url('http://amazon.com')
        .pause(1000);
     //amazontester1234@
     amazonLogin
        .waitForElementVisible("@login_signIn")
        .click("@login_signIn")
        .waitForElementVisible("@login_emailTxtbox")
        .setValue("@login_emailTxtbox", "amazontester1996@gmail.com")
        .click("@login_continueBtn")
        .waitForElementVisible("@login_passwordTxtbox")
        .setValue("@login_passwordTxtbox","amazontester1234@")
        .click("@login_signInBtn")
        .waitForElementVisible("@login_signIn");
    
    // Verify if Login successfully
    amazonLogin.expect.element("a[data-nav-role='signin'][data-nav-ref='nav_ya_signin'] span.nav-line-1").text.to.contain('Hello, amazon');
  

    },

    "Selecting Item to Add to Cart": function(client){
        amazonPage
        // Search Item to add to Cart
        .waitForElementVisible("@searchboxTxtbox")
        .setValue("@searchboxTxtbox", "Samsung Galaxy S10e Factory Unlocked Phone with 128GB, Prism White (Renewed)").click("div.nav-search-submit  input[type='submit']")

    },

    "Add to Cart": function(client){
    
        amazonPage
            .useXpath()
            // Check if target item is visible
            .waitForElementVisible("//*[text()='Samsung Galaxy S10e Factory Unlocked Phone with 128GB, Prism White (Renewed)']")
            .click("xpath","//*[text()='Samsung Galaxy S10e Factory Unlocked Phone with 128GB, Prism White (Renewed)']")
            .useCss()
            // Add to cart
            .waitForElementVisible("@addToCartBtn")
            .click("@addToCartBtn")
            

        // client.pause(5000);
    },
    "Checking Out Cart": function(client){
        // Proceed to Checkout
        amazonPage
            .click("@cartIconBtn")
            .useXpath()
            .waitForElementPresent("//*[text()='Samsung Galaxy S10e Factory Unlocked Phone with 128GB, Prism White (Renewed)']")
            .useCss()
            .click("@checkoutBtn")
            .waitForElementVisible("@delivery_deliverToAddressBtn").click("@delivery_deliverToAddressBtn")
            .waitForElementVisible("@delivery_continueBtn").click("@delivery_continueBtn")
            .waitForElementVisible("@paymentMethod_creditCardNumberTxtbox")
            .setValue("paymentMethod_creditCardNameTxtbox", "amazonTesting")
            .setValue("@paymentMethod_creditCardNumberTxtbox", "1234567890")
            .click("@paymentMethod_ContinueBtn")

    },
    "Logout Account": function(client){
        client
            .url('http://amazon.com')
            .pause(1000);
        
            amazonLogin.api.element("css selector", "a[data-nav-role='signin'][data-nav-ref='nav_ya_signin']", result=>{
            console.log(result)
            client.moveTo(result.value.ELEMENT)

            client.waitForElementVisible("a#nav-item-signout").click("a#nav-item-signout")

        });
        // Confirm if redirected to signin page after logout
        amazonLogin.waitForElementVisible("@login_emailTxtbox")
    }
  };
  