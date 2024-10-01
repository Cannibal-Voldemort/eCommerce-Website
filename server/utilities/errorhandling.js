// For functions with req, res only
const tryCatchSimple = (fn) => {
    return async (req, res) => {
        try {
            await fn(req, res);
        } catch (error) {
            console.error('Error occurred:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};

// For functions with req, res, next
const tryCatchWithNext = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error('Error occurred:', error.message);
            next(error);  // Pass the error to the next middleware
        }
    };
};

module.exports = {
    tryCatchSimple,
    tryCatchWithNext
};
