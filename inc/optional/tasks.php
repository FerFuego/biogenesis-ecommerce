<?php

new BiogenesisBagoTasks();

/**
 * This class is here for illustrative purposes in case you need to run a periodic process
 * Or a manual one via link
 */
class BiogenesisBagoTasks{

	function __construct(){
		$this->_setup_scheduled_tasks();
		add_action( 'admin_init', array( $this, '_manual_tasks' ) );
	}

	/**
	 * Example to setup scheduled process using wp "cron"
	 */
	function _setup_scheduled_tasks(){

		$tasks = apply_filters( 'biogenesis_bago/tasks', [
			'some-process' => 'twicedaily',
		]);

		foreach( $tasks as $task => $schedule ){
			$next_run = wp_next_scheduled( "biogenesis_bago/{$task}" );
			if( false === $next_run ){
				wp_schedule_event( time(), $schedule, "biogenesis_bago/{$task}" );
			}
		}

	}

	/**
	 * Setup a way to manually run a process
	 */
	function _manual_tasks(){
		if( !isset( $_GET['biogenesis_bago-action'] ) ){
			return;
		}

		do_action( 'biogenesis_bago/' . $_GET['biogenesis_bago-action'] );
		wp_redirect( add_query_arg( 'biogenesis_bago-action', false ) );
		exit;
	}
}
