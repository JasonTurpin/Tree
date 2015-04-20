define([
    'jquery',
    'underscore',
    'backbone',
    'util',
    'collections/Members'
], function($, _, Backbone, util, members){
    Factory = Backbone.Model.extend({
        // Defined ID attribute
        idAttribute: 'factory_id',

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
         * Sets the count
         *
         * @return void
         */
        setCount: function(count) {
            this.attributes.count.set('count');
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
