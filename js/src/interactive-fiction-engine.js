export const ACTIVE_CONDITION_NAME = 'activecondition';

export default class InteractiveFictionEngine {

	constructor() {
		this.listeners = [];
		this.debugView = false;
	}

	get debugView() {
		return this._debugView;
	}

	set debugView(targetValue) {
		this._debugView = targetValue;
		if(targetValue === true) {
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
			targetListener.resetDisplayStatus();
			targetListener.resetChildren();
		});

		this.listeners.forEach((targetListener) => {
			this.listeners.forEach((siblingListener) => {
				if(targetListener.domElement.getAttribute('id') === siblingListener.conditionTarget && siblingListener.conditionTarget !== "") {
					targetListener.addChild(siblingListener);
				}
			})
		});

		sourceListener.resetActiveCondition();

		this.listeners.forEach((listener) => {
			if(listener.onEventRaised) {
				listener.onEventRaised();
			}
		});
	}

}
