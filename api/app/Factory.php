<?php
/**
 * Factory - file defines the Factory class and its related functionality
 * File : /api/app/Factory.php
 *
 * @category Tree
 * @package  Tree
 * @author   Jason Turpin <jasonaturpin@gmail.com>
 */

// Define namespace
namespace App;

// Include models
use \Illuminate\Database\Eloquent\Model;

/**
 * Factory Model - defines components for a factory node
 *
 * @category Tree
 * @package  Tree
 * @author   Jason Turpin <jasonaturpin@gmail.com>
 */
class Factory extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Factories';

    /**
     * The primary key used by the model.
     *
     * @var string
     */
    protected $primaryKey = 'factory_id';

    /**
     * Values you do not want to be exported
     *
     * @var array
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * Links A Factory to its Members
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function members() {
        return $this->hasMany('App\FactoryMember', 'factory_id', 'factory_id');
    }

    /**
     * Checks factory object for empty values
     *
     * @return bool
     */
    public function checkValues() {
        // Loop over object attribute
        foreach (array('lowerBound', 'upperBound', 'label') as $val) {
            // IF an empty value is found
            if (empty($this->{$val}) && strlen($this->{$val}) == 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Setter for the upper and lower boundaries
     *
     * @param int $upper Upper Bounds
     * @param int $lower Lower Bounds
     *
     * @return bool IF the boundaries were set successfully
     */
    public function setBoundary($upper, $lower) {
        // Build an array of boundaries
        $boundaries = array($upper, $lower);

        // Remove unwanted characters
        $unwantedChars = '/([,\s]|\..+)/';

        // Loop over boundaries
        foreach($boundaries as &$boundary) {
            $boundary = preg_replace($unwantedChars, '', $boundary);

            // Validate the integer
            if (!preg_match('/^(-?[1-9]\d*?|0)$/', $boundary, $dontCare)) {
                return false;
            }
        }

        // Sort array, in case values were passed in the wrong order
        asort($boundaries);

        // Set boundaries
        $this->lowerBound = $boundaries[0];
        $this->upperBound = $boundaries[1];
        return true;
    }
}
/*
+------------+------------------+------+-----+---------------------+-----------------------------+
| Field      | Type             | Null | Key | Default             | Extra                       |
+------------+------------------+------+-----+---------------------+-----------------------------+
| factory_id | int(10) unsigned | NO   | PRI | NULL                | auto_increment              |
| label      | varchar(255)     | NO   |     | NULL                |                             |
| upperBound | int(20)          | NO   |     | NULL                |                             |
| lowerBound | int(20)          | NO   |     | NULL                |                             |
| created_at | timestamp        | NO   |     | CURRENT_TIMESTAMP   | on update CURRENT_TIMESTAMP |
| updated_at | timestamp        | NO   |     | 0000-00-00 00:00:00 |                             |
+------------+------------------+------+-----+---------------------+-----------------------------+
*/
