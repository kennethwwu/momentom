## Quick Start

### Run in the local machine
You should have node.js version 8 or above installed

1. **Install the packages**
```bash
  npm i
  ```

2. **Setup mysql database**
Update your mysql credentials in ormconfig.json
Or
Run mysql in Docker container
```bash
  docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin -e MYSQL_DATABASE=mydata -d mysql
  ```
3. **Run the App and print employee table**
```bash
  npm run start
  ```
