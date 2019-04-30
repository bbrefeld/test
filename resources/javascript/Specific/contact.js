//Modules to load
const modulesToLoad = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function(){
    getHtml(modulesToLoad);
    getCss(modulesToLoad);
};

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
