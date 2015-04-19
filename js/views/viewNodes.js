define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!templates/viewNodes.html'
], function($, _, Backbone, Bootstrap, ViewNodes) {
    var AppManagerViewsAddon = Backbone.View.extend({
        /**
         * Initialize the view
         *
         * @param {Array} options Options array
         *
         * @return void
         */
        initialize: function(options) {
            // Sets options
            this.options = options;

            // Set context
            var that = this;


            console.log('loaded')
        }
    });
    return AppManagerViewsAddon;
});
