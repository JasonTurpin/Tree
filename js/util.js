define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/errors.html'
], function($, _, Backbone, Error) {
    return {
        /**
         * Trims the whitespace of the current field
         *
         * @param string str String being trimmed
         *
         * @return string
         */
        trimWhitespace: function(str) {
            return str.replace(/^\s+|\s+$/g, '');
        },

        /**
         * Add loading GIF
         *
         * @param string prefix Selector prefix
         *
         * @return void
         */
        addLoadingGIF: function(prefix) {
            // Disable buttons
            $('#' + prefix + 'Modal button').attr('disabled', 'disabled');

            // Show loading GIF
            $('#' + prefix + 'Modal .loadingGIF').removeClass('hoffa');
        },

        /**
         * Hide loading GIF
         *
         * @param string prefix Selector prefix
         *
         * @return void
         */
        hideLoadingGIF: function(prefix) {
            // Disable buttons
            $('#' + prefix + 'Modal button').removeAttr('disabled');

            // Show loading GIF
            $('#' + prefix + 'Modal .loadingGIF').addClass('hoffa');
        },

        /**
         * IF the integer is valid
         *
         * @param string value The value being tested
         *
         * @return bool
         */
        isValidInt: function(value) {
            // Regular expression for valid integers
            var regex = /^(-?[1-9]\d*?|0)$/;

            // IF the regular expression fails, the string is not a valid int
            if (value == '' || !regex.test(value)) {
                return false;
            }

            // IF the value goes over the max value limit, return false
            if (Math.abs(value) > 4294967296) {
                return false;
            }
            return true;
        },

        /**
         * Renders the errors template
         *
         * @param array Array of error messages
         *
         * @return void
         */
        renderError: function(errorMsgs, containingID) {
            $('#' + containingID).html(_.template(Error, {errorMsgs: errorMsgs}));
        }
    }
});
