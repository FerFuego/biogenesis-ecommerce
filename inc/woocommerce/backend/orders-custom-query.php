<?php 

/**
 * Handle a custom 'customvar' query var to get orders with the 'customvar' meta.
 * @param array $query - Args for WP_Query.
 * @param array $query_vars - Query vars from WC_Order_Query.
 * @return array modified $query
 */

function handle_custom_query_var_vet_vendor_id( $query, $query_vars ) {
	if ( ! empty( $query_vars['vet_vendedor_id'] ) ) {
		$query['meta_query'][] = array(
			'key' => 'vet_vendedor_id',
			'value' => esc_attr( $query_vars['vet_vendedor_id'] ),
		);
	}

	return $query;
}
add_filter( 'woocommerce_order_data_store_cpt_get_orders_query', 'handle_custom_query_var_vet_vendor_id', 10, 2 );

function handle_custom_query_vetmail( $query, $query_vars ) {
	if ( ! empty( $query_vars['billing_distributor_elecmail'] ) ) {
		$query['meta_query'][] = array(
			'key' => 'billing_distributor_elecmail',
			'value' => esc_attr( $query_vars['billing_distributor_elecmail'] ),
		);
	}

	return $query;
}
add_filter( 'woocommerce_order_data_store_cpt_get_orders_query', 'handle_custom_query_vetmail', 10, 2 );

function handle_custom_query_vetname( $query, $query_vars ) {
	if ( ! empty( $query_vars['billing_distributor'] ) ) {
		$query['meta_query'][] = array(
			'key' => 'billing_distributor',
			'value' => esc_attr( $query_vars['billing_distributor'] ),
		);
	}

	return $query;
}
add_filter( 'woocommerce_order_data_store_cpt_get_orders_query', 'handle_custom_query_vetname', 10, 2 );

?>