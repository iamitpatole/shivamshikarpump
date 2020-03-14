'use strict';

window['commonModule'] = (function($) {
  var _loadPage = function() {
    var pageId = $('body').attr('id');
    var pageModule = pageId + 'Module';
    window[pageModule].loadPage();
  };

  $(document).ready(function() {
    _loadPage();
  });
}(jQuery));
