define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/404.html'
], function($, _, Backbone, FourOhFour) {
    var AppManagerViewsAddon = Backbone.View.extend({
        /**
         * Initialize the view
         *
         * @param array options Options array
         *
         * @return void
         */
        initialize: function(options) {
            // Sets options
            this.options = options;

            // Render the HTML
            this.render();
        },

        /**
         * Renders the HTML for the page
         *
         * @return void
         */
        render: function() {
            $('#textsContainer').html(_.template(FourOhFour, {}));
        }
    });
    return AppManagerViewsAddon;
});
