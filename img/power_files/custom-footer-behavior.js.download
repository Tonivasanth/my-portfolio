    jQuery('#affiliated').click(function (e) {
        jQuery(this).attr('checked');
        jQuery('.download_png_b').toggleClass('active');
        jQuery('.download_png_b').removeAttr('data-featherlight');
    });

    jQuery(document).ready(function() {
        jQuery(document).on('click', '#servicesbox a', function(e) {
            e.preventDefault();
            jQuery('#servicesbox').addClass('servicesbox-hide');
            jQuery('#ast-mobile-popup-2').addClass('active');
            jQuery('#ast-mobile-popup-2').addClass('show');
        });
        jQuery(document).on('click', '#menu-toggle-close-2, #ast-mobile-popup-overlay-2', function(e) {
            e.preventDefault();
            jQuery('#servicesbox').removeClass('servicesbox-hide');
            jQuery('#ast-mobile-popup-2').removeClass('active');
            jQuery('#ast-mobile-popup-2').removeClass('show');
        });
    });