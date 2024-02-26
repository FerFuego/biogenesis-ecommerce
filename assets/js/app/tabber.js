/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
(function () {
	var tablist = document.querySelectorAll('[role="tablist"]'),
		i,
		keys = {
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			delete: 46,
			enter: 13,
			space: 32
		},
		direction = {
			37: -1,
			38: -1,
			39: 1,
			40: 1
		},
		timing = 200;

	tablist.forEach((item, i) => {
		var self = item,
			tabs = item.querySelectorAll('[role="tab"]'),
			panels = item.querySelectorAll('[role="tabpanel"]'),
			panelContainer = item.querySelector( '.panel-container' ),
			underline = item.querySelector( '.button-underline' ),
			vertical = item.getAttribute('aria-orientation') == 'vertical';

		item.classList.add( 'js-active' );

		tabs.forEach((tab, i) => {
			tab.addEventListener('click', clickEventListener);
			tab.addEventListener('keydown', keydownEventListener);
			tab.addEventListener('keyup', keyupEventListener);

			// Build an array with all tabs (<button>s) in it
			tab.index = i;
		});

		panels.forEach((panel, i) => {
			panel.setAttribute( 'hidden', 'hidden' );
		});

		// When a tab is clicked, activateTab is fired to activate it
		function clickEventListener (event) {
			var tab = event.target;
			activateTab( tab, true );
		};

		// Activates any given tab panel
		function activateTab (tab, setFocus ) {
			setFocus = setFocus || false;

			// Get the value of aria-controls (which is an ID)
			var controls = tab.getAttribute('aria-controls');

			// Deactivate all other tabs
			deactivateTabs( controls );

			// Remove tabindex attribute
			tab.removeAttribute('tabindex');

			// Set the tab as selected
			tab.setAttribute('aria-selected', 'true');

			if( underline ){
				underline.style.left = tab.offsetLeft + 'px';
				underline.style.width = tab.offsetWidth + 'px';
			}

			// Remove hidden attribute from tab panel to make it visible
			var activeTab = document.getElementById(controls);
			activeTab.removeAttribute( 'hidden' );
			panelContainer.style.minHeight = activeTab.offsetHeight + 'px';
			//gsap.to( panelContainer, { height: ( activeTab.offsetHeight ), duration: timing/100 } );
			setTimeout( function(){
				activeTab.classList.add( 'active' );
				activeTab.classList.remove( 'transition' );
			}, timing );

			// Set focus when required
			if (setFocus) {
				tab.focus();
			};

		};

		// Deactivate all tabs and tab panels
		function deactivateTabs( ignore ) {
			tabs.forEach((tab, i) => {
				tab.setAttribute('tabindex', '-1');
				tab.setAttribute('aria-selected', 'false');
			});

			panels.forEach((panel, i) => {
				if( panel.getAttribute( 'id' ) !== ignore ){
					panel.classList.remove( 'active' );
					panel.classList.add( 'transition' );
					setTimeout( function(){
						panel.setAttribute( 'hidden', 'hidden' );
					}, timing );
				}
			});
		};

		var hash = window.location.hash.substr(1);
		if( '' !== hash && document.getElementById( hash ).getAttribute( 'role' ) === 'tab' ){
			activateTab( document.getElementById( hash ), false );
		}else{
			activateTab( tabs[0], false );
		}

		// Handle keydown on tabs
		function keydownEventListener (event) {
			var key = event.keyCode;

			switch (key) {
				case keys.end:
					event.preventDefault();
					// Activate last tab
					focusLastTab();
				break;
				case keys.home:
					event.preventDefault();
					// Activate first tab
					focusFirstTab();
				break;

				// Up and down are in keydown
				// because we need to prevent page scroll >:)
				case keys.up:
				case keys.down:
					determineOrientation(event);
				break;
			};
		};

		// Handle keyup on tabs
		function keyupEventListener (event) {
			var key = event.keyCode;

			switch (key) {
				case keys.left:
				case keys.right:
					determineOrientation(event);
				break;
				case keys.delete:
					determineDeletable(event);
				break;
				case keys.enter:
				case keys.space:
					activateTab(event.target);
				break;
			};
		};

		// When a tablistâ€™s aria-orientation is set to vertical,
		// only up and down arrow should function.
		// In all other cases only left and right arrow function.
		function determineOrientation (event) {
			var key = event.keyCode;
			var proceed = false;

			if (vertical) {
				if (key === keys.up || key === keys.down) {
					event.preventDefault();
					proceed = true;
				};
			}
			else {
				if (key === keys.left || key === keys.right) {
					proceed = true;
				};
			};

			if (proceed) {
				switchTabOnArrowPress(event);
			};
		};

		// Either focus the next, previous, first, or last tab
		// depending on key pressed
		function switchTabOnArrowPress (event) {
			var pressed = event.keyCode;

			if (direction[pressed]) {
				var target = event.target;
				if (target.index !== undefined) {
					if (tabs[target.index + direction[pressed]]) {
						tabs[target.index + direction[pressed]].focus();
					}
					else if (pressed === keys.left || pressed === keys.up) {
						focusLastTab();
					}
					else if (pressed === keys.right || pressed == keys.down) {
						focusFirstTab();
					};
				};
			};
		};

		// Make a guess
		function focusFirstTab () {
			tabs[0].focus();
		};

		// Make a guess
		function focusLastTab () {
			tabs[tabs.length - 1].focus();
		};
	});

}());
