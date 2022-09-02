const express = require('express')
	const app = express()
    const port = 3000

    const config = {
		host: 'db',
		user: 'root',
		password: 'senha',
		database: 'mysql'
	};
    var table = "Nomes: <br>"

    let mysql = require('mysql2')
    let connection = mysql.createConnection(config)

    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');

        connection.query('SELECT * FROM people', function (err, result, fields) {
            if (err) throw err;
            console.log('select from people 1')

            nameToBeAdded = new String("Novo Nome " + result.length)

            const sql = `INSERT INTO people(name) values('${nameToBeAdded}')`
            connection.query(sql, function (err,result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            })
        })

      });


    app.get('/', (req,res) => {

        connection.query('SELECT * FROM people', function (err, result, fields) {
            if (err) throw err;
            console.log('select from people')
            console.log(result)
            var listLenght = result.length
            console.log(result.length)
            result.forEach(element => {
               table = table + element["name"] + "<br>"
            });
            res.send('<br><h1>Full Cycle!!!</h1><br></br>' + table)
        });
        })
        app.listen(port, ()=> {
            console.log('Rodando na porta ' + port)
        })