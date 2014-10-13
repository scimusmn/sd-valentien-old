require.config({

    //By default load any module IDs from js/ directory
    baseUrl: 'js',

    //setup up shortcuts for commonly used libraries and components
    paths: {
        'jquery' : 'vendor/jquery/dist/jquery.min',
        'tween'  : 'vendor/gsap/src/minified/TweenMax.min',
        'Zoomer' : 'vendor/Zoomer/jquery.fs.zoomer.min'
    }

});


require(['jquery', 'net/AppData', 'net/Language', 'net/ui/ScreenManager', 'net/ui/MainScreen', 'net/ui/ViewerScreen' ], function( $, AppData, Language, ScreenManager, MainScreen, ViewerScreen ) {

    /*--------------*/
    /* Initial Load */
    /*--------------*/

    //Load XML
    $.ajax({
        type: "GET",
        url: "data/config.xml",
        dataType: "xml",
        success: function (xml) {

            AppData.updateSettings(xml);
            initialize();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Show error message if desired

        }
    });

    function initialize() {

        ScreenManager.init();
        ScreenManager.addScreen( new MainScreen( $('#screen_main') ) ); // Add Main Screen
        ScreenManager.addScreen( new ViewerScreen( $('#screen_viewer') ) ); // Add Viewer Screen
        ScreenManager.showScreen( ScreenManager.SCREEN_MAIN );

        Language.setupToggle("#language_btn");
        Language.setupTranslations( $(AppData.configXML).find("component").first() );

    }

});
