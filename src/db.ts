import "reflect-metadata";
import { createConnection, IsNull, Connection } from "typeorm";
import { Employee } from './entity/Employee';


export async function dbConn(){
    return await createConnection()
};

export async function getEmployeesWithoutManager(conn:Connection){
    const employeeRepository = conn.getRepository(Employee);
    const employees = await employeeRepository.find({
        managerId: IsNull()
    });
    // console.log("All Employees Without Manager: ", employees);
    return employees;
}

export async function getEmployeesByManagerId (managerId:number, conn:Connection) {

    const employeeRepository = conn.getRepository(Employee);
    const employees = await employeeRepository.find( {where: { 
        managerId: managerId
    }});

    // console.log("All Employees By ManagerId: ", employees);
    return employees;
}


