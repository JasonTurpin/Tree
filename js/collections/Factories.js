define([
    'jquery',
    'underscore',
    'backbone',
    'models/factory'
], function($, _, Backbone, Factory) {
    Factories = Backbone.Collection.extend({
        model: Factory,

        // AJAX Request URL
        url: '/api/fetchNodes',

        /**
         * Parse the results
         *
         * @param {Array} responseArray Response Array
         *
         * @returns {Array}
         */
        parse: function(responseArray) {
            // Parsed array
            var resultArray = [];

            // IF the response is a non-empty array
            if (responseArray.length > 0) {
                // Loop over response
                $.each(responseArray, function(index, fact) {
                    // Builds a Factory object
                    var obj = new Factory(fact);

                    // Initialize the factory members
                    obj.initializeMembers();

                    // Push factory onto result
                    resultArray.push(obj);
                });
            }
            return resultArray;
        }
    });
    return Factories;
});
