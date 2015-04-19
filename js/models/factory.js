define([
    'jquery',
    'underscore',
    'backbone',
    'util'
], function($, _, Backbone, util){
    var Factory = Backbone.Model.extend({
        // AJAX Request URL
        url: '',

        /**
         * Sets default values to factory object
         */
        defaults: {
            factory_id: null,
            label     : null,
            upperBound: null,
            lowerBound: null
        }
    });
    return Factory;
});
