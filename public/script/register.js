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
    format: "yyyy-mm-dd",
    endDate: "today",
    language: "fr"
  });

  $('form').submit(function(e) {
    e.preventDefault();
    var type = $('#typeChoix label.active input').attr('id');

    var formData = getFormData(type, e.target);
    console.log(formData);

    if (!formData)
      alert('Formulaire vide ou incomplet');
    else {
      $.post('/register', {'type': type, 'credential': formData}, function(data) {
        if (data === 'ok')
          window.location.replace('/');
        else {
          alert('Erreur');
        }
      });
    }
  });
});

function getFormData(type, target) {
  var results = [];

  if (type === 'secretaire') {
    results.push(
      $(target[0]).val(),
      $(target[3]).val(),
      $(target[2]).val(),
      $(target[1]).val()
    );
  } else if (type === 'medecin') {
    results.push(
      $(target[0]).val(),
      $(target[1]).val(),
      $(target[3]).val(),
      $(target[2]).val(),
      $(target[4]).val(),
      $(target[6]).val(),
      $(target[5]).val()
    );
  } else if (type === 'patient') {
    var gender;

    if ($(target[7]).parent().hasClass('active'))
      gender = 'M';
    else if ($(target[8]).parent().hasClass('active'))
      gender = 'F';

    results.push(
      $(target[0]).val(),
      $(target[6]).val(),
      $(target[1]).val(),
      $(target[3]).val(),
      $(target[2]).val(),
      $(target[5]).val(),
      gender,
      $(target[4]).val()
    );
  }

  return validateData(results);
}

function validateData(arr) {
  if (arr.length === 0) return false;

  for (var i = 0, n = arr.length; i < n; i++) {
    if (!arr[i]) return false;
  }

  return arr;
}
