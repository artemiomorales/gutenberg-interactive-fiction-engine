export const getModifiedArrayAttribute = ( attributes, attribute, targetIndex, newValue ) => {
	return new Promise((resolve) => {
		const originalArray = attributes[attribute];
		let newArray = [...originalArray];
		newArray[targetIndex] = newValue;
		const attributeObject = {};
		attributeObject[`${attribute}`] = newArray;
		resolve(attributeObject);
	})
 }

 export const getLengthenedArrayAttribute = ( attributes, attribute, newValue ) => {
	return new Promise((resolve) => {
		const originalArray = attributes[attribute];
		let newArray = [...originalArray];
		newArray.push(newValue);
		const attributeObject = {};
		attributeObject[`${attribute}`] = newArray;
		resolve(attributeObject);
	});
}


export class DynamicParagraph {
	constructor(domElement, active = false) {
		this.ifEngine = window.ifEngine;
		this.domElement = domElement;
		this.forceShow = false;
		this.children = [];
		this.displayStatusUpdated = false;

		this.init();

		this.updateVisibility();
	}

	init() {
		this.displayConditionally = this.domElement.dataset.displayconditionally === "1" ? true : false;
		this.conditionTarget = this.domElement.dataset.conditiontarget;
		this.conditionValue = parseInt(this.domElement.dataset.conditionvalue);
	}

	onEventRaised() {
		console.log("getting event");
		this.updateVisibility();
	}

	updateVisibility() {
		this.init();
		if(this.displayConditionally && this.conditionTarget !== "" && !this.forceShow) {
			const conditionTargetElement = document.querySelector('#'+this.conditionTarget);
			if(conditionTargetElement) {
				const activeCondition = conditionTargetElement.dataset[this.ifEngine.ACTIVE_CONDITION_NAME];
				console.log("updating");
				console.log(this);
				console.log(this.domElement);
				console.log(conditionTargetElement);
				console.log(activeCondition);
				if(parseInt(activeCondition) === this.conditionValue) {
					this.domElement.style.display = 'block';
				} else {
					this.domElement.style.display = 'none';
				}
			}
		}
	}

	activateForceShow() {
		this.forceShow = true;
		this.domElement.style.display = 'block';
	}

	deactivateForceShow() {
		this.forceShow = false;
		this.updateVisibility();
	}

	resetChildren() {
		this.children = [];
	}

	resetDisplayStatus() {
		this.displayStatusUpdated = false;
	}

	addChild(child) {
		this.children.push(child);
	}

	hideChildren() {
		console.log("hide children");
		console.log(this);
		this.children.forEach((child) => {
			if(child.displayStatusUpdated === false) {
				child.displayStatusUpdated = true;
				console.log(child.domElement);
				child.domElement.style.display = 'none';
				child.hideChildren();
			}
		});
	}

	resetActiveCondition() {
		this.children.forEach((child) => {
			// if(child.displayStatusUpdated === false) {
				child.displayStatusUpdated = true;
				child.domElement.setAttribute('data-activecondition', '');
				console.log(child.domElement);
				child.resetActiveCondition();
			// }
		});
	}

}

// window.ifEngine.dynamicParagraphs = [];
// const dynamicParagraphElements = document.querySelectorAll(".adventurekit-dynamicparagraph");
// dynamicParagraphElements.forEach((element) => {
// 	console.log("paragraph");
// 	console.log(element);
// 	const dynamicParagraph = new DynamicParagraph(element);
// 	window.ifEngine.registerListener(dynamicParagraph);
// });
