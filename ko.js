const puppy=require("puppeteer");

let browserPromise=puppy.launch({     //browser open promise
    headless:false,  
    defaultViewport:false,              
});
const id="kojecah357@dwgtcm.com";
const pass="poppy@12345";
let tab;
browserPromise.then(function(browser){
    let pagesPromise=browser.pages();   //tab open promise
    return pagesPromise;
}).then(function(pages){
    // console.log(pages.length);
    tab=pages[0];
    let pageOpenPromise=tab.goto("https://www.hackerrank.com/auth/login");  // url open promise
    return pageOpenPromise;
}).then(function(){
        // console.log("opened");
        let idPromise=tab.type("#input-1",id);
       return idPromise;



}).then(function(){
    let passPromise=tab.type("#input-2",pass);
    return passPromise;
}).then(function(){
     let loginPromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
     return loginPromise;
}).then(function(){
    let waitPromise=tab.waitForSelector("#base-card-1-link",{visible:true});
    return waitPromise;
}).then(function(){
    let ipclickPromise=tab.click("#base-card-1-link");
    return ipclickPromise;
}).then(function(){
    let waitarr=tab.waitForSelector("a[data-attr1='warmup']",{visible: true});
    return waitarr;
}).then(function(){
    let arraCLick=tab.click("a[data-attr1='warmup']");
        return arraCLick;
}).then(function(){
      let waitPromise=tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
      return waitPromise;
}).then(function(){
    let allButtonsPromise=tab.$$(".js-track-click.challenge-list-item");//$$ means find element
    return allButtonsPromise;
}).then(function(data){
    let allButtonUrlsPromise=[];
    for(let i of data){
        let urlPromise=tab.evaluate(function(ele){
            return ele.getAttribute("href");
        },i);
        allButtonUrlsPromise.push(urlPromise);
    }
    return Promise.all(allButtonUrlsPromise);
}).then(function(data){
      let problemSolved=solveQuestion("https://www.hackerrank.com"+data[0]);
      for(let i=0;i<data.length;i++){
          problemSolved=problemSolved.then(function(){
              return solveQuestion("https://www.hackerrank.com"+data[i]);
          })
      }

}) 
.catch(function(err){
     console.log("erroe");
})

// console.log(browserPromise);

function solveQuestion(url){
    let problemUrl=url;
    let editorialUrl=url.replace("?","/editorial?");
    // console.log(editorialUrl);
    return new Promise(function(resolve,reject){

tab.goto(editorialUrl).then(function(){
    let answerLanguagePromise=tab.$$(".hackdown-content h3");
return answerLanguagePromise;
    
}).then(function(data){
      let answerLanguages=[];
      for(let i of data){
          let languagePromise=tab.evaluate(function(ele){
              return ele.textContent;
          },i);
          answerLanguages.push(languagePromise);
      } 
      return Promise.all(answerLanguages);
}).then(function(data){
    for(let i in data){
        if(data[i]=="C++"){
          let finalAnswerPromise=  tab.$$(".highlight").then(function(answers){
            let  answerPromise= tab.evaluate(function(ele){
                return ele.textContent;

                },answers[i]);
                return answerPromise;
            });
            return finalAnswerPromise;
        }
    }
}).then(function(data){
   
}).then(function(){
    resolve();
});
    })
}