/*
 * adapt-contrib-tutor
 * License - http://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 * Maintainers - Kevin Corry <kevinc@learningpool.com>, Daryl Hedley <darylhedley@hotmail.com>,
 *               Himanshu Rajotia <himanshu.rajotia@exultcorp.com>
 */
define([
    'coreJS/adapt',
    './tutorOverlay'
],function(Adapt, TutorOverlay) {

    Adapt.on('questionView:showFeedback', function(view) {

        

        switch (view.model.get("_feedback")._type) {
        case "overlay":

            var tutorOverlay = new TutorOverlay({model:view.model, el:view.el});

            break;
        case "notify":
        default:

            var alertObject = {
                title: view.model.get("feedbackTitle"),
                body: view.model.get("feedbackMessage")
            };

            Adapt.once("notify:closed", function() {
                Adapt.trigger("tutor:closed");
            });

            Adapt.trigger('notify:popup', alertObject);
            
            Adapt.trigger('tutor:opened');
            break;
        }
        


            
    });

});
