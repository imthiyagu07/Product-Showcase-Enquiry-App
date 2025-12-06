import db from "../db/database.js";

export const createEnquiry = async (req, res) => {
    try {
        const {product_id, name, email, phone, message} = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({error: "All fields are required"});
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Please provide a valid email address' 
            });
        }
        const query = `
        INSERT INTO enquiries (product_id, name, email, phone, message)
        VALUES(?, ?, ?, ?, ?)`;
        db.run(query, [product_id, name, email, phone, message], function(err){
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.status(201).json({ 
                message: 'Enquiry submitted successfully',
                enquiry: {
                    id: this.lastID,
                    product_id,
                    name,
                    email,
                    phone,
                    message
                }
            });
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getAllEnquires = async (req, res) => {
    try {
        const query = `
        SELECT e.*, p.name as product_name
        FROM enquiries e
        LEFT JOIN products p ON e.product_id = p.id
        ORDER BY e.created_at DESC`;
        db.all(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.json({enquiries: rows, total: rows.length});
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}