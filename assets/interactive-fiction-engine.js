if(window.ifEngine) {
	console.log("Error! You have multiple instances of Adventure Kit installed. Blocks may not function as expected.");
}

class InteractiveFictionEngine {

	constructor() {
		this.listeners = [];
		this.ACTIVE_CONDITION_NAME = 'activecondition';
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

window.ifEngine = new InteractiveFictionEngine();
// window.ifEngine = new InteractiveFictionEngine(document.querySelector('#ifEngineElement'));
