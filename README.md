cytoscape.js-qtip
=================

![Preview](https://raw.githubusercontent.com/cytoscape/cytoscape.js-qtip/master/img/preview.png)


## Description

A Cytoscape.js extension that wraps the [qTip jQuery library](http://qtip2.com)



## Dependencies

 * jQuery >= 1.10.0, as qTip requires it
 * qTip >= 2.2.0
 * Cytoscape.js >=2.2.0


## API

This extension wraps the qTip API so it can be used on Cytoscape.js graph elements instead of HTML DOM elements.

You can call qTip on graph elements:
```js
eles.qtip({ /* options ... */ });
```

You can call qTip on the core:
```js
cy.qtip({ /* options ... */ });
```

See the [qTip API for details on configuration](http://qtip2.com/options).


## API additions

These are additional options you can use for convenience.  Remember: This extension is just a wrapper to qTip.  If you require more complex behaviour, you should manually use the [qTip API](http://qtip2.com).

 * `options.position.adjust.cyViewport` : When `true`, updates element qTip position on zoom and pan.  Note you'll need your own mechanism to hide out-of-bounds qTips, such as customising the parent container.

 * `options.show.cyBgOnly` : When `true`, shows core qTips only for events originated on the core (not bubbled).  Useful for "background" events.

 * `options.hide.cyBgOnly` : When `true`, hides core qTips only for events originated on the core (not bubbled).  Useful for "background" events.