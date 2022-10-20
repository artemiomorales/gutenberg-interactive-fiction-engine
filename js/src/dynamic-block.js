export default class DynamicBlock {

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
		this.updateVisibility();
	}

	updateVisibility() {
		this.init();
		if(this.displayConditionally && this.conditionTarget !== "" && !this.forceShow) {
			const conditionTargetElement = document.querySelector('#'+this.conditionTarget);
			if(conditionTargetElement) {
				const activeCondition = conditionTargetElement.dataset[this.ifEngine.ACTIVE_CONDITION_NAME];
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
		this.children.forEach((child) => {
			if(child.displayStatusUpdated === false) {
				child.displayStatusUpdated = true;
				child.domElement.style.display = 'none';
				child.hideChildren();
			}
		});
	}

	resetActiveCondition() {
		this.children.forEach((child) => {
			child.domElement.setAttribute('data-activecondition', '');
			child.resetActiveCondition();
		});
	}

}
