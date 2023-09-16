/* const fs = require('fs');

fs.writeFileSync('archivo.txt','primer archivo creado');

let infoArchivo = fs.readFileSync('archivo.txt','utf-8');
console.log(infoArchivo);

//fs.unlinkSync('archivo.txt');

const exiteArchivo = fs.existsSync('archivo.txt');
console.log(exiteArchivo);

fs.appendFileSync('archivo.txt',' segundo parrafo');
infoArchivo = fs.readFileSync('archivo.txt','utf-8');
console.log(infoArchivo); */

/* const fs = require('fs');

fs.writeFile('archivo.txt','primer archivo creado',(error)=>{
    if(error)
        console.log(error);
    else
        console.log('todo OK');
});

fs.readFile('archivo.txt','utf-8',(error,info)=>{
    if(error)
        console.log(error);
    else
        console.log(info);
});

fs.unlink('archivo.txt',(error)=>{
    if(error)
        console.log(error);
    else
        console.log('todo OK');
}); */


/* const fs = require('fs');

fs.promises.writeFile('archivo.txt','PICROSS')
.then(()=>console.log('todo OK'))
.catch((error)=>console.log(error));
console.log(fs.existsSync('archivo.txt'));

const readFile = async () => {
    try{
        const file = await fs.promises.readFile('archivo.txt','utf-8');
        console.log(file);
    }catch (error){
        console.log(error);
    }
}
readFile();
fs.promises.unlink('archivo.txt'); */

/* const fs = require('fs');

const cars = [
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Silver',
    },
    {
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      color: 'Blue',
    },
    {
      make: 'Ford',
      model: 'Mustang',
      year: 2020,
      color: 'Red',
    },
    {
      make: 'Chevrolet',
      model: 'Malibu',
      year: 2019,
      color: 'Black',
    },
  ];
  
  console.log(cars);

  const makeFile = async (file,thing) => {
    try{
        await fs.promises.writeFile(file,JSON.stringify(thing));
        console.log('OK');
    }catch(error){
        console.log(error);
    }    
  }
  
makeFile('test.json',cars);

const getFile = async (file) => {
    const read = await fs.promises.readFile(file,'utf-8');
    console.log(JSON.parse(read));
}

getFile('test.json'); */

/* const fs = require('fs');

class UserManager{

    constructor(path){
        this.path = path;
    }

    async getUsers(){
        try {
            if ( fs.existsSync(this.path) ){
                const info = await fs.promises.readFile(this.path,'utf-8');
                return JSON.parse(info);
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }

    async createUser(obj){
        try {
            const users = await this.getUsers();
            
            let id;
            if(!users.length){
                id = 1;
            }else{
                id = users[users.length - 1].id + 1;
            }

            users.push({id,...obj});

            await fs.promises.writeFile(this.path,JSON.stringify(users));

        } catch (error) {
            return error;
        }
    }

    async getUserById(id){

        try {
            const users = await this.getUsers();
            const user = users.find(u=>u.id === id);

            if(user){
                return user;
            }else{
                return 'no user';
            }

        } catch (error) {
            return error;
        }
    }

    async delUser(id){
        try {
            const users = await this.getUsers();
            const newArrayUsers = users.filter(u=>u.id!==id);

            await fs.promises.writeFile(this.path,JSON.stringify(newArrayUsers));

        } catch (error) {
            return error;
        }
    }
}

async function test(){

    const manager1 = new UserManager('users.json');
    const user1 = {
        fistName: 'Javier',
        lastName: 'Milei',
        age: 50,
        position: 'President',
    }

    await manager1.createUser(user1);
    await manager1.createUser(user1);
    await manager1.createUser(user1);


    let users = await manager1.getUsers();
    console.log(users);
    console.log(await manager1.getUserById(3));
    await manager1.delUser(2);
    console.log(await manager1.getUserById(2));
}

test(); */