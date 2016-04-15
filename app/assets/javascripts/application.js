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
    clearInterval(refreshThoughts);
    var getHTML = function(thought) {
        return '<div class="thought-card col s12 m12 l12">' +
        '<div class="row thought-header">' +
          '<div class="col s6 m4 l4">' +
            '<p>' +
            '<a href="/users/' +
            thought.user_id +
            '">' + '$' + thought.user_handle +
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

    var url = document.URL;
    var jsonThoughts = function () {

      $.getJSON(url, function(response){
          console.log(response);
          $("#thoughts-container").html("<h3> Now </h3>");
          var thoughts = response["thoughts"];
          thoughts.forEach(function(thought) {
          $("#thoughts-container").append(getHTML(thought));
        });
      });
    }

    $("#new-thought[data-remote]").on("ajax:success", function (e, data, status, xhr){
        $("#body").val("");
        jsonThoughts();
    });

    // refreshThoughts = setInterval(function () {
    //
    //     jsonThoughts();
    // }, 1000);

};


$(document).ready(ready);
$(document).on('page:load', ready);
  //= require_tree .
