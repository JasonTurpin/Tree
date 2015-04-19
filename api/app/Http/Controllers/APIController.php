<?php
/**
 * API Controller - Handler for all incoming AJAX requests
 * File : /api/app/Http/Controllers/APIController.php
 *
 * @category Tree
 * @package  Tree
 * @author   Jason Turpin <jasonaturpin@gmail.com>
 */

// Define namespace
namespace App\Http\Controllers;

// Include models
use \Illuminate\Support\Facades\Request;
use \Illuminate\Support\Facades\Cache;
use \App\Factory;
use \App\FactoryMember;

/**
 * APIController - Handles AJAX requests
 *
 * @category Tree
 * @package  Tree
 * @author   Jason Turpin <jasonaturpin@gmail.com>
 */
class APIController extends Controller {
    /**
     * Fetch all nodes for the page
     *
     * @return Response
     */
    public function do_fetchNodes() {
        return Cache::rememberForever('fetchNodes', function() {
            /**
             * Factory Nodes, ordered by factory_id ASC
             *
             * @var \Illuminate\Database\Eloquent\Collection
             */
            $Factories = Factory::orderBy('factory_id')->get();

            // Load factory members
            $Factories->load('members');

            // Output JSON
            return $Factories;
        });
    }

    /**
     * Creates a new factory
     *
     * @return Response
     */
    public function do_createFactory() {
        /**
         * @var Factory - Factory object being built
         */
        $factory = new Factory();

        // IF invalid values were detected
        if (!$this->_setFactory($factory)) {
            return array('errorMsgs' => array('Invalid values detected.'));
        }

        // Clear cache
        Cache::forget('fetchNodes');

        // Output JSON
        return $factory;
    }

    /**
     * Set the values of a factory
     *
     * @param Factory Factory being saved
     *
     * @return bool
     */
    protected function _setFactory($factory) {
        $factory->label = trim(Request::input('label'));
        $factory->setBoundary(Request::input('lowerBound'), Request::input('upperBound'));

        // IF invalid values were detected
        if (!$factory->checkValues()) {
            return false;
        }
        return $factory->save();
    }

    /**
     * Regenerates a factory and updates its children
     *
     * @param int $factory_id Factory ID
     *
     * @return Response
     */
    public function do_regenerateFactory($factory_id) {
        /**
         * @var Factory - Factory being updated
         */
        $factory = Factory::find($factory_id);

        // Total number of new members to be generated
        $memberCount = Request::input('count');

        // IF a bad value was passed
        if (empty($factory) || !is_numeric($memberCount) || $memberCount > config('app.memberLimit')) {
            return array('errorMsgs' => array('Invalid values detected.'));
        }

        // IF invalid values were detected
        if (!$this->_setFactory($factory)) {
            return array('errorMsgs' => array('Invalid values detected.'));
        }

        // Deletes members
        $factory->members()->delete();

        // Build new records
        for ($count = 0; $count < $memberCount; $count++) {
            $member             = new FactoryMember();
            $member->factory_id = $factory->factory_id;
            $member->value      = mt_rand($factory->lowerBound, $factory->upperBound);
            $member->save();
        }

        // Clear cache
        Cache::forget('fetchNodes');

        return array('result' => true);
    }

    /**
     * Deletes a factory and its children
     *
     * @param int $factory_id Factory ID
     *
     * @return Response
     */
    public function do_deleteFactory($factory_id) {
        /**
         * @var Factory - Factory being updated
         */
        $factory = Factory::find($factory_id);

        // IF the factory ID was bad
        if (empty($factory)) {
            return array('errorMsgs' => array('Invalid values detected.'));
        }

        // Delete the factory and its members
        $factory->members()->delete();
        $factory->delete();

        // Clear cache
        Cache::forget('fetchNodes');

        return array ('result' => true);
    }
}
