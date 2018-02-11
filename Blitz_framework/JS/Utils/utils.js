window.addEventListener("DOMContentLoaded", function() {
  var godMode = false; 
  // When set to true, you can click any element to retrieve custom styles in Reading Systems

  // Styles you want to check
  var customStyles = ["font-family", "font-size", "line-height", "margin"];

  function getStyle(element, cssProp) {
    var styleLog,
        stylesTarget = document.querySelector(element);
    if (stylesTarget) {
      var cssValue = window.getComputedStyle(stylesTarget, null).getPropertyValue(cssProp),
          tagName = element.toLowerCase();
      styleLog = tagName + " \{ " + cssProp + ": " + cssValue + "; \}";
      console.log(styleLog);
    } else {
      styleLog = "Sorry we can’t find styles for '" + element + "'. Either the element doesn’t exist in the DOM or your selector is not correct.";  
      console.error(styleLog);
    }
  }

  /* Usage

  getStyle("body", "font-size");
  getStyle(".tada cite", "text-align"); 

  */

  function getAllStyles(element, pseudo) {
    var styleLog,
        stylesTarget = document.querySelector(element);
    if (stylesTarget) {
      var tagSelector = element.toLowerCase();
      if (!pseudo) {
        var cssObj = window.getComputedStyle(stylesTarget, null);
      } else {
	    var cssObj = window.getComputedStyle(stylesTarget, pseudo);
	    var tagSelector = element.toLowerCase() + pseudo.toLowerCase();
      } 
	    styleLog = tagSelector + " \{";
      for (k = 0; k < cssObj.length; k++) { 
        cssObjProp = cssObj.item(k)
		    styleLog += "\n\t" + cssObjProp + ": " + cssObj.getPropertyValue(cssObjProp) + ";";
      }
      styleLog += "\n\}\n";
      console.log(styleLog);
    } else {
      styleLog = "Sorry we can’t find styles for '" + element + "'. Either the element doesn’t exist in the DOM or your selector is not correct.";  
      console.error(styleLog);
    }
  }

  /* Usage

  getAllStyles("h1");
  getAllStyles("a", ":link");
  getAllStyles("blockquote p");

  */

  function getCustomStyles(element, pseudo) {
    var styleLog,
        stylesTarget = document.querySelector(element);
    if (stylesTarget) {
      var tagSelector = element.toLowerCase();
      if (!pseudo) {
        var cssObj = window.getComputedStyle(stylesTarget, null);
      } else {
	    var cssObj = window.getComputedStyle(stylesTarget, pseudo);
	    var tagSelector = element.toLowerCase() + pseudo.toLowerCase();
      } 
	    styleLog = tagSelector + " \{";
      for (var k = 0; k < customStyles.length; k++) { 
        var cssObjProp = customStyles[k];
		    styleLog += "\n\t" + cssObjProp + ": " + cssObj.getPropertyValue(cssObjProp) + ";";
      }
      styleLog += "\n\}\n";
      console.log(styleLog);
    } else {
      styleLog = "Sorry we can’t find styles for '" + element + "'. Either the element doesn’t exist in the DOM or your selector is not correct.";  
      console.error(styleLog);
    }
  }

  /* Usage

  getCustomStyles("h1");
  getCustomStyles("a", ":link");
  getCustomStyles("p:first-child");

  */

  function printDom() {
    var dom = document.documentElement.outerHTML;
    console.log(dom);
  }

  /* Usage

  printDom();

  */

  // Has id ? has class ? has attribute ? is nested ? (blockquote, aside, figure, etc.)
  // exception: pre logger
  // cursor help

  if (godMode) {
    document.body.style.cursor = "help";
    document.body.addEventListener("click", debugStyles, false);
  }

  function debugStyles(e) {
	  e.preventDefault();
    var txt,
        el = e.target,
        tagSelector = el.tagName.toLowerCase(),
        cssObj = window.getComputedStyle(el, null);
    txt = tagSelector + " \{";
    for (var k = 0; k < customStyles.length; k++) { 
      var cssObjProp = customStyles[k];
	    txt += "\n\t" + cssObjProp + ": " + cssObj.getPropertyValue(cssObjProp) + ";";
    }
    txt += "\n\}\n";
    console.log(txt);
    return false;
  }

  function guessWebview() {
    if (navigator.platform.substr(0,2) === 'iP'){
      var lte9 = /constructor/i.test(window.HTMLElement);
      var nav = window.navigator, ua = nav.userAgent, idb = !!window.indexedDB;
      if (ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !nav.standalone){      
        console.log("iOS WebView: Safari is used. This is not normal and invalidates this test.");
      } else if ((!idb && lte9) || !window.statusbar.visible) {
        console.log("iOS WebView: The old UIWebView is probably used.");
      } else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb){
        console.log("iOS WebView: The new WKWebView is probably used.");
      } else {
        console.log("iOS WebView: The WebView couldn’t be defined.");
      }
    }
  };

  function getUserAgent() {
    console.log("UA: The User Agent is: " + navigator.userAgent);
  }

  function getReadingSystem() {
    if (navigator && navigator.hasOwnProperty("epubReadingSystem")) {
      console.log("epubReadingSystem: The name of this app is: " + navigator.epubReadingSystem.name);
      console.log("epubReadingSystem: The version of this app is: " + navigator.epubReadingSystem.version);
      console.log("epubReadingSystem: The layoutStyle of this app is: " + navigator.epubReadingSystem.layoutStyle);

      navigator.epubReadingSystem.hasFeature("spine-scripting") ? 
        console.log("epubReadingSystem: The Spine Scripting feature is: " + navigator.epubReadingSystem.hasFeature("spine-scripting")) 
      : console.log("epubReadingSystem: The Spine Scripting feature is false.");

      navigator.epubReadingSystem.hasFeature("layout-changes") ? 
        console.log("epubReadingSystem: The Layout Changes feature is: " + navigator.epubReadingSystem.hasFeature("layout-changes")) 
      : console.log("epubReadingSystem: The Layout Changes feature is false.");

      navigator.epubReadingSystem.hasFeature("dom-manipulation") ? 
        console.log("epubReadingSystem: The DOM manipulation feature is: " + navigator.epubReadingSystem.hasFeature("dom-manipulation")) 
      : console.log("epubReadingSystem: The DOM manipulation feature is false.");

      navigator.epubReadingSystem.hasFeature("touch-events") ? 
        console.log("epubReadingSystem: The Touch Events feature is: " + navigator.epubReadingSystem.hasFeature("touch-events") +". It means it has specific touch-only events e.g. multitouch/swipe.") 
      : console.log("epubReadingSystem: The Touch Events feature is false. It means it doesn’t have specific touch-only events e.g. multitouch/swipe, not that it doesn’t support touch at all.");

      navigator.epubReadingSystem.hasFeature("mouse-events") ? 
        console.log("epubReadingSystem: The Mouse Events feature is: " + navigator.epubReadingSystem.hasFeature("mouse-events")) 
      : console.log("epubReadingSystem: The Mouse Events feature is false.");

      navigator.epubReadingSystem.hasFeature("keyboard-events") ? 
        console.log("epubReadingSystem: The Keyboard Events feature is: " + navigator.epubReadingSystem.hasFeature("keyboard-events")) 
      : console.log("epubReadingSystem: The Keyboard Events feature is false.");
    } else {
      console.log("epubReadingSystem: This app doesn’t implement the JS epubReadingSystem object.");
    }
  }

  // EXEC examples | Uncomment or add yours here

  // printDom(); // Will print the Document Object Model Tree (with RS’ alterations)
  // getStyle("body", "background-color"); // Will get background-color for body
  // getStyle("body", "color"); // Will get color for body
  // getAllStyles("a", ":link"); // Will get all styles (300+) for a:link (but there's no a in the DOM -> error)
  // getCustomStyles("h1"); // Will get custom styles for h1 (you can customize styles to be retrieved line 6)
  // getCustomStyles(".tada p"); // Will get custom styles for advanced selectors too!
  // guessWebview(); // Will try to guess the webview the app is using on the iOS platform
  // getUserAgent(); // Will retrieve the user agent the app is using
  // getReadingSystem(); // Will check if the app implements the navigator.epubReadingSystem object and lists its name, version, layoutStyles and features.

}, false)