<?php

// Remove Items Menu
function custom_my_account_menu_items( $items ) {
  unset($items['dashboard']);
  unset($items['downloads']);
  unset($items['edit-address']);

  return $items;
}
add_filter( 'woocommerce_account_menu_items', 'custom_my_account_menu_items' );