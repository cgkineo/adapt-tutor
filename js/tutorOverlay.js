define([
	'coreJS/adapt'
], function(Adapt) {


	var TutorOverlay = Backbone.View.extend({

		events: {
			"click .close-button, .close-button-text": "onCloseClick"
		},

		initialize: function () {
			this._onTutorOpened = _.bind(this.onTutorOpened, this);
			this._onTutorClosed = _.bind(this.onTutorClosed, this);
			this.listenTo(Adapt, "remove", this._onTutorClosed);
			this.listenTo(Adapt, "close", this._onTutorClosed);
			this.render();
		},

		render: function() {
			var alertObject = {
                title: this.model.get("feedbackTitle"),
                body: this.model.get("feedbackMessage"),
                _feedback: this.model.get("_feedback")
            };

			var $componentInner = this.$(".component-inner");
			var $tutorOvelay = $(Handlebars.templates["tutor-overlay"](alertObject));
            $componentInner.append($tutorOvelay);

            $tutorOvelay.find(".tutor-overlay").velocity("stop").velocity({
            	"opacity": 0
            }, {
            	"duration": 0,
            	"display": "block"
            }).velocity({
            	"opacity": 1
            }, {
            	"duration": 600,
            	"complete": this._onTutorOpened
            });

		},

		onTutorOpened: function() {
			Adapt.trigger("popup:opened", this.$(".tutor-overlay"));
		},

		onTutorClosed: function() {
            		
    		this.$(".tutor-container").remove();
    		Adapt.trigger("popup:closed");

    		this.stopListening();
    		this.undelegateEvents();


    	},

		onCloseClick: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.$(".tutor-overlay").velocity("stop").velocity({
            	"opacity": 0
            }, {
            	"duration": 600,
            	"complete": this._onTutorClosed
            });
		}

	});

	return TutorOverlay;

});
