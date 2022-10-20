import InteractiveFictionEngine, { ACTIVE_CONDITION_NAME } from './interactive-fiction-engine';
import DynamicBlock from './dynamic-block';

export const CHOICE_NAME = 'ifengine__choice';

window.ifEngine = new InteractiveFictionEngine();
window.ifEngine.dynamicBlocks = [];
const dynamicBlockElements = document.querySelectorAll(`.${CHOICE_NAME}`);
dynamicBlockElements.forEach((element) => {
	const dynamicBlock = new DynamicBlock(element);
	window.ifEngine.registerListener(dynamicBlock);
	const links = dynamicBlock.domElement.querySelectorAll('a');
	const activeAttributeName = `data-${ACTIVE_CONDITION_NAME}`;
	links.forEach((link, index) => {
		link.addEventListener('click', (e) => {
			if(parseInt(dynamicBlock.domElement.getAttribute(activeAttributeName)) !== index) {
				dynamicBlock.domElement.setAttribute(activeAttributeName, index);
			} else {
				dynamicBlock.domElement.setAttribute(activeAttributeName, null);
			}
			window.ifEngine.triggerUpdate(dynamicBlock);
		})
	})
});
