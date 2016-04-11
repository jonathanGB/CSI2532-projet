$(function() {
  $('.dateInput').datepicker({
    format: "yyyy-mm-dd",
    startDate: "today",
    language: "fr"
  });

  $('form').submit(function(e) {
    e.preventDefault();

    var formData = getFormData(e.target);
    console.log(formData);

    if (!formData)
      alert('Formulaire vide ou incomplet');
    else {
      formData.splice(3, 0, 'N/A'); // empty "objet", later filled by medecin
      console.log(formData);
      $.post('/createConsultation', {'data': formData}, function(data) {
        if (data === 'ok')
          window.location.replace('/');
        else {
          alert('Erreur');
        }
      });
    }
  });
});

function getFormData(target) {
  var results = [];

  for (var i = 0, n = 5; i < n; i++) {
    results.push($(target[i]).val());
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
