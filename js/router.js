define([
    'jquery',
    'underscore',
    'backbone',
    'util',
    'views/viewNodes',
    'views/404'
], function ($, _, Backbone, util, ViewNodes, FourOhFour) {
    // Build router
    AppManagerRouter = Backbone.Router.extend({
        // Define Routes
        routes: {
            ''         : 'viewNodes',
            '*notFound': 'notFound'
        },

        /**
         * Load Nodes View
         *
         * @return void
         */
        viewNodes : function() {
            this.loadView(new ViewNodes({}));
        },

        /**
         * Page Not Found
         *
         * @return void
         */
        notFound : function() {
            this.loadView(new FourOhFour({}));
        },

        /**
         * Loads the requested view
         *
         * @param view
         *
         * @return void
         */
        loadView : function(view) {
            this.view && (this.view.close ? this.view.close() : this.view.remove());
            this.view = view;
        }
    });
    return AppManagerRouter;
});
