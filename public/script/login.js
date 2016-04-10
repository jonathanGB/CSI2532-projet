$(function() {
  $('input:radio').change(function(){
    var choix = '#' + $(this).attr('id') + 'Form';

    $('.persoForm').hide();
    $(choix).slideDown();
  });
});
