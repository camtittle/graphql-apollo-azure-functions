export const isAuthenticated = (req) => {
    return req.headers.authorization !== undefined;
};