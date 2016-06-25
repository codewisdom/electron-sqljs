  var sql = require('./node_modules/sql.js/js/sql-debug.js');
  var fs = require("fs");
  //Ditto, path module
	var path = require('path');

  try {
	   var filebuffer = fs.readFileSync(path.join(__dirname, 'filename.sqlite'));
   } catch (e) {
     console.log(e);
   }

    if (filebuffer != null) {
      var db = new SQL.Database(filebuffer);
    } else {
      var db = new SQL.Database();
    }

    try {
      db.run("CREATE TABLE lorem (info TEXT)");
    } catch (e) {
      console.log(e);
    }

    for (var i = 0; i < 10; i++) {
          db.run("INSERT INTO lorem VALUES (" + i + ")");
    }

    db.each("SELECT * FROM lorem", function(row){console.log(row.info + " is cool!")} );

    try {
      fs.unlinkSync(path.join(__dirname, 'filename.sqlite'));
    } catch (e)
    {
      console.log("Unable to delete file; Exception: " + e);
    }
    fs.writeFileSync("filename.sqlite", new Buffer(db.export()));
