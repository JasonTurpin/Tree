define([
    'jquery',
    'underscore',
    'backbone',
    'util',
    'collections/Members'
], function($, _, Backbone, util, members){
    Factory = Backbone.Model.extend({
        // AJAX Request URL
        url: '',

        /**
         * Sets default values to factory object
         */
        defaults: {
            factory_id: null,
            label     : null,
            upperBound: null,
            lowerBound: null,
            members   : []
        },

        /**
         * Initialize Members collection
         *
         * @return void
         */
        initializeMembers: function() {
            this.attributes.members = new Members(this.attributes.members);
        }
    });
    return Factory;
});
