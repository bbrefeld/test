//Modules to load
const modulesToLoad = [];

//Run scripts when page is loaded
window.onload = async function(){
  await getIDs();
  getHtml(modulesToLoad);
  changeNavLink(modulesToLoad[1]);
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

const changeNavLink = mainID => {
  const activeID = mainID.replace("Main","") + "Nav";
  console.log(activeID);
  let activeNavButton = document.getElementById(activeID);
  console.log(activeNavButton);
  activeNavButton.style.color = "#368ff4";
}
