$(function() {
  $('#modifyObjet').on('show.bs.modal', function(e) {
    var currObj = $(e.relatedTarget).parent().text().trim();
    storeData($(e.relatedTarget).parent().parent());

    $('#modifyObjet textarea').val(currObj);
  });

  $('form.customForm').submit(function(e) {
    e.preventDefault();
    var currObj = $('#modifyObjet textarea').val().trim();

    if (!currObj)
      alert('formulaire vide!');
    else {
      var updateData = [ssnForm, dateForm, heureDebutForm, currObj];
      console.log(updateData);
      $.post('/modifyObjet', {data: updateData}, function(data) {
        if (data === 'ok')
          window.location.reload();
        else {
          alert('Erreur');
        }
      });
    }
  });
});

function storeData(target) {
  ssnForm = $(target).children('td:eq(2)').text().trim();
  dateForm = $(target).children('td:eq(4)').text().trim();
  heureDebutForm = $(target).children('td:eq(5)').text().trim();
}
