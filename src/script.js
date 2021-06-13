const {dialog} = require('electron').remote
const path = require('path')
const fs = require('fs')
let pathFolder
var chooseBtn = document.getElementById('chooseLocation')
chooseBtn.addEventListener('click',function(){
        pathFolder = dialog.showOpenDialog({
        properties: ['openDirectory']  
    });
    execution(pathFolder)
})
function execution(fPath){
    let paths = fs.readdirSync(fPath)
}