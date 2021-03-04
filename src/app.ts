import { Employee } from './entity/Employee'
import { dbConn, getEmployeesWithoutManager, getEmployeesByManagerId } from './db';
import { Connection } from 'typeorm'
import { seedData } from './seed'

class MyNode{
  managerId:number|null;
  id:number;
  name: string;
  childNode:MyNode[] = [];
  constructor(id:number, name:string, managerId:number|null){
    this.managerId = managerId;
    this.id = id;
    this.name = name;
  }
}


const createNodeById = async ({id, managerId, name}: Employee, conn: Connection, tabs:string = '') => {
  const myNode = new MyNode(id, name, managerId)
  let printString = `${tabs}${myNode.name}\n`
  // get all children nodes by manger id
  const childNodeData = await getEmployeesByManagerId(id, conn)

  // if count(id) > 0 myNode.push(createNodeById(id))
  if(childNodeData.length > 0){
    for(let nodeDTO of childNodeData){
      const { myNode:childNode, printString:childPrintString} = await createNodeById(nodeDTO, conn, "\t"+tabs);
      myNode.childNode.push(childNode);
      printString += childPrintString;
    }
  } 
  
  return { myNode, printString}
}

// run the app
try{
  (async () => {
  
    const conn = await dbConn();
    await seedData(conn);
  
    const employeesWithoutManager = await getEmployeesWithoutManager(conn);
  
    for(let topEmployee of employeesWithoutManager){
      const { printString } = await createNodeById(topEmployee, conn);
      console.log(printString);
    }
  
    await conn.close();
  
  })();
}
catch(e){
  console.log(e)
}