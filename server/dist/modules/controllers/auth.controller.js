export const controllerName = async (req, res, next) => {
    try {
        // logic
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
