$(function() {
  $('button').click(function() {
    var choix = $(this).attr('id');

    if (choix === 'logoutYes') {
      $.ajax({
        url: '/logout',
        type: 'DELETE',
        'complete': function(result) {
          if (result.status === 200)
            window.location.replace('/login');
          else
            alert('Erreur');
        }
      });
    }
    else {
      window.location.replace('/');
    }
  });
})
