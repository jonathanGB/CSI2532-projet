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

  $('tr.hover').click(function() {
    storeData(this);

    var updateData = [ssnForm, dateForm, heureDebutForm];
    $.post('/consultationPrescription', {data: updateData}, function(data) {
      if (data === 'error')
        alert('Erreur');
      else {
        $('#consultationPrescription table tbody').html('');
        console.log(data);// open new modal
        Object.keys(data).forEach(function(exam, ind) {
          data[exam].forEach(function(obj) {
            var row = "<tr>";
            Object.keys(obj).forEach(function(val) {
              row += "<td>" + val + "</td>";
            });
            row += "</tr>";
            $('#consultationPrescription table:eq('+ind+') tbody').append(row);
          });
        });
        $('#consultationPrescription').modal('show');
      }
    });
  });
});

function storeData(target) {
  ssnForm = $(target).children('td:eq(2)').text().trim();
  dateForm = $(target).children('td:eq(4)').text().trim();
  heureDebutForm = $(target).children('td:eq(5)').text().trim();
}
