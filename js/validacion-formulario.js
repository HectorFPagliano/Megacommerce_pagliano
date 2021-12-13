$(document).ready(function() {
    $('.pagina-contacto-form').on('submit', function(e){
        $('#exampleModal').modal('show');
        e.preventDefault();
    });
  });