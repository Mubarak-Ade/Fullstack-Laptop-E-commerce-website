import createHttpError from "http-errors";

const resolveIdentity = (req: any) => {
    if (req.user?.id) {
        return { type: 'user', userId: req.user.id } as const;

    }

    if (req.headers['x-guest-id']) {
        return {
            type: 'guest',
            guestId: String(req.headers['x-guest-id']),
        } as const;
    }
    
    throw createHttpError(401, 'Identity not found');
};

export default resolveIdentity;