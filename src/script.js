const {dialog} = require('electron').remote
var result = document.getElementById('result')
const path = require('path')
let iconsarea = ''
const fs = require('fs')
let pathFolder,newPath
let config = {
    nodeProject:false,
    pythonProject:false,
    noOfJsFiles:0,
    noOfHtmlFiles:0,
    noOfImageFiles:0
}
Element.prototype.hide = function(){
    this.style.display = 'none'
}
Element.prototype.show = function(){
    this.style.display = ''
}
Element.prototype.html = function(text){
    this.innerHTML = text
}
result.hide()
var chooseBtn = document.getElementById('chooseLocation')
let list = document.getElementsByTagName('ul')

chooseBtn.addEventListener('click',function(){
        pathFolder = dialog.showOpenDialog({
        properties: ['openDirectory']  
    });
        pathFolder.then(res=>{
            config = {
                nodeProject:false,
                pythonProject:false,
                noOfJsFiles:0,
                noOfHtmlFiles:0,
                noOfImageFiles:0
            }
            list[0].html('')
            result.show()
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
        list[0].innerHTML += "<li> "+res+" </li> "
        
        if(res == 'node_modules'){
            config.nodeProject = true
            let project = document.getElementById('ProjectType')
            project.innerHTML = 'Node'
            iconsarea+="<img src='./images/js-format.png' />"
        }
        if(res =='package.json'){
            console.log('found node file')
        }
        if(res.includes('.js')){
            config.noOfJsFiles+= 1
        }
        if(res.includes('.png')||res.includes('.jpeg')){
            config.noOfImageFiles+= 1
        }
        if(res.includes('.html')){
            config.noOfHtmlFiles+= 1
        }
        if(res == '.git'){
            iconsarea+="<img src='./images/git.png' />"
        }
    })
    let noOfJSFiles = document.getElementById('noOfJSFiles')
    let noOfHTMLFiles = document.getElementById('noOfHTMLFiles')
    let noOfImageFiles = document.getElementById('noOfImageFiles')
    let pngarea = document.getElementsByClassName('icons-area')
    noOfHTMLFiles.html(config.noOfHtmlFiles)
    noOfJSFiles.html(config.noOfJsFiles)
    noOfImageFiles.html(config.noOfImageFiles)
    pngarea[0].html(iconsarea)
}


