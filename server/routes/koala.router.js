const express = require('express');
const koalaRouter = express.Router();
// DB CONNECTION
const pg = require('pg')
const pool = new pg.Pool({
    hostname: 'localhost',
    port: 5432,
    database: 'koala_Holla'
  })

// GET
koalaRouter.get('/', (req, res) => {
    const sqlQueryText = `
      SELECT * FROM "koalas"
        ORDER BY "name";
    `
    pool.query(sqlQueryText)
      .then((dbResult) => {
        console.log('dbResult.rows:', dbResult.rows)
        res.send(dbResult.rows)
      })
      .catch((dbError) => {
        res.sendStatus(500)
      })
  
  });

// POST
koalaRouter.post('/', (req, res) => {
  console.log('POST /koalas got a request, here is req.body:')
  console.log(req.body)
  let sqlQueryText = `
  INSERT INTO "koalas"
  ("name", "age", "gender", "ready_to_transfer", "notes")
  VALUES
    ($1, $2, $3, $4, $5);
  `
  pool
  .query(sqlQueryText,[
    req.body.name,
    req.body.age,
    req.body.gender,
    req.body.ready_to_transfer,
    req.body.note,
  ])
    .then((dbResult) => {
      res.sendStatus(201)
    })
    .catch((dbError) => {
      console.log('POST /koalas SQL query failed:', dbError)
      res.sendStatus(500)
    })})

// PUT
koalaRouter.put('/:id', (req,res) => {
  let idOfKoala = req.params.id;
  const sqlText = `
      UPDATE "koalas"
	      SET "ready_to_transfer" = True
	      WHERE "id" = $1;`
    
  const sqlValues = [idOfKoala]
          pool.query(sqlText, sqlValues)
            .then((dbResult) => {
              res.sendStatus(200)
            })
            .catch((dbError) => {
              console.log('PUT /books/:id failed:', dbError);
              res.sendStatus(500);
            })
        }
)


// DELETE

module.exports = koalaRouter;