$(function() {
  $('#typeChoix :radio').change(function() {
    var choix = '#' + $(this).attr('id') + 'Form';

    $('.persoForm').hide();
    $(choix).slideDown();
  });

  $(':radio').change(function() {
    $(this).parent().toggleClass('btn-default btn-primary');
    $(this).parent().siblings().removeClass('btn-primary').addClass('btn-default');
  });

  $('form').submit(function(e) {
    e.preventDefault();
    var type = $('#typeChoix label.active input').attr('id');
    var credential = $(e.target[0]).val();

    if (!type || !credential)
      alert('Formulaire vide');
    else {
      $.post('/login', {'type': type, 'credential': credential}, function(data) {
        if (data === 'ok')
          window.location.replace('/');
        else {
          alert('Erreur');
        }
      });
    }
  });
});
