define([
    'jquery',
    'underscore',
    'backbone',
    'models/member'
], function($, _, Backbone, memb) {
    Members = Backbone.Collection.extend({
        model: Member
    });
    return Members;
});
