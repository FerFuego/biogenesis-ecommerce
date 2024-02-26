

<div class="c-navbar" id="navbar">
    <div class="c-navbar__container container-lg">
        <?php $navLogo = get_field('c-navbar__logo', 'option'); 
              $navLogoBlack = get_field('c-navbar__logo-black', 'option'); ?>

        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
            <?php if($navLogo) : ?>
                <img src="<?php echo $navLogo['url']; ?>" alt="<?php echo $navLogo['url']; ?>" class="c-navbar__logo">
            <?php endif;
            
            if($navLogoBlack) : ?>
                <img src="<?php echo $navLogoBlack['url']; ?>" alt="<?php echo $navLogoBlack['url']; ?>" class="c-navbar__logo c-navbar__logo--black">
            <?php endif; ?>
        </a>

        <nav id="site-navigation" class="c-navbar__menu">

            <div class="c-navbar__menu-desktop">
                <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => (is_user_logged_in()) ? 'private-menu' : 'public-menu',
                            'menu_id'        => (is_user_logged_in()) ? 'private-menu' : 'public-menu',
                            'container_class' => 'c-navbar__menu-container'
                        )
                    );
                ?>
            </div>
            
        </nav>

        <div class="c-navbar__menu-mobile">
            <?php
                wp_nav_menu(
                    array(
                        'theme_location' => (is_user_logged_in()) ? 'private-menu' : 'public-menu',
                        'menu_id'        => (is_user_logged_in()) ? 'private-menu' : 'public-menu',
                        'container_class' => 'c-navbar__menu-container'
                    )
                );
            ?>
        </div>

        <!-- Mini cart -->
        <?php get_template_part( 'template-parts/mini-cart' );?>

    </div>
    
</div>
