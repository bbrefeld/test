//Modules to load
const modulesToLoad = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function() {
  getHtml(modulesToLoad, 0);
  getCss(modulesToLoad);
};

const getHtml = (selectedModules, i) => {
  xhr.open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
  if (xhr.status===200) {
    document.getElementById(selectedModules[i]).innerHTML= xhr.responseText;
    i++;
    xhr.send();
  };
  if (i<3) {
    getHtml(modulesToLoad, i);
  };
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
