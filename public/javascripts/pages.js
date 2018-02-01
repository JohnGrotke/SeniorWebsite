$(document).ready(function () {
    findShow();

    })
});


function findShow(){
    curl = window.location.href;
    page = curl.split('=')[1];
    switch (page){
        case 'resume':
            showResume();
            break;
        case 'projects':
            showProjects();
            break;
        case 'fun':
            showFun();
            break;
        default:
            showProject();
            break;
    }
}

function goCover(){
    $('body').fadeOut(400, function(){
        location.href = '/';
    });
}

function fadeShow(newPage){
    if ($('.current').length == 0){
        $('.navbar').fadeIn(600);
        $(newPage).fadeIn(600, function(){
            $(newPage).addClass('current');
        });
        return;
    }
    $('.current').fadeOut(400, function(){
        $('.current').removeClass('current');
        $(newPage).fadeIn(600, function(){
            $(newPage).addClass('current');
        });
    });
}


function showResume(){
    $('.nav-item').removeClass('active');
    $('#ResumeLink').addClass('active');
    fadeShow('#resume')

}

function showProjects(){
    $('.nav-item').removeClass('active');
    $('#ProjectsLink').addClass('active');
    fadeShow('#projects')
}

function showFun(){
    $('.nav-item').removeClass('active');
    $('#FunLink').addClass('active');
    fadeShow('#fun')
}
