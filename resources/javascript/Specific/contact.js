//Modules to load
const selectedModules = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function() {
  getModules(selectedModules);
}

const getModules = selectedModules => {
  for (i=0; i<selectedModules.length; i++) {
    const xhr = new XMLHttpRequest();
    console.log('./resources/html/Modules/'+selectedModules[i]+'.html')
    xhr.open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
    xhr.onreadystatechange= function() {
      if (this.readyState!==4) return;
      if (this.status!==200) return;
      console.log(xhr.status);
      if (!document.getElementById(selectedModules[i]+"CSS")) {
        let link = document.createElement("link");
        link.id = selectedModules[i]+"CSS";
        link.rel = "stylesheet";
        link.href = "resources/css/Modules/"+selectedModules[i]+".css";
        document.head.appendChild(link);
      };
      document.getElementById(selectedModules[i]).innerHTML= this.responseText;
    };
    xhr.send();
  }
}
