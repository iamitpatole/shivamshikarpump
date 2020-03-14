'use strict';

window['loginModule'] = (function($) {

  var loadPage = function() {
    console.log('login page');
    console.log('login page again');
    
    $('#btnSubmit').click(function() {
      document.forms['loginForm'].submit();
    });
  };

  return {
    loadPage: loadPage
  };

}(jQuery));
