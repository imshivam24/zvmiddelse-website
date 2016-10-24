jQuery.fn.followFrom = function (pos) {
    var $this = this,
        $window = $(window);

    $window.scroll(function (e) {
        if ($window.scrollTop() < pos) {
            $this.css({
                position: 'absolute',
                top: pos
            });
        } else {
            $this.css({
                position: 'fixed',
                top: 0
            });
        }
    });
};

var setSponsorsSidebarTop = function () {
  jQuery('#sponsors-sidebar').css('top', jQuery('#header').height());
};

var waterpoloFoldOut = function () {
  var type = jQuery(this).prev('div').attr('id');
  var toggle_state = 'Toon meer' == jQuery(this).children('span').text();
  var button_caption = toggle_state ? 'Inklappen' : 'Toon meer';
  jQuery(this).children('span').text(button_caption);
  if (toggle_state) {
    // Fold out
    jQuery(this).children('.fa')
      .removeClass('fa-chevron-circle-down')
      .addClass('fa-chevron-circle-up');
    jQuery('#' + type + ' table').addClass('foldout');
  } else {
    // Fold in
    jQuery(this).children('.fa')
      .removeClass('fa-chevron-circle-up')
      .addClass('fa-chevron-circle-down');

    jQuery('#' + type + ' table').removeClass('foldout');
    jQuery('html, body').scrollTop(jQuery(this).offset().top - 100);
  }
  return false;
};

jQuery(document).ready(function () {

  setSponsorsSidebarTop();

  moment.locale('nl-NL');
  jQuery('.fromnow').each(function() {
    jQuery(this).text(moment(jQuery(this).data('timestamp'), 'X').fromNow());
  });

  jQuery('#facebook-posts li.loadmore a').click(function() {
    jQuery('#facebook-posts li').show();
    jQuery(this).parent('li').hide();
    return false;
  });

  jQuery('a.more-info-inline').click(function () {
    jQuery(this).parent('p').next('.more-info-panel').toggle();
    return false;
  });

  jQuery('.goto-next').each(function () {
    var anchor_next = jQuery(this).parents('section').next('section').attr('id');
    if (anchor_next) {
      jQuery(this).attr('href', '#' + anchor_next);
    }
  });

  jQuery('.readmore').click(function () {
    var more_info_panel;
    var toggle_state = 'Lees verder' == jQuery(this).children('span').text();
    var button_caption = toggle_state ? 'Inklappen' : 'Lees verder';
    jQuery(this).children('span').text(button_caption);
    if (toggle_state) {
      // Fold out
      more_info_panel = jQuery(this).next('.more-info-panel');
      jQuery(this).children('.fa')
        .removeClass('fa-chevron-circle-down')
        .addClass('fa-chevron-circle-up');

      jQuery(more_info_panel).detach().insertBefore(this);
      jQuery(more_info_panel).toggle();
    } else {
      // Fold in
      more_info_panel = jQuery(this).prev('.more-info-panel');
      jQuery(this).children('.fa')
        .removeClass('fa-chevron-circle-up')
        .addClass('fa-chevron-circle-down');

      jQuery(more_info_panel).detach().insertAfter(this);
      jQuery(more_info_panel).toggle();

      jQuery('html, body').scrollTop(jQuery(this).offset().top - 100);
    }
    return false;
  });

  jQuery('#waterpolo-programma').load(
    'http://localhost/php/getresults.php?handle=programma'
  ).next('.showmore').click(waterpoloFoldOut);

  jQuery('#waterpolo-uitslagen').load(
    'http://localhost/php/getresults.php?handle=uitslagen'
  ).next('.showmore').click(waterpoloFoldOut);

}); // document ready

jQuery(window).resize(setSponsorsSidebarTop);
