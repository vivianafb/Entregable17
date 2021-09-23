import app from './services/server'
import { DBService } from './services/db';
import {DBSqlite} from './services/sqlite'

const puerto = 8081;

// DBService.init();
// DBSqlite.init();
app.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));