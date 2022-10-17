class DynamicParagraph {
	constructor(domElement) {
		this.adventureKitCore = window.adventureKitCore;

		this.domElement = domElement;

		this.dataElement = this.domElement.querySelector(".adventurekit-dynamicparagraph__data");

		console.log(this.dataElement);
		console.log(this.dataElement.dataset);

		this.displayConditionally = this.dataElement.dataset.displayconditionally === "1" ? true : false;
		this.conditionTarget = this.dataElement.dataset.conditiontarget;
		this.conditionValue = parseInt(this.dataElement.dataset.conditionvalue);

		this.updateVisibility();
	}

	onEventRaised() {
		console.log("getting event");
		this.updateVisibility();
	}

	updateVisibility() {
		console.log(this);
		if(this.displayConditionally) {
			const conditionTargetElement = document.querySelector('#'+this.conditionTarget);
			const conditionDataElement = conditionTargetElement.querySelector('.adventurekit-crystal9ball__data');
			console.log(conditionDataElement);
			if(conditionDataElement) {
				const activeCondition = conditionDataElement.dataset[this.adventureKitCore.ACTIVE_CONDITION_NAME];
				console.log(conditionDataElement.dataset);
				console.log(activeCondition);
				if(parseInt(activeCondition) === this.conditionValue) {
					this.domElement.style.display = 'block';
				} else {
					this.domElement.style.display = 'none';
				}
			}
		}
	}

}

window.adventureKitCore.dynamicParagraphs = [];
const dynamicParagraphElements = document.querySelectorAll(".adventurekit-dynamicparagraph");
dynamicParagraphElements.forEach((element) => {
	console.log("paragraph");
	console.log(element);
	const dynamicParagraph = new DynamicParagraph(element);
	window.ifEngine.registerListener(dynamicParagraph);
});
