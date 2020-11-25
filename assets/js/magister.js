// global. currently active menu item
var current_item = 0;

// few settings
var section_hide_time = 1300;
var section_show_time = 1300;

// jQuery stuff
jQuery(document).ready(function ($) {

    // Switch section
    $("a", '.mainmenu').click(function () {
        if (!$(this).hasClass('active')) {
            current_item = this;
            // close all visible divs with the class of .section
            $('.section:visible').fadeOut(section_hide_time, function () {
                $('a', '.mainmenu').removeClass('active');
                $(current_item).addClass('active');
                var new_section = $($(current_item).attr('href'));
                $.getScript('chisiamo.js', function () {
                    $(new_section).find("#chisiamoPar1").text("")
                    $(new_section).find("#chisiamoPar1").append(chisiamo.primoParagrafo + "<br/>")
                    $(new_section).find("#chisiamoPar2").text("")
                    $(new_section).find("#chisiamoPar2").append(chisiamo.secondoParagrafo + "<br/>")
                    $(new_section).find("#chisiamoPar3").text("")
                    $(new_section).find("#chisiamoPar3").append(chisiamo.terzoParagrafo + "<br/>")
                    $(new_section).find("#chisiamoPar4").text("")
                    $(new_section).find("#chisiamoPar4").append(chisiamo.quartoParagrafo + "<br/>")
                });

                $.getScript('corsi.js', function () {
                    $(new_section).find("#corsi").text("");
                    $(new_section).find("#corsi").append(corsi.map(appendCorso));
                    $(new_section).find("#corsi").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
                });

                $.getScript('progettiSpeciali.js', function () {
                    $(new_section).find("#progetti").text("");
                    $(new_section).find("#progetti").append(progettiSpeciali.map(appendProgetti));
                    $(new_section).find("#progetti").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
                });

                new_section.fadeIn(section_show_time);
            });
        } else
            return false;
    });

    function appendProgetti(item, index) {
        var mainclass = "col-sm-10 col-sm-offset-1 leftAlignment";


        return "<div class=\"" + mainclass + "\">" +
            "<h3 class=\"corsititle\"> " + item.titoloProg + "</h3>" +
            "<img src=\"./assets/images/" + item.immagineProg + "\" style=\"width:-moz-available\" class=\"col-sm-12 image main\" alt=\"" + item.titoloProg + "\" title=\"" + item.titoloProg + "\">" +
            "<p><br/><br/><b>Descrizione:</b>" + item.descrizioneProg + "</p>" +
            "</div></p>" +
            "</div>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div class=\"col-sm-12\"><br/></div>"

    }


    function appendCorso(item, index) {
        var mainclass = "col-sm-10 col-sm-offset-1 leftAlignment";


        return "<div class=\"" + mainclass + "\">" +
            "<h3 class=\"corsititle\"> " + item.titolo + "</h3>" +
            "<img src=\"./assets/images/" + item.immagine + "\" style=\"width:-moz-available\" class=\"col-sm-12 image main\" alt=\"" + item.titolo + "\" title=\"" + item.titolo + "\">" +
            "<p><br/><br/><b>Descrizione:</b>" + item.descrizione + "</p>" +
            "<p><b>Quando:</b>" + item.quando + "</p>" +
            "<p><b>Costo:</b>" + item.prezzo + "</p>" +
            "<p><b>Info:<b></b><a " +
            "href=\"mailto:accademiadiquartiere@gmail.com?subject=Iscrizione" + item.titolo + "\"><i>&nbsp;accademiadiquartiere@gmail.com</i></a>" +
            "</div></p>" +
            "</div>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div class=\"col-sm-12\"><br/></div>"

    }

    $(function () {
        json = {
            "applicants": [
                {
                    "name": "Nicholas Robinson",
                    "email": "ntrpilot@gmail.com",
                    "gender": "Male",
                    "age": "22"
                }
            ]
        };

        $.each(json.applicants, function () {

            var newApplicant = $("body").find("#chisiamo > div").clone();

            newApplicant.find(".chisiamo1").append(this.name);
            newApplicant.find(".email").append(this.email);
            newApplicant.find(".gender").append(this.gender);
            newApplicant.find(".age").append(this.age);

            $(newApplicant).appendTo(".applicant-list");
        });
    });

});