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

        if (thought.parent_id) {
          var context = '<a class="link-color" href="/thoughts/' +
                        thought.parent_id +
                        '"> | Context </a>';
        }else {
          var context = '';
        }
        return '<div class="col s12 m12 l12 bottom-border">' +
        '<div class="row no-margin">' +
          '<div class="col s6 m4 l4">' +
            '<div class="row no-margin">' +
              '<div class="col s2 m2 l2 profile-pic-center">' +
                '<div class="pic-border">' +
                  '<img class="responsive-img circle profile-pic" src="' +
                    thought.user_pic +
                '"></div>' +
                '</div>' +
              '<div class="col s7 m7 l7">' +
                '<p>' +
                '<a class="link-color" href="/users/' +
                  thought.user_id +
                  '">' + '@' + thought.user_handle +
                '</a>' +
                '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
            '<div class="right link-color pad-right">' +
              '<p> <small>' + thought.time + '</small>' +
              '<br><small><a class="link-color" href="/thoughts/' +
              thought.id + '">' +
              'Responses: ' + thought.responses_count +
              '</a>' +
              context +
              '</small></p>' +
            '</div>' +

          '</div>' +
          '<a href="/thoughts/' +
            thought.id +
          '">' +
          '<div class="row no-margin">' +
            '<div class="col s12 m12 l12">' +
              '<p class="pad-left no-top-margin pad-bot link-color">' + thought.body + '</p>' +
            '</div>' +
          '</div>' +
          '</a>' +
        '</div>';
    };

    var getTopUserHTML = function(user) {
        return '<div class="col s12 m12 l12">' +
          '<div class="row">' +
            '<div class="col s2 m2 l2">'+
            '<div class="pic-border">' +
            '<img class="responsive-img circle profile-pic" src="' +
            user.pic + '">'+

            '</div>'+

            '</div>'+
            '<div class="col s7 m7 l7">'+

            '<a class="link-color" href="/users/' +
            user.id +
            '">' + '@' + user.handle +
            '</a>' +
            '<br>' +
            '<small class="link-color">Follows: ' +
            user.following_count +
            ' | Followers: ' +
            user.followers_count +
            '</small>' +
            '</div>'+
            '<div class="col s3 m3 l3">' +
              '<p class="chattr-logo"> <i class="fa fa-comment" aria-hidden="true"></i> ' + user.thoughts_count + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
    };

    var url = document.URL;
    var jsonThoughts = function () {
      $.getJSON(url, function(response){
            if (response["response"] === "true") {
              $("#thoughts-container").html("<h3 class=\"container-header\"> Responses </h3>");
            }else {
              $("#thoughts-container").html("<h3 class=\"container-header\"> Now </h3>");
            }
            response["thoughts"].forEach(function(thought) {
                $("#thoughts-container").append(getHTML(thought));
            });
            var topUsersContainer = $("#top-users-container");
            if (topUsersContainer.length === 0) {
              return
            } else {
              topUsersContainer.html("<h3 class=\"container-header center\"> Top Users </h3>");
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

    // refreshThoughts = setInterval(function () {
    //     jsonThoughts();
    // }, 1000);

    var updateUser = function () {
        $.getJSON(url, function(response){
            console.log(response);
            $(".profile-pic-lg").prop("src", response["user"].pic)
            $(".handle-name").html(response["user"].handle)
            $(".bio-info").html(response["user"].bio)
        });
    }

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



    $("#hide-form, #show-form").on("click", function(){
        $("#form-container").toggleClass("hidden-form");
    });

};

$(document).ready(ready);
$(document).on('page:load', ready);
  //= require_tree .
