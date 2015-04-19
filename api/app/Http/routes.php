<?php
/**
 * Application routing
 */
Route::any('/api/fetchNodes', 'APIController@do_fetchNodes');
Route::any('/api/createFactory', 'APIController@do_createFactory');
Route::any('/api/regenerateFactory/{factory_id}', 'APIController@do_regenerateFactory')->where('factory_id', '\d+');
Route::any('/api/deleteFactory/{factory_id}', 'APIController@do_deleteFactory')->where('factory_id', '\d+');
