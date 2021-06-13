const {dialog} = require('electron').remote
const path = require('path')
const fs = require('fs')
let pathFolder,newPath
let config = {
    nodeProject:false,
    pythonProject:false
}
var chooseBtn = document.getElementById('chooseLocation')
chooseBtn.addEventListener('click',function(){
        pathFolder = dialog.showOpenDialog({
        properties: ['openDirectory']  
    });
        pathFolder.then(res=>{
            newPath =res.filePaths[0]
            execution(newPath)
        })
    
})
function execution(fPath){
    let paths = fs.readdirSync(fPath)
    lookAllFiles(paths)
}
function lookAllFiles(files){
    let currentPath
    let allFiles=[]
    if(files.length >0){
        files.map(res=>{
            if(res.includes('.')){
                allFiles.push(res)
            }else{
                let subFile = fs.readdirSync(newPath+'/'+res)
                subFile.map(pa=>{
                    allFiles.push(pa)
                })
            }
        })

    }
    allFiles.map(res=>{
        let list = document.getElementsByTagName('ul')
        list[0].innerHTML += "<li> "+res+" </li> "
        
        if(res == 'node_modules'){
            config.nodeProject = true
            let project = document.getElementById('ProjectType')
            project.innerHTML = 'Node'
        }
        if(res =='package.json'){
            console.log('found node file')
        }
    })
}
