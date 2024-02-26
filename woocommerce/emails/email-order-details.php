<?php
/**
 * Order details table shown in emails.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-order-details.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;

$text_align = is_rtl() ? 'right' : 'left';

do_action( 'woocommerce_email_before_order_table', $order, $sent_to_admin, $plain_text, $email ); ?>

<h2>
	<?php
	if ( $sent_to_admin ) {
		$before = '<a class="link" href="' . esc_url( $order->get_edit_order_url() ) . '">';
		$after  = '</a>';
	} else {
		$before = '';
		$after  = '';
	}
	/* translators: %s: Order ID. */
	echo wp_kses_post( $before . sprintf( __( 'Solicitud #%s -', 'woocommerce' ) . $after . ' <time datetime="%s">%s</time>', $order->get_order_number(), $order->get_date_created()->format( 'c' ), wc_format_datetime( $order->get_date_created() ) ) );
	?>
</h2>

<div style="margin-bottom: 40px;">
	<table class="td" cellspacing="0" cellpadding="6" style="width: 100%; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;" border="1">
		<thead>
			<tr>
				<th class="td" scope="col" style="text-align:<?php echo esc_attr( $text_align ); ?>;"><?php esc_html_e( 'Product', 'woocommerce' ); ?></th>
				<th class="td" scope="col" style="text-align:<?php echo esc_attr( $text_align ); ?>;"><?php esc_html_e( 'Quantity', 'woocommerce' ); ?></th>
				<th class="td" scope="col" style="text-align:<?php echo esc_attr( $text_align ); ?>;"><?php esc_html_e( 'Precio de Referencia(*)', 'woocommerce' ); ?></th>
			</tr>
		</thead>
		<tbody>
			<?php
				$items = $order->get_items(); 
				foreach ($items as $item_id => $item ) {
					$product = $item->get_product();
					$itemName = $item->get_name();
					$variation_id = $item->get_variation_id();
					$variation    = new WC_Product_Variation( $variation_id );
					$variationName   = implode(" / ", $variation->get_variation_attributes());
					$productVariationPrice = (float) $product->get_price();
					$parentProductId = $product->get_parent_id();
					$suggestedPrice = get_field('suggested_price', $parentProductId);
					$qty = (int) $item->get_quantity();
					$productParent =  wc_get_product( $parentProductId );
					$productParentPrice = $productParent->get_price();
					$maxDiscount = get_field('max_discount', $parentProductId);
					$quantitySold = $productParent->get_total_sales();
					$accesToDiscount = get_field('discount_access_units', $parentProductId);
					$absoluteDiscount = $quantitySold * 100 / $accesToDiscount;
					if ($absoluteDiscount > 100) {
						$absoluteDiscount = 100;
					}
					$relativeDiscount = $absoluteDiscount * $maxDiscount / 100;
					$relativeDiscount = intval($relativeDiscount) + 5;
					if ($relativeDiscount > $maxDiscount) $relativeDiscount = $maxDiscount;
					$itemPriceWithDiscount = $productVariationPrice * $qty - ($productVariationPrice * $relativeDiscount / 100) * $qty;
					if ($suggestedPrice && ($order->get_status() == 'processing' || $order->get_status() == 'completed')) {
						$item->set_total( $productVariationPrice * $qty - ($productVariationPrice * $relativeDiscount / 100) * $qty );
						$item->save(); 
					}
					echo '<tr>';
					echo '<td style="border: none;"><span style="font-weight: bold; display: block;">' . $itemName . '</span><span style="display: block;">' . $variationName . '</span>';
					if ($order->get_status() == 'processing' || $order->get_status() == 'completed') {
						echo '<span style="font-size: 12px;">Descuento alcanzado: ' . $relativeDiscount . '%</span>';
					}
					echo '</td>';
					echo '<td style="border: none;"><span>' . $qty . '</span></td>';
					if ($suggestedPrice && ($order->get_status() == 'processing' || $order->get_status() == 'completed')) {
						echo '<td style="border: none;"><span style="text-decoration: line-through; font-size: 12px; display: block;">$ ' . $productVariationPrice * $qty . '</span> - <span>$ ' . $itemPriceWithDiscount . '</span></td>';
					} else if ($suggestedPrice) {
						echo '<td style="border: none;"><span style="font-size: 12px; display: block;">$ ' . $productVariationPrice * $qty . '</span></td>';
					} else {
						echo '<td style="border: none;">-</td>';
					}
					echo '</tr>';
				}
				$order->calculate_totals(); 
			?>
		</tbody>
		<tfoot>
			<?php
			if (!($order->get_status() == 'canceled' || $order->get_status() == 'refunded')) {
				$item_totals = $order->get_order_item_totals();

				if ( $item_totals ) {
					$i = 0;
					foreach ( $item_totals as $total ) {
						$i++;
						?>
						<tr>
							<th class="td" scope="row" colspan="2" style="text-align:<?php echo esc_attr( $text_align ); ?>; <?php echo ( 1 === $i ) ? 'border-top-width: 4px;' : ''; ?>"><?php echo wp_kses_post( $total['label'] ); ?></th>
							<td class="td" style="text-align:<?php echo esc_attr( $text_align ); ?>; <?php echo ( 1 === $i ) ? 'border-top-width: 4px;' : ''; ?>"><?php echo wp_kses_post( $total['value'] ); ?></td>
						</tr>
						<?php
					}
				}
			}
			?>
		</tfoot>
	</table>
	<p style="font-size: 12px; font-style: italic;">(*)Todos los precios no incluyen Impuestos.</p>
</div>

<?php do_action( 'woocommerce_email_after_order_table', $order, $sent_to_admin, $plain_text, $email ); ?>
