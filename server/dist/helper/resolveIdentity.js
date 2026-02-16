import createHttpError from "http-errors";
const resolveIdentity = (req) => {
    if (req.user?.id) {
        return { type: 'user', userId: req.user.id };
    }
    if (req.headers['x-guest-id']) {
        return {
            type: 'guest',
            guestId: String(req.headers['x-guest-id']),
        };
    }
    throw createHttpError(401, 'Identity not found');
};
export default resolveIdentity;
