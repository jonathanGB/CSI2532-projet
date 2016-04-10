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

  $('.dateInput').datepicker({
    format: "dd/mm/yyyy",
    endDate: "today",
    language: "fr"
  });
});
