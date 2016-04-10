$(function() {
  $('button').click(function() {
    var choix = $(this).attr('id');

    if (choix === 'logoutYes')
      ;// DELETE /destroySession
    else {
      window.location.replace('/');
    }
  });
})
