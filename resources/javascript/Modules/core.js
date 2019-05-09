//Modules to load
const modulesToLoad = [];

//Run scripts when page is loaded
window.onload = async function(){
  await getIDs();
  await getHtml(modulesToLoad, changeNavLink);
};

//Get all ID's in the HTML File
const getIDs = () => {
  const ElementsWithId = document.querySelectorAll('*[id]');
  for (i=0; i<ElementsWithId.length; i++) {
    modulesToLoad.push(ElementsWithId[i].id);
  };
};

// Get HTML code from selected modules
const getHtml = (selectedModules, callback) => {
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
            if (i===3) {
              callback(modulesToLoad[1]);
            }
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
  if (activeID === "footerNav") {
    document.getElementById("contactNav").children[0].style.color = "#368ff4"
  } else if (activeID !== "indexNav") {
    document.getElementById(activeID).children[0].style.color = "#368ff4"
  };
}
