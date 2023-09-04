const { object } = require("underscore");

define([
	'core/js/adapt'
], function(Adapt) {

	var WidowText = Backbone.View.extend({

		initialize: function() {
			this.model.get('_articleView').$el.addClass('text-widow');

			this.listenTo(Adapt, {
				'blockView:postRender': this.onblockViewRendered,
				'componentView:postRender': this.onComponentViewRendered,
				'remove': this.onRemove
			});

			this.render();
		},

		render: function() {
			var articleElement = this.model.get('_articleView').$el;
			const articleModel = this.model.get('_articleView').model;

			const checkEmptyArr = articleModel.get('_classes').split(' ');
			const hasAnyEmptyElement = checkEmptyArr.filter(item => item);
			var includesArr = hasAnyEmptyElement.length > 0 && hasAnyEmptyElement.includes("disabled-textwidow");
			if (includesArr !== true) {
				$("[class$='-title'] > [class^='article']", articleElement).length > 0 && this.checkTextWidow($("[class$='-title'] > [class^='article']", articleElement));
				$("[class$='-body'] > [class^='article'] > p", articleElement).length > 0 && this.checkTextWidow($("[class$='-body'] > [class^='article'] > p", articleElement));
				$("[class$='-body'] > [class^='article'] > ul li", articleElement).length > 0 && this.checkTextWidow($("[class$='-body'] > [class^='article'] > ul li", articleElement));
				$("[class$='-body'] > [class^='article'] > ol li", articleElement).length > 0 && this.checkTextWidow($("[class$='-body'] > [class^='article'] > ol li", articleElement));
				$("[class$='-instruction'] > [class^='article']", articleElement).length > 0 && this.checkTextWidow($("[class$='-instruction'] > [class^='article']", articleElement));
			}
		},

		onblockViewRendered: function(view) {
			const $articleParentId = view.model.findAncestor('articles').get('_id');
			const $articleChildId = this.model.get('_articleView').model.get('_id');

			if ($articleParentId === $articleChildId) {
				this.model.get('_blockViews').push(view);
				const checkEmptyArr = view.model.get('_classes').split(' ');
				const hasAnyEmptyElement = checkEmptyArr.filter(item => item);
				var includesArr = hasAnyEmptyElement.length > 0 && hasAnyEmptyElement.includes("disabled-textwidow");
				if (includesArr !== true) {
					$("[class$='-inner'] > [class$='-title'] > [class^='block']", view.$el).length > 0 && this.checkTextWidow($("[class$='-inner'] > [class$='-title'] > [class^='block']", view.$el));
					$("[class$='-body'] > [class^='block'] > p", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > [class^='block'] > p", view.$el));
					$("[class$='-body'] > [class^='block'] > ul li", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > [class^='block'] > ul li", view.$el));
					$("[class$='-body'] > [class^='block'] > ol li", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > [class^='block'] > ol li", view.$el));
				}
			}
		},
			
		onComponentViewRendered: function(view) {
			var $articleParentId = view.model.findAncestor('articles').get('_id');
			var $articleChildId = this.model.get('_articleView').model.get('_id');

			if ($articleParentId === $articleChildId) {
				this.model.get('_componentViews').push(view);
				const checkEmptyArr = view.model.get('_classes').split(' ');
				const hasAnyEmptyElement = checkEmptyArr.filter(item => item);
				var includesArr = hasAnyEmptyElement.length > 0 && hasAnyEmptyElement.includes("disabled-textwidow");
				
				if (view.model.get('_component') !== 'blank' && includesArr !== true) {
					if ($("[class$='-title']", view.$el).length > 0) {
						$("[class$='-title'] > [class$='-inner']", view.$el).length > 0 ? this.checkTextWidow($("[class$='-title'] > [class$='-inner']", view.$el)) : this.checkTextWidow($("[class$='-title']", view.$el));
					}
					
					if($("[class$='-body'] > [class$='-inner']", view.$el).length > 0) {
						$("[class$='-body'] > [class$='-inner'] > p", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > [class$='-inner'] > p", view.$el));
						$("[class$='-body'] > [class$='-inner'] > ul li", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > [class$='-inner'] > ul li", view.$el));
						$("[class$='-body'] > [class$='-inner'] > ol li", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > [class$='-inner'] > ol li", view.$el));
					}
					
					if ($("[class$='-body']", view.$el).length > 0) {
						$("[class$='-body'] > p", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > p", view.$el));
						$("[class$='-body'] > ul li", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > ul li", view.$el));
						$("[class$='-body'] > ol li", view.$el).length > 0 && this.checkTextWidow($("[class$='-body'] > ol li", view.$el));
					}

					$("[class$='-instruction'] > [class$='-inner']", view.$el).length > 0 && this.checkTextWidow($("[class$='-instruction'] > [class$='-inner']", view.$el));
				}
			}
		},
			  
			checkTextWidow: function(textWidowValue) {
				textWidowValue.each(function(){
					var trimSpaces = $(this).html().trim();
					var wordArray = trimSpaces.split(" ");
					
					if (wordArray.length > 1) {
						wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
						var lastword = wordArray.pop();
						
						lastword = lastword.replace(/\s([^\s<]{0,10})\s*$/, "&nbsp;$1");
						$(this).html(wordArray.join(" "));
					}
				});
			},

			removeDuplicates: function(arr) {
				return arr.filter((item,
					index) => arr.indexOf(item) === index);
			},

			onRemove: function() {
				this.model.get('_articleView').$el.removeClass('text-widow');
				this.remove();
			}
	});

	Adapt.on('articleView:postRender', function(view) {
		var textWidowData = view.model.get('_textWidow');
		if(textWidowData && textWidowData._isEnabled) {
			var model = new Backbone.Model(textWidowData);
			model.set({
				_articleView: view,
				_blockViews: [],
				_componentViews: []
			});
			new WidowText({ model: model });
		}
	});
});