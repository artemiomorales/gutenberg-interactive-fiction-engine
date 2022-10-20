export const ACTIVE_CONDITION_NAME = 'activecondition';

export default class InteractiveFictionEngine {

	constructor() {
		this.listeners = [];
		this.debugView = false;
	}

	setEngineDebugView(targetStatus) {
		this.debugView = targetStatus;
		if(targetStatus === true) {
			this.listeners.forEach((listener) => {
				listener.activateForceShow();
			});
		} else {
			this.listeners.forEach((listener) => {
				listener.deactivateForceShow();
			});
		}
	}

	registerListener(listener) {
		this.listeners.push(listener);
	}

	triggerUpdate(sourceListener) {
		this.listeners.forEach((targetListener) => {
			targetListener.resetChildren();
		});

		this.listeners.forEach((targetListener) => {
			this.listeners.forEach((siblingListener) => {
				if(targetListener.domElement.getAttribute('id') === siblingListener.conditionTarget && siblingListener.conditionTarget !== "") {
					targetListener.addChild(siblingListener);
				}
			})
		});

		sourceListener.resetChildrenActiveCondition();

		this.listeners.forEach((listener) => {
			if(listener.onEventRaised) {
				listener.onEventRaised();
			}
		});
	}

}
