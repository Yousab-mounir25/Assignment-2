///////  CRUD operations
const { error } = require('console');
const http = require('http')
let port = 3000
const fs = require('fs')
const path = require('path')

const httpServer = http.createServer((req,res)=>{
    const {url , method} = req;

    // (1) addUser
    if(url=='/signup' && method ==="POST"){
        let data = ""
        req.on("data" , (chunk)=>{
            data+=chunk
        })
        req.on("end" , ()=>{
            data = JSON.parse(data);
            const {name ,email, password} = data
            const users= fs.readFile(path.resolve('users.json') , "utf-8" , (error , data)=>{
                if(error){
                    res.writeHead(500 , {"Content-Type": "application/json"})
                    res.write(JSON.stringify({message:"FAIL"}))
                    res.end()
                }else{
                    data = JSON.parse(data)
                    const match = data.find(ele=> ele.email == email)
                    if(match){
                        res.writeHead(409 , {"Content-Type": "application/json"})
                        res.write(JSON.stringify({message:"Email already exist"}))
                        res.end()
                    }else{
                        data.push({id:Date.now() , name ,email,password})
                        fs.writeFile(path.resolve("users.json") , JSON.stringify(data), (error)=>{
                            if(error){
                                res.writeHead(500 , {"Content-Type": "application/json"})
                                res.write(JSON.stringify({message:"FAIL:exist"}))
                                res.end()             
                            }else{
                                res.writeHead(201 , {"Content-Type": "application/json"})
                                res.write(JSON.stringify({message:"user added successfully"}))
                                res.end()
                            }
                        })
                    }
                }
            })
        })


        ///=============================================================================


        ///(2)Update User
    }else if(url.startsWith("/user/") && method =="PATCH"){
        let body ="";
        req.on("data" , (chunk)=>{
            body+=chunk;
        })
        req.on("end" ,()=>{
            body=JSON.parse(body);
            const id =Number(url.split('/')[2]);
            fs.readFile(path.resolve('users.json'),"utf-8" , (error , data)=>{
                if(error){
                     res.writeHead(500, {
                    "Content-Type": "application/json" });

                     res.end(JSON.stringify({
                    message: "Failed to read file"}));
                }else{
                    data = JSON.parse(data);
                    const user = data.find(ele=> ele.id == id)
                    if(!user){
                          res.writeHead(404, {
                        "Content-Type": "application/json"});

                        res.end(JSON.stringify({
                        message: "User not found"}));
                    }else{
                            if (body.name) {
                                user.name = body.name;
                            }

                            if (body.email) {
                                user.email = body.email;
                            }

                            if (body.age) {
                                user.age = body.age;
                            }
                            fs.writeFile(path.resolve('users.json') , JSON.stringify(data),(error)=>{
                                            if (error) {

                                                res.writeHead(500, {
                                                    "Content-Type": "application/json"
                                                });

                                                res.end(JSON.stringify({
                                                    message: "Failed to update user"
                                                }));

                                            }else{
                                                    res.writeHead(200, {
                                                            "Content-Type": "application/json"
                                                        });

                                                        res.end(JSON.stringify({
                                                            message: "User updated successfully",
                                                            user
                                                        }));
                                            }
                            })
                    }
                }
            })
        })
///=============================================================================

        ///(3) Delete user

    }else if (url.startsWith("/user/") && method == "DELETE") {

    const id = Number(url.split("/")[2]);

    fs.readFile(path.resolve("users.json"), "utf-8", (error, data) => {

        if (error) {

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Failed to read file"
            }));

        } else {

            data = JSON.parse(data);

            const user = data.find(ele => ele.id == id);

            if (!user) {

                res.writeHead(404, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "User ID not found."
                }));

            } else {

                data = data.filter(ele => ele.id != id);

                fs.writeFile(
                    path.resolve("users.json"),
                    JSON.stringify(data),
                    (error) => {

                        if (error) {

                            res.writeHead(500, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                message: "Failed to delete user"
                            }));

                        } else {

                            res.writeHead(200, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                message: "User deleted successfully."
                            }));

                        }

                    }
                );

            }

        }

    });

}


///=============================================================================


//(4) get all users
else if(url =='/users' && method =="GET"){
        const users = fs.readFile(path.resolve('users.json'), "utf-8" , (error , data)=>{
            if(error){
                    res.writeHead(500 , {"Content-Type": "application/json"})
                    res.write(JSON.stringify({message:"FAIL"}))
                    res.end()            
            }else{
                    res.writeHead(200 , {"Content-Type": "application/json"})
                    res.write(JSON.stringify({message:"Done" , data:JSON.parse(data)}  ))
                    res.end()
            }
        })
    }

    ///=============================================================================


    //(5) get user by id
    else if (url.startsWith("/user/") && method == "GET") {

    const id = Number(url.split("/")[2]);

    fs.readFile(path.resolve("users.json"), "utf-8", (error, data) => {

        if (error) {

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Failed to read file"
            }));

        } else {

            data = JSON.parse(data);

            const user = data.find(ele => ele.id == id);

            if (!user) {

                res.writeHead(404, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "User not found."
                }));

            } else {

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(user));

            }

        }

    });

}



})


function listen(port){
    httpServer.listen(port , ()=>{
        console.log(`the server is running on port ${port}`)
    })
}
listen(port)
httpServer.on("error" , (error)=>{
    if(error.code === "EADDINUSE"){
        ++port
        listen(port)
    }
})