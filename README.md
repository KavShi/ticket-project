## Introduction

This is a ticketing support system created for course PA1414 at BTH.

TODO: Add image that helps to understand the project.

## How to Use

### Prerequisites

Before running this site, make sure you have Node.JS, npm and MariaDB installed.
[You can install Node.JS by clicking here.](https://nodejs.org/)
[You can install MariaDB by clicking here.](https://mariadb.org/download/)
From there, create your account and a database in MariaDB.

### Build
The project first requires you to run the setup.sql file. Without it the site is unable to store any tickets.
```
mysql -u your_username -p your_database_name < setup.sql
```
The site also runs on localhost:3000 by default. You can change the port by simply altering this line [in this file.](https://github.com/KavShi/ticket-project/blob/main/bin/www)
```
var port = normalizePort(process.env.PORT || '3000');
```

### Run
Once everything is set up, all you have to do is run this command in your console:
```
npm start
```
Then in your web browser, enter the port you have typed in (localhost:3000 by default) and the site should load.

## License

Copyright © 2024 Kaveh Shily

This work is licensed under [MIT](./LICENSE).
