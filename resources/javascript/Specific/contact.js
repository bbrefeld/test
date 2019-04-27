//Modules to load
const modulesToLoad = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function() {
  getHtml(modulesToLoad, 0);
  getCss(modulesToLoad);
};

const getHtml = (selectedModules, i) => {
  const xhr = [];
  for (i=0; i<selectedModules.lengh; i++) {
    function(i) {
      xhr[i] = new XMLHttpRequest();
      xhr[i].open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
      xhr[i].onreadystatechange= function() {
        if (xhr[i].readyState === 4 && xhr[i].status === 200) {
          console.log("test"+i);
          document.getElementById(selectedModules[i]).innerHTML= this.responseText;
        };
      };
      xhr[i].send();
    };
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

const getHtml2 = () => {
  var f = (function(){
    var xhr = [], i;
    for(i = 0; i < 3; i++){ //for loop
      (function(i){
        xhr[i] = new XMLHttpRequest();
        xhr[i].open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
        xhr[i].onreadystatechange = function(){
          if (xhr[i].readyState === 4 && xhr[i].status === 200){
            console.log('Response from request ' + i + ' [ ' + xhr[i].responseText + ']');
          }
        };
        xhr[i].send();
      })(i);
    }
  })();
};
