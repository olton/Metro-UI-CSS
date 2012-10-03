$(function(){
    $('.github-info').each(function(){
        var $container = $(this);
        var repo = $container.data('repo');

        $.ajax({
            url: 'https://api.github.com/repos/' + repo,
            dataType: 'jsonp',

            success: function(results){
                var repo = results.data;
                var watchers = repo.watchers;
                var forks = repo.forks;
                //console.log(watchers, forks);
                $(".github-watchers").html(watchers);
                $(".github-forks").html(forks);
            }
        })
    });
});