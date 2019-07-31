import "./styles.css";

const viewUrl =
  "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=zWvz6MoYew9eYIRCCWMYT3POMTaPIs20";

const sharedUrl =
  "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=zWvz6MoYew9eYIRCCWMYT3POMTaPIs20";

const emailUrl =
  "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=zWvz6MoYew9eYIRCCWMYT3POMTaPIs20";

const popularTypeSelector = document.querySelector("#popularType");

const titleElement = document.querySelector("#title");
const updateUISuccess = function(data) {
  const parsedData = JSON.parse(data);
  const results = parsedData.results;

  console.log(results[0]);
  while (titleElement.hasChildNodes()) {
    titleElement.removeChild(titleElement.firstChild);
  }

  for (let i = 0; i < 5; i++) {
    let node = document.createElement("p");
    let linkNode = document.createElement("a");
    linkNode.setAttribute("href", results[i].url);
    linkNode.setAttribute("target", "_");
    var textNode = document.createTextNode(results[i].title);
    linkNode.appendChild(textNode);
    node.appendChild(linkNode);
    titleElement.appendChild(node);
  }
};

const updateUIError = function(data) {
  //console.log(data);
};

const responseMethod = function(httpRequest) {
  if (httpRequest.readyState === 4) {
    // success
    updateUISuccess(httpRequest.responseText);
  } else {
    // error
    updateUIError(httpRequest.status + ": " + httpRequest.responseText);
  }
};

const createRequest = function(url) {
  const httpRequest = new XMLHttpRequest(url);

  httpRequest.addEventListener("readystatechange", url =>
    responseMethod(httpRequest)
  );
  httpRequest.open("GET", url);
  httpRequest.send();
};

const selectChangesHandler = function() {
  let popularType = popularTypeSelector.value;
  let url = "";
  switch (popularType) {
    case "view":
      url = viewUrl;
      break;
    case "share":
      url = sharedUrl;
      break;
    case "email":
      url = emailUrl;
      break;
    default:
      break;
  }
  createRequest(url);
};

//
popularTypeSelector.addEventListener("change", selectChangesHandler);
