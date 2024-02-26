<section class="btn-container">
    <div class="btn-container__container container-lg">
        <?php $btn = get_sub_field('section_btn'); ?>
        <?php if ($btn) : ?>
            <a href='<?php echo $btn['url']; ?>' target='<?php echo $btn['target']; ?>' class="button button--outline js-fade-in-up"><?php echo $btn['title']; ?></a>
        <?php endif; ?>
    </div>
</section>