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
                    $(new_section).find("#chisiamoTitle1").text("")
                    $(new_section).find("#chisiamoTitle1").append('<strong>' + chisiamo.primoTitolo + '<br></strong>')
                    $(new_section).find("#chisiamoPar1").text("")
                    $(new_section).find("#chisiamoPar1").append(chisiamo.primoParagrafo)
                    $(new_section).find("#chisiamoTitle2").text("")
                    $(new_section).find("#chisiamoTitle2").append('<strong>' + chisiamo.secondoTitolo + '<br></strong>')
                    $(new_section).find("#chisiamoPar2").text("")
                    $(new_section).find("#chisiamoPar2").append(chisiamo.secondoParagrafo)
                    $(new_section).find("#chisiamoTitle3").text("")
                    $(new_section).find("#chisiamoTitle3").append('<strong>' + chisiamo.terzoTitolo + '<br></strong>')
                    $(new_section).find("#chisiamoPar3").text("")
                    $(new_section).find("#chisiamoPar3").append(chisiamo.terzoParagrafo)
                });

                new_section.fadeIn(section_show_time);
            });
        } else
            return false;
    });

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