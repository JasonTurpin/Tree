define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'util',
    'models/factory',
    'collections/Factories',
    'text!templates/viewNodes.html'
], function($, _, Backbone, Bootstrap, util, Fact, Factories, ViewNodes) {
    var AppManagerViewsAddon = Backbone.View.extend({
        /**
         * @var Factory - Current factory
         */
        fact: null,

        /**
         * @var Factories - Collection of Factories
         */
        Factories: [],

        /**
         * Initialize the view
         *
         * @param {Array} options Options array
         *
         * @return void
         */
        initialize: function(options) {
            // Set context
            that = this;

            // Body Selector
            var body = $('body');

            // Displays the factory modal
            $(body).on('click', '#newFactory', function() {
                // Clear existing values
                $('input.newFactory').val('');

                // Show new factory modal
                $('#newFactoryModal').modal('show');
            });

            // When the user exist out of a factory field, trim the whitespace
            $(body).on('blur', '.factoryName', that._processFactoryName);

            // Process the factory field
            $(body).on('blur', '.intField', that._processIntField);

            // Remove error class on keydown
            $(body).on('keydown', '.has-error input', function() {
                $(this).closest('.form-group').removeClass('has-error');
            });

            // When the user wants to submit a new factory
            $(body).on('click', '.saveFactory', that._processFactory);

            // IF the user right clicked on the factory container
            $(body).on('mousedown', '.factoryParent', function(event) {
                if (event.which == 3) {
                    that._showExistingFactory($(this).attr('data-id'));
                }
            });

            // Deletes a factory
            $(body).on('click', '#editExistingFactory', that._processFactory);

            // Show new factory Button
            $('#newFactory').removeClass('hoffa');

            // Initialize The Factories
            that.Factories = new Factories();

            // Fetch the Factories
            that.Factories.fetch({
                // Successfully fetched factories and its related members, render the template
                success: function (data) {
                    that.render();
                },

                // IF an error occurred
                error: function() {
                    util.renderError(['An error occurred'], 'dashboardErrors');
                }
            });
        },

        /**
         * Show an existing factory
         *
         * @param {int} factory_id Factory ID
         *
         * @return void
         */
        _showExistingFactory: function(factory_id) {
            // Set the current factory being processed
            that.fact = that.Factories.get(factory_id);

            // Modal selector
            var modalSel = $('#existingFactoryModal');

            // Set values
            $('#existingFactoryModal .modal-title').html('Edit' + that.fact.get('label'));
            $('[name="existingFactoryName"]').val(that.fact.get('label'));
            $('[name="existingFactoryLower"]').val(that.fact.get('lowerBound'));
            $('[name="existingFactoryUpper"]').val(that.fact.get('upperBound'));
            $('[name="existingFactoryCount"]').val(that.fact.get('members').length);

            // Show Modal
            $(modalSel).modal('show');

            // Deletes a factory
            $('#existingFactoryModal .btn-danger').on('click', function() {
                // Show loading GIF
                util.addLoadingGIF('existingFactory');

                // Set the delete URL
                that.fact.url = '/api/deleteFactory/' + that.fact.get('factory_id');

                // Fetch the Factories
                that.fact.destroy({
                    // Successfully fetched factories and its related members, render the template
                    success: function (model, response) {
                        // Hide loading GIF
                        util.hideLoadingGIF('existingFactory');

                        // Hide Modal
                        $(modalSel).modal('hide');
                    },

                    // IF an error occurred
                    error: function() {
                        // Hide loading GIF
                        util.hideLoadingGIF('existingFactory');

                        // Hide Modal
                        $(modalSel).modal('hide');

                        // Display error message
                        util.renderError(['An error occurred.'], 'existingFactoryErrors');
                    }
                });
            });
        },

        /**
         * Processes the current factory
         *
         * @return void
         */
        _processFactory: function() {
            // Error messages to display to user
            var errorMsgs = [];

            // IF the factory is new
            if ($(this).hasClass('newFactory')) {
                var prefix = 'newFactory';

            // Existing factory
            } else {
                var prefix = 'existingFactory';
            }

            // Clear existing errors
            $('#' + prefix + 'Errors').html('');

            // Loop over each field and ensure it is not empty (deeper validation is done after on blur events)
            $('.' + prefix).each(function() {
                if ($(this).val() == '') {
                    $(this).closest('.form-group').addClass('has-error');
                }
            });

            // Factory Selectors
            var nameSelector  = $('[name="' + prefix + 'Name"]');
            var lowerSelector = $('[name="' + prefix + 'Lower"]');
            var upperSelector = $('[name="' + prefix + 'Upper"]');

            // Check form fields for errors
            if ($(nameSelector).closest('.form-group').hasClass('has-error')) {
                errorMsgs.push('The factory name cannot be empty.');
            }
            if ($(lowerSelector).closest('.form-group').hasClass('has-error')) {
                errorMsgs.push('The lower bound value is not a valid integer.');
            }
            if ($(upperSelector).closest('.form-group').hasClass('has-error')) {
                errorMsgs.push('The upper bound value is not a valid integer.');
            }

            // IF at least one error exists, to not proceed
            if (errorMsgs.length > 0) {
                util.renderError(errorMsgs, prefix + 'Errors');
                return;
            }

            // IF the factory is new
            if (prefix == 'newFactory') {
                // Build new factory
                that.fact = new Factory({
                    label     : $(nameSelector).val(),
                    lowerBound: $(lowerSelector).val(),
                    upperBound: $(upperSelector).val()
                });

                // Insert the factory
                that._insertFactory();

            // Existing factory
            } else {
                // Set Factory Variables
                that.fact.set({
                    label     : $(nameSelector).val(),
                    lowerBound: $(lowerSelector).val(),
                    upperBound: $(upperSelector).val(),
                    count     : $('[name="existingFactoryCount"]').val()
                });
                that._updateFactory();
            }
        },

        /**
         * Attempts to update a new factory
         *
         * @return void
         */
        _updateFactory: function() {
            // Show loading GIF
            util.addLoadingGIF('existingFactory');

            // Set the delete URL
            that.fact.url = '/api/regenerateFactory/' + that.fact.get('factory_id');

            // Fetch the Factories
            that.fact.save(that.fact.attributes, {
                // Successfully fetched factories and its related members, render the template
                success: function (model, response) {
                    // Hide loading GIF
                    util.hideLoadingGIF('existingFactory');

                    // Hide Modal
                    $('#existingFactoryModal').modal('hide');
                },

                // IF an error occurred
                error: function() {
                    // Hide loading GIF
                    util.hideLoadingGIF('existingFactory');

                    // Hide Modal
                    $('#existingFactoryModal').modal('hide');

                    // Display error message
                    util.renderError(['An error occurred.'], 'existingFactoryErrors');
                }
            });
        },

        /**
         * Attempts to create a new factory
         *
         * @return void
         */
        _insertFactory: function() {
            // Show loading GIF
            util.addLoadingGIF('newFactory');

            // Resets the URL root
            that.fact.url = '/api/createFactory';

            // Run save()
            that.fact.save(that.fact.attributes, {
                // Insert was successful
                success: function (model, response) {
                    // Hide loading GIF
                    util.hideLoadingGIF('newFactory');

                    // An error occurred, display messages
                    if ('errorMsgs' in response) {
                        util.renderError(response.errorMsgs, 'newFactoryErrors');

                    } else {
                        $('#newFactoryModal').modal('hide');

                        // @todo append new item
                    }
                },

                // IF an error occurred
                error: function() {
                    // Hide loading GIF
                    util.hideLoadingGIF('newFactory');

                    // Render an error message
                    util.renderError(['An error occurred.  Please try again.'], 'newFactoryErrors');
                }
            });
        },

        /**
         * Processes The Factory Name
         *
         * @return void
         */
        _processFactoryName: function() {
            // Clean the string
            var cleanStr = util.trimWhitespace($(this).val());

            // Replace with clean string
            $(this).val(cleanStr);

            // IF the string is empty add error
            if (cleanStr == '') {
                $(this).closest('.form-group').addClass('has-error');
            }
        },

        /**
         * Processes the values for an integer field
         *
         * @return void
         */
        _processIntField: function() {
            // Fetch value
            var value = $(this).val();

            // Trim Whitespace
            value = util.trimWhitespace(value);

            // Remove all commas, and converts decimals to
            value = value.replace(/([^\d-])/g, '');

            // Reset value
            $(this).val(value);

            // IF the integer is not valid, add error class
            if (!util.isValidInt(value)) {
                $(this).closest('.form-group').addClass('has-error');
                return;
            }

            // IF the factory is new
            if ($(this).hasClass('newFactory')) {
                var prefix = 'newFactory';

            // Existing factory
            } else {
                var prefix = 'existingFactory';
            }

            // Create selectors
            var lowerSel = $('[name="' + prefix + 'Lower"]');
            var upperSel = $('[name="' + prefix + 'Upper"]');

            // Fetch values
            var lower = $(lowerSel).val();
            var upper = $(upperSel).val();

            // IF the lower value is greater than the upper, switch them
            if (util.isValidInt(lower) && util.isValidInt(upper)
                && upper < lower
            ) {
                $(lowerSel).val(upper);
                $(upperSel).val(lower);
            }
        },

        /**
         * Renders the HTML
         *
         * @return void
         */
        render: function() {
            $('#factoryTree').html(_.template(ViewNodes, {NodeFactories: that.Factories.models}));
        }
    });
    return AppManagerViewsAddon;
});
