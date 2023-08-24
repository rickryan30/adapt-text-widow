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
			var articleEl = this.model.get('_articleView').$el;
			const modelArticle = Array.from(articleEl);
			var articleArr = [];

			modelArticle.forEach(elementArticle => {
				// article
				const dataArticle = Array.from(elementArticle.children);

				dataArticle.forEach(elementInner => {
					// article-inner
					const dataInner = Array.from(elementInner.firstElementChild.children);
					dataInner.forEach(elementTitBod => {
						// article-title/body/instruction
						const dataTitBod = Array.from(elementTitBod.children);
						dataTitBod.forEach(elementTitBodIn => {
							// article-title/body/instruction-inner
							const dataTitBodIn = Array.from(elementTitBodIn.children);
							if (dataTitBodIn.length > 0) {
								dataTitBodIn.forEach(elementChild => {
									const dataChild = Array.from(elementChild.children);
									if (dataChild.length > 0) {
										dataChild.forEach(elementChildIn => {
											articleArr.push("." + elementChildIn.parentElement.parentElement.className + " " + elementChildIn.parentElement.localName + " " + elementChildIn.localName);
										});
									} else {
										articleArr.push("." + elementChild.parentElement.className + " " + elementChild.localName);
									}
								});
							} else {
								articleArr.push("." + elementTitBodIn.classList[0]);
							}
						});
					});
				});

				const articleViewResult = this.removeDuplicates(articleArr);
				articleViewResult.forEach(elementArticleView => {
					const dataArticleView = $(elementArticleView, articleEl);
					return dataArticleView.length > 0 ? this.checkTextWidow(dataArticleView) : '';
				});
			});
		},

		onblockViewRendered: function(view) {
				const $parentArticleId = view.model.findAncestor('articles').get('_id');
				const $childArticleId = this.model.get('_articleView').model.get('_id');

				if ($parentArticleId === $childArticleId) {

					this.model.get('_blockViews').push(view);
					const modelBlock = this.model.get('_blockViews');
					var blockArr = [];

					modelBlock.forEach(elementBlock => {
						// block-inner
						const dataBlock = Array.from(elementBlock.$el.context.firstElementChild.children);
						dataBlock.forEach(elementTitleBlock => {
							// block-title/body/instruction component-container
							const dataTitleBlockCls = elementTitleBlock.className;
							if (dataTitleBlockCls != 'component-container') {
								const dataTitleBlock = Array.from(elementTitleBlock.children);
								dataTitleBlock.forEach(elementTitleBlockIn => {
									// block-title/body/instruction-inner component-container
									const dataTitleBlockIn = Array.from(elementTitleBlockIn.children);
									if (dataTitleBlockIn.length > 0) {
										dataTitleBlockIn.forEach(elementBlockChild => {
											 const dataBlockChild = Array.from(elementBlockChild.children);
											 if (dataBlockChild.length > 0) {
												dataBlockChild.forEach(elementBlockChildIn => {
													blockArr.push("." + elementBlockChildIn.parentElement.parentElement.className + " " + elementBlockChildIn.parentElement.localName + " " + elementBlockChildIn.localName);
												});
											} else {
												blockArr.push("." + elementBlockChild.parentElement.className + " " + elementBlockChild.localName);
											}
										});
									} else {
										blockArr.push("." + elementTitleBlockIn.classList[0]);
									}
									
								});
							}
						});
						const blockViewResult = this.removeDuplicates(blockArr);
						blockViewResult.forEach(elementBlockView => {
							const dataBlockView = $(elementBlockView, view.$el);
							return dataBlockView.length > 0 ? this.checkTextWidow(dataBlockView) : null;
						});
					});

				}
			},
			
		onComponentViewRendered: function(view) {
				var $parentArticleId = view.model.findAncestor('articles').get('_id');
				var $childArticleId = this.model.get('_articleView').model.get('_id');
				
				if ($parentArticleId === $childArticleId) {

					this.model.get('_componentViews').push(view);
					
					if (view.model.get('_component') !== 'blank') {

						const modelComponent = this.model.get('_componentViews');
						var componentArr = [];

						// modelComponent.forEach(elementComponent => {
						// 	// component result
						// 	const dataComponent = Array.from(elementComponent.$el.context.firstElementChild.children);
							
						// 	if (dataComponent.length > 1) {
						// 		console.log(dataComponent);
						// 	}
						// 	dataComponent.forEach(elementHeadWidgt => {
						// 		// component header - widget
						// 		const dataHeadWidgt = Array.from(elementHeadWidgt.children);
						// 		dataHeadWidgt.forEach(elementHeadWidgtIn => {
						// 			// component header-inner - 
						// 			const dataHeadWidgtIn = Array.from(elementHeadWidgtIn.children);
						// 			dataHeadWidgtIn.forEach(elementTitleBody => {
						// 				// component-title/body/instruction items
						// 				const dataTitleBody = Array.from(elementTitleBody.children);
						// 				dataTitleBody.forEach(elementTitleBodyIn => {
						// 					// component-title/body/instruction-inner items-inner
						// 					const dataTitleBodyIn = Array.from(elementTitleBodyIn.children);
						// 					if (dataTitleBodyIn.length > 0) {
						// 						dataTitleBodyIn.forEach(elementComponetChild => {
						// 							const dataComponentChild = Array.from(elementComponetChild.children);
						// 							if (dataComponentChild.length > 0) {
						// 								dataComponentChild.forEach(elementComponetChildIn => {
						// 									console.log("." + elementComponetChildIn.parentElement.parentElement.className + " " + elementComponetChildIn.parentElement.localName + " " + elementComponetChildIn.localName);
						// 									componentArr.push("." + elementComponetChildIn.parentElement.parentElement.className + " " + elementComponetChildIn.parentElement.localName + " " + elementComponetChildIn.localName);
						// 								});
						// 							} else {
						// 								console.log("." + elementComponetChild.parentElement.className + " " + elementComponetChild.localName);
						// 								componentArr.push("." + elementComponetChild.parentElement.className + " " + elementComponetChild.localName);
						// 							}
						// 						});	
						// 					} else {
						// 						// console.log(elementTitleBodyIn.classList);
						// 						console.log("." + elementTitleBodyIn.classList[0]);
						// 						componentArr.push("." + elementTitleBodyIn.classList[0]);
						// 					}
						// 				});
						// 			});
						// 		});
						// 	});
							
						// 	// const compoenentViewResult = this.removeDuplicates(componentArr);
						// 	// console.log(componentArr);
						// 	// console.log(compoenentViewResult);
						// 	// compoenentViewResult.forEach(elementComponentView => {
						// 	// 	const dataComponentView = $(elementComponentView, view.$el);
						// 	// 	return dataComponentView.length > 0 ? this.checkTextWidow(dataComponentView) : '';
						// 	// });
						// });
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