require.config({
    // Set paths
    paths: {
        jquery    : '../vendor/jquery/1.11.1/jquery-1.11.1.min',
        underscore: '../vendor/underscore/1.6.0/underscore-min',
        backbone  : '../vendor/backbone/1.1.2/backbone-min',
        fuelux    : '../vendor/fuelux/js/tree.min',
        moment    : '../vendor/moment/moment',
        text      : '../vendor/require/text',
        bootstrap : '../vendor/bootstrap/dist/js/bootstrap.min',
        templates : '../html/templates'
    },
    
    shim: {
        bootstrap: {
            deps: ['jquery', 'underscore'],
            exports: 'bootstrap'
        },
        fuelux: {
            deps: ['jquery', 'bootstrap'],
            exports: 'fuelux'
        }
    }
});

require(['app'], function(App){
    App.start();
});