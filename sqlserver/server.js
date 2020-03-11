const sql = require('mssql')

var config = {
    server: 'tech-035052\\sqlexpress16',
    database: 'OpsSpec',
    user: 'hsi',
    password: 'wstinol',
    port: 1433
};

const pool = new sql.ConnectionPool(config)