// ///// (1)
// const fs = require('node:fs');
// const path = require('node:path');

// function file(filePath , dirPath){
//     console.log('filePath:', filePath);
//     console.log("dirPath" , dirPath);
// }
// file(__filename , __dirname);
// //------------------------------------------------------------------------------------------------------------------
// //(2)
// function fileName(filePath){
//     console.log('fileName:', path.basename(filePath));
// }
// fileName(__filename);
// //------------------------------------------------------------------------------------------------------------------
// //(3)
// const objectPath = { dir: "/folder", name: "app", ext: ".js"};
// const buildPath= (objectPath) => {
//     return path.join(objectPath.dir,objectPath.name + objectPath.ext);
// }
// const finalPath = buildPath(objectPath);
// console.log('path:', finalPath);
// //------------------------------------------------------------------------------------------------------------------
// //(4)
// const fs1 = require('node:fs');
// const path2 = require('node:path');
// const filePath = '/test.md';
// function getFileExtension(filePath) {
//     return path2.extname(filePath);
// }
// console.log(getFileExtension(filePath));
// //------------------------------------------------------------------------------------------------------------------
// //(5)
// const {name, ext} = path.parse(__filename);
// console.log({Name:name , Ext:ext});
// //------------------------------------------------------------------------------------------------------------------
// //(6)
// function isAbsolutePath(filePath) {
//     return path.isAbsolute(filePath);
// }
// console.log(isAbsolutePath(__filename)); // true
// console.log(isAbsolutePath('./Assignment-2/test.md')); //false
// //------------------------------------------------------------------------------------------------------------------
// //(7)
// function joinPathSegments1(obj) {
//     const{src, components, App} = obj;
//     return path.join(src, components, App);
// }
// console.log(joinPathSegments1({src: "src", components: "components", App: "App.js"})); // src/components/App.js

// function joinPathSegments2(...arg){
//     return path.join(...arg)
// }
// console.log(joinPathSegments2("src" ,"components","App.js" ))

// //------------------------------------------------------------------------------------------------------------------
// //(8)
// function resolveRelativePath(filePath){
//     return path.resolve(filePath)
// }
// console.log("absolute path is: " , resolveRelativePath('./main.js'));
// //------------------------------------------------------------------------------------------------------------------
// //(9)
// function joinTwoPaths(path1 , path2){
//     return path.join(path1 ,path2)
// }
// console.log("the joining paths:" , joinTwoPaths('/folder1' , 'folder2/file.txt'))
// //------------------------------------------------------------------------------------------------------------------
// //(10)
// function deleteFile(filePath){
//     fs.unlink(filePath , (error)=>{
//         if(error){
//             console.log(error.message);
//         }
//         console.log(`the file ${filePath} is deleted `);
        
//     })
// }
// deleteFile('test.txt')
// // //------------------------------------------------------------------------------------------------------------------
// //(11)
// function creatFolderSync(folderPath){
//     try {
//         fs.mkdirSync(folderPath )
//         console.log("Success");
        
//     } catch (error) {
//         console.log(error.message);    
//     }
// }
// console.log(creatFolderSync('./data'));
// //------------------------------------------------------------------------------------------------------------------
// //(12)
const { EventEmitter } = require("node:events")
 const event = new EventEmitter();

 event.on("start" , (data)=>{
    console.log({data})
 })
 event.emit("start" , "Welcome event triggered!")
 //------------------------------------------------------------------------------------------------------------------
 //(13)
 event.on("login" , (name)=>{
    console.log(`User logged in: ${name}`)
 })
 event.emit("login" , "Ahmed")
//------------------------------------------------------------------------------------------------------------------
//(14)
const fs = require('node:fs')
const path = require('node:path')
try {
    const filePath = path.resolve('notes.txt')
    const data = fs.readFileSync(filePath , "utf-8")
    console.log({data});
} catch (error) {
    console.log(error.message);
    
}
//------------------------------------------------------------------------------------------------------------------
//(15)
const fs1 = require('node:fs/promises');
const { error } = require("node:console");
async function writeToFile(filePath,data){
    await fs1.writeFile(filePath , data , {flag:"w"},(error)=>{
        if(error){
            console.log(error.message);
        }
        console.log("Done✅");
    })
}
writeToFile(path.resolve("async.txt") , "Async save")
////------------------------------------------------------------------------------------------------------------------
//(16)
const exsist = fs.existsSync("notes.txt")
console.log({exsist});
////------------------------------------------------------------------------------------------------------------------
//(17)
const os = require('os');

function getSystemInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}
const systemInfo = getSystemInfo();
console.log({systemInfo});
////------------------------------------------------------------------------------------------------------------------
//(18)












