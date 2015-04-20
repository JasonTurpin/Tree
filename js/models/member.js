define([
    'jquery',
    'underscore',
    'backbone',
    'util'
], function($, _, Backbone, util){
    Member = Backbone.Model.extend({
        /**
         * Sets default values to factory member object
         */
        defaults: {
            member_id : null,
            factory_id: null,
            value     : null
        }
    });
    return Member;
});
