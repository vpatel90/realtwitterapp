// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require materialize-sprockets


var ready;
var refreshThoughts;
ready = function() {
    $("#thought_submit").prop("disabled", true);
    clearInterval(refreshThoughts);
    var getHTML = function(thought) {
        return '<div class="thought-card col s12 m12 l12">' +
        '<div class="row thought-header">' +
          '<div class="col s6 m4 l4">' +
            '<p>' +
            '<a href="/users/' +
            thought.user_id +
            '">' + '@' + thought.user_handle +
            '</a>' +
            '</p>' +
          '</div>' +
          '<div class="right">' +
            '<p> <small>' + thought.time + '</small></p>' +
          '</div>' +
        '</div>' +
        '<a href="/thoughts/' +
        thought.id +
        '">' +
        '<div class="row">' +
          '<div class="col s12 m12 l12">' +
            '<p>' + thought.body + '</p>' +
          '</div>' +
        '</div>' +
        '</a>' +
      '</div>';
    };

    var getTopUserHTML = function(user) {
        return '<div class="thought-card col s12 m12 l12">' +
          '<div class="row thought-header">' +
            '<div class="col s2 m2 l2">'+
            '<div class="pic-border">' +
            '<img class="responsive-img circle profile-pic" src="' +
            user.pic + '">'+

            '</div>'+

            '</div>'+
            '<div class="col s7 m7 l7">'+
            '<p>' +
            '<a href="/users/' +
            user.id +
            '">' + '@' + user.handle +
            '</a>' +
            '</p>' +
            '</div>'+
            '<div class="col s3 m3 l3">' +
              '<p class="chattr-logo"> <i class="fa fa-comment" aria-hidden="true"></i>' + user.thoughts_count + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
    };

    var url = document.URL;
    var jsonThoughts = function () {

      $.getJSON(url, function(response){
            $("#thoughts-container").html("<h3> Now </h3>");
            response["thoughts"].forEach(function(thought) {
                $("#thoughts-container").append(getHTML(thought));
            });
            var topUsersContainer = $("#top-users-container");
            if (topUsersContainer.length === 0) {
              return
            } else {
              topUsersContainer.html("<h3> Top Users </h3>");
              response["top_users"].forEach(function(user) {
                  topUsersContainer.append(getTopUserHTML(user));
              });
            }
        });
    }

    $("#new-thought[data-remote]").on("ajax:success", function (e, data, status, xhr){
        $("#body").val("");
        jsonThoughts();
    });



   $("#user_handle").on("keydown keyup", function () {
      var input_val = $(this).val();
      if (input_val.trim().length < 3) {
        $(this).parent().addClass("field-with-errors");
      } else {
        $(this).parent().removeClass("field-with-errors");
      }
   });

   $("#body").on("keydown keyup", function () {
      var input_val = $(this).val();
      $(".char-count").html("");
      $(".char-count").html((140 - input_val.trim().length));
      if ((input_val.trim().length < 3) || (input_val.trim().length > 140)){
        $(this).parent().addClass("field-with-errors");
        $("#thought_submit").prop("disabled", true);
      } else {
        $(this).parent().removeClass("field-with-errors");
        $("#thought_submit").prop("disabled", false);
      }
   });
    // refreshThoughts = setInterval(function () {
    //     jsonThoughts();
    // }, 1000);

    $("#hide-form, #show-form").on("click", function(){
        $("#form-container").toggleClass("hidden-form");
    });
};

$(document).ready(ready);
$(document).on('page:load', ready);
  //= require_tree .
