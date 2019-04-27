//Modules to load
const modulesToLoad = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function() {
  getHtml(modulesToLoad, 0);
  getCss(modulesToLoad);
};

const getHtml = (selectedModules, i) => {
  const xhr= new XMLHttpRequest();
  xhr.open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
  xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return;
    document.getElementById(selectedModules[i]).innerHTML= this.responseText;
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
