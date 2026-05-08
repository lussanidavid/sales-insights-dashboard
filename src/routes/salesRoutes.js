const express = require('express')
const router = express.Router()
const pool = require('../database/db')

router.get('/sales', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM sales
    `)

    res.json(result.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: 'Erro ao buscar vendas'
    })
  }
})

router.get('/sales/categories', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        category,
        SUM(sales) AS total_sales
      FROM sales
      GROUP BY category
    `)

    res.json(result.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: 'Erro ao buscar categorias'
    })
  }
})

router.get('/sales/top-products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        product_name,
        SUM(quantity) AS total_quantity
      FROM sales
      GROUP BY product_name
      ORDER BY total_quantity DESC
    `)

    res.json(result.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: 'Erro ao buscar produtos'
    })
  }
})

router.get('/sales/category/:category', async (req, res) => {
  try {
    const { category } = req.params

    const result = await pool.query(
      `
      SELECT *
      FROM sales
      WHERE category = $1
      `,
      [category]
    )

    res.json(result.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: 'Erro ao buscar categoria'
    })
  }
})

router.get('/sales/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        SUM(sales) AS total_revenue,
        SUM(profit) AS total_profit,
        SUM(quantity) AS total_quantity,
        COUNT(*) AS total_orders
      FROM sales
    `)

    res.json(result.rows[0])
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: 'Erro ao buscar resumo'
    })
  }
})

router.get('/sales/profit-by-category', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        category,
        SUM(profit) AS total_profit
      FROM sales
      GROUP BY category
      ORDER BY total_profit DESC
    `)

    res.json(result.rows)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: 'Erro ao buscar lucro por categoria'
    })
  }
})

module.exports = router