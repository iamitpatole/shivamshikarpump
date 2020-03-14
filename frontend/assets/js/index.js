'use strict';

window['indexModule'] = (function($) {
  var pageId = $('body').attr('id');
  var loadPage = function() {

    console.log(pageId + 'index page');
  };

  return {
    loadPage: loadPage
  };

}(jQuery));
