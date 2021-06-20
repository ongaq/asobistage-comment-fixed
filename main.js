(() => {
	const reactAppNode = document.querySelector('#app');
	const config = { attributes: true, childList: true };
	let observerToReact, observerComment;
	const moveTargetToTabs = (target) => {
		const tab = document.querySelector('[role="tabpanel"]');
		const ele = target.cloneNode(true);
		
		tab.insertAdjacentElement('afterbegin', ele);

		return ele;
	};
	const movedTargetDelete = () => {
		const tab = document.querySelector('[role="tabpanel"]');
		const target = tab.querySelector('[data-type="normal"]:first-child');

		if (Object.keys(tab.firstChild.dataset).length) {
			target.remove();
		}
	};
	const addStyle = (target) => {
		target.style.padding = '4px 0';
		target.style.top = '39px';
		target.style.borderTop = '1px solid #d0d0d0';
		target.style.borderBottom = '1px solid #d0d0d0';
		target.style.zIndex = '99999';
		target.style.height = 'auto';
		target.style.boxSizing = 'border-box';
		target.style.backgroundColor = '#ffffff';
	};
	const watchComment = (mutationsList) => {
		for (const mutation of mutationsList) {
			const addedNodes = mutation.addedNodes;
	
			if (addedNodes) {
				const comment = addedNodes[0];
				const name = comment?.children[0]?.children[0]?.innerText;

				if (name === 'アンティーカ見守りん') {
					movedTargetDelete();
					const ele = moveTargetToTabs(comment);
					addStyle(ele);
				}
			}
		}
	};
	const watchReactStart = (mutationsList) => {
		for (const mutation of mutationsList) {
			const addedNodes = mutation.addedNodes;
			if (addedNodes && addedNodes[0].tagName === 'FOOTER') {
				observerToReact.disconnect();
				const targetNode = document.querySelector('#app [role="tabpanel"] > div > div > div > div');
				observerComment = new MutationObserver(watchComment);
				observerComment.observe(targetNode, config);
			}
		}
	};

	observerToReact = new MutationObserver(watchReactStart);
	observerToReact.observe(reactAppNode, config);
})();