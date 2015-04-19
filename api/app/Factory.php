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
     * Links A Factory to its Members
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function members() {
        return $this->hasMany('App\FactoryMember', 'factory_id', 'factory_id');
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
