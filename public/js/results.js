$(function(){
  $('#form-train').on('submit', function(event) {
        event.preventDefault();
        var createInput = $('#trainno');
        if(createInput.val()=='')
        return;
        var train = $('h3');
        $('button').html('Searching ...');

        $.ajax({
            url: '/',
            method: 'POST',
            contentType: 'application/json' ,
            data: JSON.stringify({ trainno: createInput.val() }),
            success: function(response) {
                var tbodyEl = $('table');
                tbodyEl.html('');
                response.data.forEach(function(data) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + data.station + '</td>\
                            <td>' + data.arrival + '</td>\
                            <td>' + data.departure + '</td>\
                        </tr>\
                  ');
                });
                createInput.val('');
                $('button').html('Search');
                $('h3').css({"background-color" : "yellow"})
                console.log(response.name);
                train.html(response.name);
            }
        });
    });
});
