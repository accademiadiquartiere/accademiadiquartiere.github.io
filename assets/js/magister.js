// global. currently active menu item
var current_item = 0;

// few settings
var section_hide_time = 1300;
var section_show_time = 1300;


// jQuery stuff
jQuery(document).ready(function ($) {


// language picker
    jQuery(function ($) {
        $.getScript('sezioniModificabili/news.js', function () {
            $("#head").find("#news").text("");
            $("#head").find("#news").append(news.map(appendNews));
            $(".buttons").click(function () {
                var divname = this.getAttribute("value");
                if ($("#news" + divname).is(":hidden")) {
                    $("#news" + divname).slideToggle().show("slow");
                } else {
                    $("#news" + divname).slideToggle().hide("slow");
                }
            });
            $("#head").find("#news").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
        });
        // ...
        $.i18n().load({
            'en': 'i18n/languages/messages-en.json',
            'it': 'i18n/languages/messages-it.json'
        }).done(function () {
            $('.switch-locale').on('change', function (e) {
                e.preventDefault();
                $.i18n().locale = this.value;
                $('body').i18n();
            });
        });
    });

    $.i18n().load({
        it: 'i18n/languages/messages-it.json',
        en: 'i18n/languages/messages-en.json'
    });

    $('body').i18n();
    // Switch section
    $("a", '.mainmenu').click(function () {
        if (!$(this).hasClass('active')) {
            current_item = this;
            // close all visible divs with the class of .section
            $('.section:visible').fadeOut(section_hide_time, function () {
                $('a', '.mainmenu').removeClass('active');
                $(current_item).addClass('active');
                $('body').i18n();
                var new_section = $($(current_item).attr('href'));
                $.getScript('sezioniModificabili/chisiamo.js', function () {
                    $(new_section).find("#chiSiamoContent").text("")
                    $(new_section).find("#chiSiamoContent").append(chisiamo.map(appendChiSiamo) + "<div class=\"col-sm-12\"><br/></div>" + "<div class=\"col-sm-12\"><br/></div>");

                });
                $.getScript('sezioniModificabili/corsi.js', function () {
                    $(new_section).find("#corsi").text("");
                    $(new_section).find("#corsi").append(corsi.map(appendCorso));
                    $(new_section).find("#corsi").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
                });

                $.getScript('sezioniModificabili/progettiSpeciali.js', function () {
                    $(new_section).find("#progetti").text("");
                    $(new_section).find("#progetti").append(progettiSpeciali.map(appendProgetti));
                    $(new_section).find("#progetti").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
                });

                $.getScript('sezioniModificabili/collaborazioni.js', function () {
                    $(new_section).find("#collab").text("");
                    $(new_section).find("#collab").append(collaborazioni.map(appendCollaborazioni));
                    $(new_section).find("#collab").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
                });

                $.getScript('sezioniModificabili/volti.js', function () {
                    $(new_section).find("#volti").text("");
                    $(new_section).find("#volti").append(volti.map(appendVolti));
                    $(new_section).find("#volti").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
                });

                $.getScript('sezioniModificabili/news.js', function () {
                    $(new_section).find("#news").text("");
                    $(new_section).find("#news").append(news.map(appendNews));
                    $(".buttons").click(function () {
                        var divname = this.getAttribute("value");
                        if ($("#news" + divname).is(":hidden")) {
                            $("#news" + divname).slideToggle().show("slow");
                        } else {
                            $("#news" + divname).slideToggle().hide("slow");
                        }
                    });
                    $(new_section).find("#news").append("<div class\"col-sm-4 col-sm-offset-4\"/>");
                });

                new_section.fadeIn(section_show_time, "swing", scrollTop());
                $(".buttons").click(function () {
                    var divname = this.getAttribute("value");
                    if ($("#news" + divname).is(":hidden")) {
                        $("#news" + divname).slideToggle().show("slow");
                    } else {
                        $("#news" + divname).slideToggle().hide("slow");
                    }
                });

            });
        } else
            return false;
    });

    function appendChiSiamo(item, index) {
        return "<div class=\"row\">" +
            "<div class=\"col-sm-8 col-sm-offset-2\" style=\"padding-left:30px; padding-right:30px; text-align:justify\"> " +
            "<p data-i18n=\"" + $.i18n(item.label) + "\">" + $.i18n(item.label) + "</p> " +
            "</div>" +
            "</div>";
    }

    function appendProgetti(item, index) {
        var mainclass = "col-sm-10 col-sm-offset-1 leftAlignment";


        return "<div class=\"" + mainclass + "\">" +
            "<h3 class=\"corsititle\"> " + item.titoloProg + "</h3>" +
            "<img src=\"./assets/images/" + item.immagineProg + "\" style=\"width:-moz-available\" class=\"col-sm-12 image main\" alt=\"" + item.titoloProg + "\" title=\"" + item.titoloProg + "\">" +
            "<p data-i18n=\"Re-Care Descrizione\"><br/><br/><b data-i18n=\"Descrizione\">Descrizione:</b>" + item.descrizioneProg + "</p>" +
            "</div></p>" +
            "</div>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div class=\"col-sm-12\"><br/></div>"

    }

    function appendCollaborazioni(item, index) {
        var mainclass = "col-sm-10 col-sm-offset-1 leftAlignment";


        return "<div class=\"" + mainclass + "\">" +
            "<h3 class=\"corsititle\"> " + item.titoloCollaborazione + "</h3>" +
            item.partners.map(appendSponsor).join("<div class=\"col-sm-12\"><br/></div>") +
            "<div class=\"col-sm-12\"><br/></div>" +
            "</div></p>" +
            "</div>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div class=\"col-sm-12\"><br/></div>"
    }


    function eventuallyAppendFoto(item) {
        if (item.foto != null)
            return "<img style=\"width:-moz-available\" class=\"col-sm-12 image main\" src='./assets/images/" + item.foto + "'/>"
        else return ""
    }

    function appendNews(item, index) {
        return " <article class=\"day-forecast\">" +
            "<h1 class='text-center'><b>" + item.titoloNews + "</b></h1>" +
            "<p class='text-center'>" + item.sottotitolo + "</p>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div  class='text-center newsArrow buttons' value='" + index + "'>&#8595;</div>" +
            "</article>" +
            "<article id='news" + index + "' style='display: none' class=\"day-forecast\">" +
            eventuallyAppendFoto(item) +
            "<p>" + item.testoNews + "</p>"
            + "</article>"

    }

    function appendSponsor(item, index) {
        return "<img src=\"./assets/images/" + item.immaginePartner + "\" style=\"width:50%; padding-right: 5px\" alt=\"" + item.nomePartner + "\" title=\"" + item.nomePartner + "\">"

    }

    function appendVolti(item, index) {
        var mainclass = "col-sm-10 col-sm-offset-1 leftAlignment";


        return "<div class=\"" + mainclass + "\">" +
            "<h3 class=\"corsititle\"> " + item.nome + " - " + item.ruolo + "</h3>" +
            "<img src=\"./assets/images/" + item.foto + "\" style=\"width:-moz-available;\" class=\"col-sm-12 image volti main\" alt=\"" + item.foto + "\" title=\"" + item.foto + "\">" +
            "</div></p>" +
            "</div>" +
            "<div class=\"col-sm-12\"><br/></div>" +
            "<div class=\"col-sm-12\"><br/></div>"

    }

    function scrollTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    function appendCorso(item, index) {
        var mainclass = "col-sm-10 col-sm-offset-1 leftAlignment";

        return "<div class=\"" + mainclass + "\">" +
            "<h3 class=\"corsititle\" data-i18n=\"" + item.titolo + "\"> " + $.i18n(item.titolo) + "</h3>" +
            "<img src=\"./assets/images/" + item.immagine + "\" style=\"width:-moz-available\" class=\"col-sm-12 image main\" data-i18n=\"" + item.titolo + "\" alt=\"" + $.i18n(item.titolo) + "\" title=\"" + $.i18n(item.titolo) + "\">" +
            "<p><br/><br/><b data-i18n=\"descrizione\">" + $.i18n('descrizione') + ": </b>" + "<p data-i18n=\"" + item.titolo + " Descrizione" + "\">" + $.i18n(item.titolo + " Descrizione") + "</p>" + "</p>" +
            "<p><b data-i18n=\"quando\">" + $.i18n('quando') + ": </b>&nbsp;" + item.quando.map(appendQuando).join("") + "</p>" +
            "<p><b>Info:<b></b><a " +
            "href=\"mailto:accademiadiquartiere@gmail.com?subject=Iscrizione" + item.titolo + "\"><i>&nbsp;accademiadiquartiere@gmail.com</i></a>" +
            "</div></p>" +
            "</div>" +
            "<div class=\"col-sm-12\"><br/></div>"

    }

    function appendQuando(item, index) {

        if (item.nomeGruppo == null) {
            return item.orari.map(appendOrari).join("")
        } else return "<br/><i data-i18n=\"" + item.nomeGruppo + "\">" + $.i18n(item.nomeGruppo) + ":</i> " + item.orari.map(appendOrari).join("") +
            "";

    }

    function appendOrari(item, index) {
        return "&nbsp;&nbsp;&nbsp;<p data-i18n=\"" + item.orario + "\">" + $.i18n(item.orario) + "</p>";
    }
});

