//Modules to load
const modulesToLoad = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function() {
  getHtml(modulesToLoad);
  getCss(modulesToLoad);
};

const getHtml = selectedModules => {
  for (i=0; i<selectedModules.length; i++) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
    xhr.onreadystatechange= function() {
      if (xhr.status===200) {
        document.getElementById(selectedModules[i]).innerHTML= xhr.responseText;
      };
    };
    xhr.send();
  }
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
