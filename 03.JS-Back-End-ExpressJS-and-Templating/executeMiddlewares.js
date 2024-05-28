const middlewareChain = require('./middlewareImplementation');

middlewareChain.use((req, res, next) => {
    req.user = 'Pesho';
    console.log('First middlware');
    next();
});

middlewareChain.use((req, res, next) => {
    req.age = 20;
    console.log('Second middlware');
    next();
});

middlewareChain.use((req, res, next) => {
    req.isAuthenticated = true;    
    console.log('Third middlware');
    next();
});

middlewareChain.execute({}, {}, (req, res) => {
    console.log('MiddlewaRE CHAIN finnished');
    console.log(req);
});
