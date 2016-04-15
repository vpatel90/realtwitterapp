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
ready = function() {

    var getHTML = function(thought) {


        return '<div class="thought-card col s12 m12 l12">' +
        '<div class="row thought-header">' +
          '<div class="col s6 m4 l4">' +
            '<p>' + thought.user_handle + '</p>' +
          '</div>' +

          '<div class="right">' +
            '<p> <small>' + thought.time + '</small></p>' +
          '</div>' +

        '</div>' +
        '<div class="row">' +
          '<div class="col s12 m12 l12">' +
            '<p>' + thought.body + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    };

    var url = document.URL;
    $("#new-thought[data-remote]").on("ajax:success", function (e, data, status, xhr){
        $("#body").val("");
        $.getJSON(url, function(response){
            $("#thoughts-container").html("");
            response.forEach(function(thought) {
            $("#thoughts-container").append(getHTML(thought));
          });
        });
    });
};

$(document).ready(ready);
$(document).on('page:load', ready);
  //= require_tree .
