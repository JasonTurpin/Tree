define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',
    'load'
], function($, _, Backbone, Bootstrap, AppManagerRouter, load){
    var AppManager = {
        Models      : {},
        Collections : {},
        Views       : {},

        start: function() {
            // Build router
            var router = new AppManagerRouter();

            // Sets Backbone to use web root
            Backbone.history.start({pushState: true, root: '/'});

            load.initialize();
        }
    };
    return AppManager;
});
