
export const logger=(req, res, next) => {
    console.log("Request received",req.body.name);
    res.locals.customData = "Hello from middleware";
    console.log(`${req.method} ${req.url}`);
    next();
}
