import { pool } from '../config/database.js'
import React, { useState, useEffect } from 'react'

const createCar = async (req, res) => {
  console.log("creating ")
  // console.log(req.body)
  try {

    console.log(req)
      const { exterior, roof, price } = req.body

      console.log(req.body)
      // console.log(req.body)
      const results = await pool.query(`
          INSERT INTO car (exterior, roof, price)
          VALUES($1, $2, $3)
          RETURNING *`,
          [exterior, roof, price]
      )

      res.status(201).json(results.rows[0])
  } catch (error) {
    
      res.status(409).json( { error: error.message } )
  }
}
const getColor= async (req, res) => {
  try {
    const results = await pool.query('SELECT DISTINCT color,image,price FROM colors')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}
const deleteCar = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM car WHERE id = $1', [id])
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}
const getCar= async (req, res) => {
  try {
    const results = await pool.query('SELECT* FROM car')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}
const getRoof= async (req, res) => {
  try {
    const results = await pool.query('SELECT DISTINCT color,image,price, isconvertible FROM roof')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}
const getCarById = async (req, res) => {
  try {
    const eventId = req.params.eventId
    const selectQuery = `SELECT exterior, roof, price FROM car WHERE id = ${eventId}`
    const results = await pool.query(selectQuery)

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}
export default {
getCarById,
getColor,
getRoof,
createCar,
getCar,
deleteCar 
}

// Where location = `The Echo Lounge & Music Hall`

// const getEvents= async (req, res) => {
//   try {
//     const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
//     res.status(200).json(results.rows)
//   } catch (error) {
//     res.status(400).json( { error: error.message } )
//   }
// }


// const createEvent = async (req, res) => {

//   try {
//     const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
//     const results = await pool.query(`
//         INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon)
//         VALUES($1, $2, $3, $4, $5, $6, $7)
//         RETURNING *`,
//         [name, pricepoint, audience, image, description, submittedby, submittedon]
//     )

//     res.status(201).json(results.rows[0])
// } catch (error) {
//     res.status(409).json( { error: error.message } )
// }
    
// }

// const getEvents= async (req, res) => {
//   try {
//     const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
//     res.status(200).json(results.rows)
//   } catch (error) {
//     res.status(400).json( { error: error.message } )
//   }
// }


// const getLocation = async (req, res) => {
//     try {
//         const results = await pool.query('SELECT DISTINCT location FROM events')
//         res.status(200).json(results.rows)
//       } catch (error) {
//         res.status(400).json( { error: error.message } )
//       }
//   }
//   const getEventByLocation = async (req, res) => {

//     try {
//         const locationId = req.params.locationId
//         const selectQuery = `SELECT  DISTINCT name, date, time, location, img_url FROM events WHERE locationid = ${locationId}`
//         const results = await pool.query(selectQuery)
//         res.status(200).json(results.rows)
//       } catch (error) {
//         res.status(409).json( { error: error.message } )
//       }
//   }
  
  ///location = $1', [req.params.locationId]