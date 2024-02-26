<?php

new BiogenesisBagoAlphaOmega();

/**
 * Setup activation and deactivation functions
 */
class BiogenesisBagoAlphaOmega{

	function __construct(){
		add_action( 'after_switch_theme', [ $this, '_activation' ] );
		add_action( 'switch_theme', [ $this, '_deactivation' ] );
	}

	function _activation(){
		do_action( 'biogenesis_bago/activate' );
	}

	function _deactivation(){
		do_action( 'biogenesis_bago/deactivate' );
	}

}
