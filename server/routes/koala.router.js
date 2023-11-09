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
koalaRouter.post('/koalas', (req, res) => {
  console.log('POST /koalas got a request, here is req.body:')
  console.log(req.body)
  const sqlQueryText = `
  INSERT INTO "koalas"
  ("name", "age", "gender", "ready_for_transfer", "notes")
  VALUES
    ($1, $2, $3, $4, $5);
  `
  const sqlValues = [
    req.body.name,
    req.body.age,
    req.body.gender,
    req.body.ready_to_transfer,
    req.body.note,


  ]
  pool.query(sqlQueryText, sqlValues)
    .then((dbResult) => {
      res.sendStatus(201)
    })
    .catch((dbError) => {
      console.log('POST /koalas SQL query failed:', dbError)
      res.sendStatus(500)
    })})

// PUT


// DELETE

module.exports = koalaRouter;