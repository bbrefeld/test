//Modules to load
const selectedModules = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function() {
  getModules(selectedModules);
}

const getModules = async selectedModules => {
  for (i=0; i<selectedModules.length; i++) {
    const xhr = new XMLHttpRequest();
    console.log('./resources/html/Modules/'+selectedModules[i]+'.html')
    xhr.open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);

    console.log(selectedModules[i]+"CSS");
    if (!document.getElementById(selectedModules[i]+"CSS")) {
      let link = document.createElement("link");
      link.id = selectedModules[i]+"CSS";
      link.rel = "stylesheet";
      link.href = "resources/css/Modules/"+selectedModules[i]+".css";
      console.log(link);
      document.head.appendChild(link);
    };

    xhr.onreadystatechange= await function() {
      console.log(xhr.readyState)
      if (xhr.readyState!==4) return;
      console.log(xhr.status);
      if (xhr.status!==200) return;
      console.log(xhr.responseText);
      console.log(i);
      console.log(document.getElementById(selectedModules[i]));
      document.getElementById(selectedModules[i]).innerHTML= xhr.responseText;
      };
    xhr.send();
  };
}
