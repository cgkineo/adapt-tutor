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
    
            if (view.model.has('_isCorrect')) {
                // Attach specific classes so that feedback can be styled.
                if (view.model.get('_isCorrect')) {
                    alertObject._classes = 'correct';
                } else {
                    if (view.model.has('_isAtLeastOneCorrectSelection')) {
                        // Partially correct feedback is an option.
                        alertObject._classes = view.model.get('_isAtLeastOneCorrectSelection')
                            ? 'partially-correct'
                            : 'incorrect';
                    } else {
                        alertObject._classes = 'incorrect';
                    }
                }
            }
    
            Adapt.once("notify:closed", function() {
                Adapt.trigger("tutor:closed");
            });
    
            Adapt.trigger('notify:popup', alertObject);
    
            Adapt.trigger('tutor:opened');
            
            break;
        }

    });

});
