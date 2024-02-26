<?php

if (function_exists('acf_add_local_field_group')) :

    acf_add_local_field_group(array(
        'key' => 'group_5fda648f609a4',
        'title' => 'Producto',
        'fields' => array(
            
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'product',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
    ));

    acf_add_local_field_group(array(
        'key' => 'group_5fda62b87cd66',
        'title' => 'Campañas',
        'fields' => array(
            array(
                'key' => 'field_5fda633b1d1bf',
                'label' => 'Fecha de Inicio',
                'name' => 'campaign_date_start',
                'type' => 'date_picker',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'display_format' => 'Y/m/d',
                'return_format' => 'Y/m/d',
                'first_day' => 1,
            ),
            array(
                'key' => 'field_5fda63711d1c0',
                'label' => 'Fecha de Fin',
                'name' => 'campaign_date_end',
                'type' => 'date_picker',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'display_format' => 'Y/m/d',
                'return_format' => 'Y/m/d',
                'first_day' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'taxonomy',
                    'operator' => '==',
                    'value' => 'campaign',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
    ));

endif;
