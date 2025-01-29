const createHttpError = require('http-errors');
const Paste = require('../models/Paste'); 


/* POST: create a new paste */
const createPaste = async (req, res, next) => {
    try {
        const {content, expiresAt} = req.body;

        if(expiresAt && new Date(expiresAt) < new Date()) {
            throw createHttpError(400, 'Expiration date must be in the future');
        }

        const paste = new Paste({
            content,
            expiresAt,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedPaste = await paste.save();

        res.status(201).json({
            id: savedPaste._id,
            link: `/api/paste/${savedPaste._id}`,
            expiresAt: savedPaste.expiresAt,
            message: 'Paste created successfully'
        }); 
        } catch (err) {
        next(err);
    }
};

/* GET: fetch a paste by id */
const getPaste = async (req, res, next) => {
    try {
    if(req.paste.expiresAt && req.paste.expiresAt <= new Date()){
        await req.paste.deleteOne();
        throw createHttpError(404, 'Paste has expired');
    }
    res.json(req.paste);
    } catch (err) {
        next(err);
    }
};

/* DELETE: delete a paste by id */
const deletePaste = async (req, res, next) => {
    try {
        await req.paste.deleteOne();
        res.json('Paste deleted successfully');
    } catch (err) {
        next(createHttpError(500, 'Failed to delete paste', {details: err.message}));

    }
};



module.exports = {
    createPaste,
    getPaste,
    deletePaste
};
