// Description:
// Returns a list of streamable MP3s.
//
// Dependencies:
// Requires SoundManager2 and jQuery.
//
// Commands:
// soundcloud falloutboy

var ddg_spice_sound_cloud = function(api_result) {
    "use strict";

    // Get the tracks that are actually streamable.
    var context= [];
    for(var i = 0; i < api_result.length; i += 1) {
        if(api_result[i].streamable) {
            context.push(api_result[i]);
        }
    }

    // Exit if we don't have what we need.
    if(!api_result || context.length === 0) {
        return;
    }

    // Display the plugin.
    Spice.render({
        data                     : context,
        header1                  : "Sound Cloud",
        source_url               : "https://soundcloud.com/search?q=",
        source_name              : "SoundCloud",
        template_normal          : "sound_cloud",
        carousel_css_id          : "sound_cloud",
        template_frame           : "carousel",
        force_big_header         : true,
        carousel_items           : context,
        carousel_template_detail: "sound_cloud_details",
        force_no_fold            : 1
    });

    // Initialize SoundManager2.
    window.SM2_DEFER = true;
    var soundSetup = function() {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.onready(function() {
            console.log("Lololololoaded!");
        });
    };

    // Load SoundManager2. This JS file handles our audio.
    $.getScript("/soundmanager2/script/soundmanager2.js", soundSetup);

    $("#ddgc_detail").prependTo("#sound_cloud");

    ddg_spice_sound_cloud.player = function(element) {
        // Check if it is already playing.
        // If it is, pause it.
        if($(element).hasClass("sm2_playing")) {
            console.log("It's playing. I'm going to pause this now.");
            $(element).removeClass("sm2_playing");
            $(element).addClass("sm2_paused");
        // If it's not playing, it's probably paused.
        // Let's play it.
        } else {
            console.log("It's paused. I'm going to play this now.");
            $(element).removeClass("sm2_paused");
            $(element).addClass("sm2_playing");
        }
    };
};

Handlebars.registerHelper("chooseImage", function(artwork, avatar) {
    "use strict";

    var image = artwork || avatar;
    return image.replace(/large\.jpg/, "t200x200.jpg");
});

Handlebars.registerHelper("toHttps", function(audio) {
    "use strict";
    if(audio) {
        return audio.replace(/^http:/, "https:");
    }
});