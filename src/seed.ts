import { Employee } from './entity/Employee';
import { getConnection, Connection } from 'typeorm'


// Alan 100 150
// Martin 220 100
// Jamie 150
// Alex 275 100
// Steve 400 150
// David 190 400

export async function seedData(conn:Connection){

    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Employee)
    .values([
        { id: 100, name: "Alan", managerId:150  }, 
        { id: 220, name: "Martin", managerId:100  }, 
        { id: 150, name: "Jamie", managerId:null  }, 
        { id: 275, name: "Alex", managerId:100  }, 
        { id: 400, name: "Steve", managerId:150  }, 
        { id: 190, name: "David", managerId:400  }, 
        // { id: 300, name: "Ken", managerId:220  }, 
     ])
    .execute();

    const employeeRepository = conn.getRepository(Employee);

    let employees = await employeeRepository.find();
    // console.log("All Employees from the db: ", employees);
}
