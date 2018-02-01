$(document).ready(function () {

  console.log( "ready!" );
  $('body').fadeIn(600);
});

function changePage(page){
    $('body').fadeOut(600, function(){
        location.href = '/pages?=' + page;
    });
}

// use url parameter to find what to show
