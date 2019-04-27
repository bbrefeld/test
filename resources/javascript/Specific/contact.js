//Modules to load
const modulesToLoad = ['header','footer','modal'];

//Run scripts when page is loaded
window.onload = function(){

    var f = (function(){
        var xhr = [], i;
        for(i = 0; i < modulesToLoad.length; i++){ //for loop
            (function(i){
                xhr[i] = new XMLHttpRequest();
                console.log("URLRUNS")
                url = './resources/html/Modules/'+modulesToLoad[i]+'.html';
                xhr[i].open("GET", url, true);
                xhr[i].onreadystatechange = function(){
                    if (xhr[i].readyState === 4 && xhr[i].status === 200){
                        document.getElementById(selectedModules[i]).innerHTML= this.responseText;
                    }
                };
                xhr[i].send();
            })(i);
        }
    })();

    getCss(modulesToLoad);

};

/*const getHtml = (selectedModules) => {
  const xhr = [];
  for (i=0; i<selectedModules.lengh; i++) {
    (function(i) {
      xhr[i] = new XMLHttpRequest();
      xhr[i].open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
      xhr[i].onreadystatechange= function() {
        if (xhr[i].readyState === 4 && xhr[i].status === 200) {
          console.log("test"+i);
          document.getElementById(selectedModules[i]).innerHTML= this.responseText;
        };
      };
      xhr[i].send();
    })(i);
  }
};*/

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

/*const getHtml2 = () => {
  const f = (function(){
    const xhr = [], i;
    for(i = 0; i < 3; i++){ //for loop
      (function(i){
        xhr[i] = new XMLHttpRequest();
        xhr[i].open('GET', './resources/html/Modules/'+selectedModules[i]+'.html', true);
        xhr[i].onreadystatechange = function(){
          if (xhr[i].readyState === 4 && xhr[i].status === 200){
            document.getElementById(selectedModules[i]).innerHTML= this.responseText;
          }
        };
        xhr[i].send();
      })(i);
    }
  })();
};*/
