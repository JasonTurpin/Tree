({
    paths: {
        jquery           : '../vendor/jquery/1.11.1/jquery-1.11.1.min',
        underscore       : '../vendor/underscore/1.6.0/underscore-min',
        backbone         : '../vendor/backbone/1.1.2/backbone-min',
        moment           : '../vendor/moment/moment',
        text             : '../vendor/require/text',
        bootstrap        : '../vendor/bootstrap/dist/js/bootstrap.min',
        templates        : '../html/templates'
    },
    shim: {
        bootstrap: {
            deps: ['jquery', 'underscore'],
            exports: 'bootstrap'
        }
    },
    baseUrl                : "js",
    name                   : "main",
    out                    : "dist/main.js",
    removeCombined         : true,
    findNestedDependencies : true
})