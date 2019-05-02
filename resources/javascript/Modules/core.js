//Modules to load
const modulesToLoad = [];

//Run scripts when page is loaded
window.onload = async function(){
  await getIDs();
  getHtml(modulesToLoad);
  getCss(modulesToLoad);
};

//Get all ID's in the HTML File
const getIDs = () => {
  const ElementsWithId = document.querySelectorAll('*[id]');
  for (i=0; i<ElementsWithId.length; i++) {
    modulesToLoad.push(ElementsWithId[i].id);
  };
};

// Get HTML code from selected modules
const getHtml = selectedModules => {
  (function() {
    let xhr = [], i;
    for(i = 0; i < selectedModules.length; i++) {
      (function(i) {
        xhr[i] = new XMLHttpRequest();
        url = './resources/html/Modules/'+selectedModules[i]+'.html';
        xhr[i].open("GET", url, true);
        xhr[i].onreadystatechange = function(){
          if (xhr[i].readyState === 4 && xhr[i].status === 200) {
            document.getElementById(selectedModules[i]).innerHTML= this.responseText;
          }
        };
        xhr[i].send();
      })(i);
    }
  })();
};

// Get CSS from selected modules
const getCss = selectedModules => {
  for (i=0; i<selectedModules.length; i++) {
    if (!document.getElementById(selectedModules[i]+"CSS")) {
      let link = document.createElement("link");
      link.id = selectedModules[i]+"CSS";
      link.rel = "stylesheet";
      link.href = "resources/css/Modules/"+selectedModules[i]+".css";
      document.head.appendChild(link);
    }
  }
};

// Get JS from selected modules
const getJs = selectedModules => {
  for (i=0; i<selectedModules.length; i++) {
    if (!document.getElementById(selectedModules[i]+"JS")) {
      let link = document.createElement("script");
      link.id = selectedModules[i]+"JS";
      link.src = "resources/js/Modules/"+selectedModules[i]+"Modules.js";
      document.head.appendChild(link);
    }
  }
};
