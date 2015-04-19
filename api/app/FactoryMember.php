<?php
/**
 * Factory Member - defines the FactoryMember class and its related functionality
 * File : /api/app/FactoryMember.php
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
 * Factory Member Model - defines components for a factory member node
 *
 * @category Tree
 * @package  Tree
 * @author   Jason Turpin <jasonaturpin@gmail.com>
 */
class FactoryMember extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'FactoryMembers';

    /**
     * The primary key used by the model.
     *
     * @var string
     */
    protected $primaryKey = 'member_id';
}
/*
+------------+------------------+------+-----+---------------------+-----------------------------+
| Field      | Type             | Null | Key | Default             | Extra                       |
+------------+------------------+------+-----+---------------------+-----------------------------+
| member_id  | int(10) unsigned | NO   | PRI | NULL                | auto_increment              |
| factory_id | int(10) unsigned | YES  |     | NULL                |                             |
| value      | int(20)          | NO   |     | NULL                |                             |
| created_at | timestamp        | NO   |     | CURRENT_TIMESTAMP   | on update CURRENT_TIMESTAMP |
| updated_at | timestamp        | NO   |     | 0000-00-00 00:00:00 |                             |
+------------+------------------+------+-----+---------------------+-----------------------------+
*/
