$(function () {
    var submitBtn = $('#submit');
    var platfromDropDownBtn = $('#platform a');
    var epicNickName = $('#epicNickName');
    var results = $('#results');

    // default values
    var dropDownValue = 'pc';

    submitBtn.click(function () {
        var data = {};
        data.epicNickName = epicNickName.val().toLowerCase();
        data.dropDownValue = dropDownValue.toLowerCase();
        $.ajax({
            type: "POST",
            url: '/',
            dataType: 'json',
            data: data,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                displayData(data);
            }
        });
        resetResult();
    });

    platfromDropDownBtn.click(function () {
        dropDownValue = $(this).text();
    });

    function resetResult() {
        results.html('');
        epicNickName.val('');
    }

    function displayData(data) {
        var epicUserHandle = data.epicUserHandle;
        if(data.error) {
           
        } else if (data.stats && (data.stats.p10 || data.stats.p9)) {
            var list = '<ul class="list-group">' +
            '<li class="list-group-item">' + 'Solo Wins: ' + data.stats.p2.top1.value + '</li>' +
            '<li class="list-group-item">' + 'Duos Wins: ' + data.stats.p10.top1.value + '</li>' +
            '<li class="list-group-item">' + 'Teams Wins: ' + data.stats.p9.top1.value + '</li>' +
            '<li class="list-group-item">' + 'Matches Played: ' + data.lifeTimeStats[7].value + '</li>' +
            '<li class="list-group-item">' + 'Kills: ' + data.lifeTimeStats[10].value + '</li>' +
            '<li class="list-group-item">' + 'K/D: ' + data.lifeTimeStats[11].value + '</li>' +
            '</ul>';
        }
        else {
            var list = '<ul class="list-group">' +
            '<li class="list-group-item">' + 'Solo: ' + data.stats.p2.top1.value + '</li>' +
            '<li class="list-group-item">' + 'K/D: ' + data.stats.p2.kd.value + '</li>' +
            '<li class="list-group-item">' + 'Kills: ' + data.stats.p2.kills.value + '</li>' +
            '</ul>'; 
        }

        if(epicUserHandle) {
            var template = '<div class="card text-center">' +
            '<h5 class="card-header">' + epicUserHandle + '</h5>' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + 'Stats' + '</h5>' +
            '<p class="card-text">' + list + '</p>' +
            '</div>' +
            '</div>';
        } else {
            var template = '<div class="card text-center">' +
            '<h5 class="card-header">' + "Player Not Found" + '</h5>' +
            '</div>';
        }
      
        results.html(template);
    }


});