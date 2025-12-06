import db from "../db/database.js";

export const getAllProducts = async (req, res) => {
    try {
        const {search='', category='', page=1, limit=10} = req.query;
        const offset = (page - 1) * limit;
        let query = `SELECT * FROM products WHERE 1=1`;
        const params = [];
        if (search) {
            query += ' AND (name LIKE ? OR short_desc LIKE ? OR long_desc LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));
        let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
        const countParams = [];
        if (search) {
            countQuery += ' AND (name LIKE ? OR short_desc LIKE ? OR long_desc LIKE ?)';
            countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        if (category) {
            countQuery += ' AND category = ?';
            countParams.push(category);
        }
        db.get(countQuery, countParams, (err, countResult) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            db.all(query, params, (err, rows) => {
                if (err) {
                    return res.status(500).json({error: err.message});
                }
                res.json({
                    products: rows,
                    pagination: {
                        total: countResult.total,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(countResult.total / parseInt(limit))
                    }
                });
            });
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            if (!row) {
                return res.status(404).json({error: 'Product not found'});
            }
            res.json(row);
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}