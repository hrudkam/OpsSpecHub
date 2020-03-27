// Forces use of mssql library and express 
var express = require('express');
var app = express();
var sql = require('mssql');
var http = require('http');
var io = require('socket.io')(http); 
var cors = require('cors');
const router = express.Router();
app.use(cors());

//Request Headers
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
  
//Connection String Info
var config = {
  server: 'RDV-004315\\SQL2016',
  database: 'OpsSpec',
  user: 'sa',
  password: 'wstinol',
  port: 1433,
  options:
  {
      enableArithAbort: true
  }
  
};

//Start up Service to run endpoint
var server = http.createServer(app);
server.listen(3001,'10.10.27.253');
// server.listen(3001,'10.10.16.13');

server.on('listening',function(){
  console.log('express server started on port %s at %s', server.address().port, server.address().address);
});


//get all RFA Data
app.get('/rfaclass', async (req, res)=>{
  sql.connect(config).then(pool=>{
    return pool.request()
    .query(" select distinct  rfa.rfanum, ISNULL(CAST(rfa.sinum as int),0)[sinum], ISNULL(CAST(rfa.hsi as int),0)[hsi], ISNULL(CAST(c.companyname as nvarchar(MAX)),'No Customer Name')[customer], ISNULL(CAST(rfa.functionality as nvarchar(MAX)),'No Functionality Found')[functionality], ISNULL(CAST(rfa.summary as nvarchar(MAX)),'No Summary Found')[summary], ISNULL(CAST(rfa.siowner as nvarchar(MAX)),'No SI Owner Found')[siowner], ISNULL(CAST(rfa.responsible as nvarchar(MAX)),'No Responsible Ops Spec Found')[responsible], ISNULL(CAST(rfa.approved as nvarchar(MAX)),'No Approving Ops Spec Found')[approved], ISNULL(CAST(rfa.rfastatus as nvarchar(MAX)),'No RFA Status')[rfastatus], ISNULL(CAST(rfa.type as nvarchar(MAX)),'No RFA Type Found')[rfatype], ISNULL(CAST(rfa.dbcategory as nvarchar(MAX)),'No DB Category')[category],  ISNULL(CAST(rc.urgency as int),0)[urgency], ISNULL(CAST(c.maint as money),0)[maint], ISNULL(CAST(s.points as int),0) + ISNULL(CAST(t.points as int),0) + ISNULL(CAST(cx.points as int),0) as total, rfa.severity   from dbo.rfadata rfa   left join dbo.severity s 	on rfa.severity = s.level   left join dbo.functionality f on rfa.functionality = f.functionality   left join dbo.complexity cx on f.cmplxnum = cx.cmplxnum   left join dbo.customer c on rfa.hsi = c.hsi   left join dbo.tiers t on c.tiernum = t.tiernum   left join dbo.rfaxurgency rc on rfa.rfanum = rc.rfanum   order by total desc  ")
  })
  .then(result =>{
    //   console.log(result)
      res.end(JSON.stringify(result.recordset));
  })
  .catch(err=>{

  })
    
})

//Create an Escalation
app.post('/escalation/:rfanum', async (req, res)=>{
sql.connect(config).then(pool=>{
  var rfanum = req.params.rfanum;
  var updatequery = 'insert into dbo.rfaxurgency values(' + rfanum + ', 1)';
  return pool.request()
  .query(updatequery)
})
.then(result =>{
  //   console.log(result)
    res.end(JSON.stringify(result.recordset));
    sql.close();
})
.catch(err=>{

})
  
})

//Complete Escalation
app.delete('/completeescrfa/:rfanum', async (req, res)=>{
sql.connect(config).then(pool=>{
  var rfanum = req.params.rfanum;
  var updatequery = 'delete from dbo.rfaxurgency where rfanum =' + rfanum;
  return pool.request()
  .query(updatequery)
})
.then(result =>{
  //   console.log(result)
    res.end(JSON.stringify(result.recordset));
    sql.close();
})
.catch(err=>{

})
  
})

// Get all Modules
app.get('/modules', async (req, res)=>{
  sql.connect(config).then(pool=>{
    return pool.request()
    .query('select functionality,systemtype,resource from dbo.functionality')
  })
  .then(result =>{
    //   console.log(result)
      res.end(JSON.stringify(result.recordset));
  })
  .catch(err=>{

  })
    
})

//Get A4's,A3's,A2's
app.get('/employees', async (req, res)=>{
sql.connect(config).then(pool=>{
  return pool.request()
  .query('select employeename,title from dbo.employees')
})
.then(result =>{
  //   console.log(result)
    res.end(JSON.stringify(result.recordset));
})
.catch(err=>{

})
  
})

//Get RFA Assignments
app.get('/rfaassign', async (req, res)=>{
sql.connect(config).then(pool=>{
  return pool.request()
  .query('select distinct a.rfanum,a.sinum,a.opsspecname[assignment],rfa.responsible,rfa.approved,rfa.functionality, rfa.summary,rfa.type,rfa.severity from dbo.rfaxopspec a left join dbo.rfadata rfa on a.rfanum = rfa.rfanum where rfa.rfanum is not null  order by a.rfanum desc')
})
.then(result =>{
  //   console.log(result)
    res.end(JSON.stringify(result.recordset));
})
.catch(err=>{

})
  
})

//Get all Ops Spec
app.get('/opsspec', async (req, res)=>{
  sql.connect(config).then(pool=>{
    return pool.request()
    .query('select opsspecnum, osfullname,isavailable from dbo.opsspec order by opsspecnum asc')
  })
  .then(result =>{
    //   console.log(result)
      res.end(JSON.stringify(result.recordset));
  })
  .catch(err=>{
  
  })
    
  })

//Make Employee available
app.put('/isavail/:osnum', async (req, res)=>{
  sql.connect(config).then(pool=>{
    var osnum = req.params.osnum;
    var updatequery = 'update dbo.opsspec set isavailable =1 where opsspecnum =' + osnum;
    return pool.request()
    .query(updatequery)
  })
  .then(result =>{
    //   console.log(result)
      res.end(JSON.stringify(result.recordset));
      sql.close();
  })
  .catch(err=>{
  
  })
    
  })

//Make Employee Not Available
app.put('/notavail/:osnum', async (req, res)=>{
  sql.connect(config).then(pool=>{
    var osnum = req.params.osnum;
    var updatequery = 'update dbo.opsspec set isavailable =0 where opsspecnum =' + osnum;
    return pool.request()
    .query(updatequery)
  })
  .then(result =>{
    //   console.log(result)
      res.end(JSON.stringify(result.recordset));
      sql.close();
  })
  .catch(err=>{
  
  })
    
  })
  