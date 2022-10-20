import InteractiveFictionEngine from './interactive-fiction-engine';
import DynamicBlock from './dynamic-block';

window.ifEngine = new InteractiveFictionEngine();
window.ifEngine.dynamicBlocks = [];
const dynamicBlockElements = document.querySelectorAll(".ifengine__choice");
dynamicBlockElements.forEach((element) => {
	const dynamicBlock = new DynamicBlock(element);
	window.ifEngine.registerListener(dynamicBlock);
	const links = dynamicBlock.domElement.querySelectorAll('a');
	links.forEach((link, index) => {
		link.addEventListener('click', (e) => {
			if(parseInt(dynamicBlock.domElement.getAttribute('data-activecondition')) !== index) {
				dynamicBlock.domElement.setAttribute('data-activecondition', index);
			} else {
				dynamicBlock.domElement.setAttribute('data-activecondition', null);
			}
			window.ifEngine.triggerUpdate(dynamicBlock);
		})
	})
});
