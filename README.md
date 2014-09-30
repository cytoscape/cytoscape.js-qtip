cytoscape-qtip
==============

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

If you want to access the qTip API for an element:
```js
var api = ele.qtip('api');
```

If you want to access the qTip API for the core:
```js
var api = cy.qtip('api');
```

See the [qTip docs for details on the API](http://qtip2.com/api).  If you create more than one qTip on an element and use its API, you'll have to cache the `api` references after creating each qTip.


## API additions

These are additional options you can use for convenience.  Remember: This extension is just a wrapper to qTip.  If you require more complex behaviour, you should manually use the [qTip API](http://qtip2.com/api).

 * `options.position.adjust.cyViewport` : When `true`, updates element qTip position on zoom and pan.  Note you'll need your own mechanism to hide out-of-bounds qTips, such as customising the parent container.

 * `options.show.cyBgOnly` : When `true`, shows core qTips only for events originated on the core (not bubbled).  Useful for "background" events.

 * `options.hide.cyBgOnly` : When `true`, hides core qTips only for events originated on the core (not bubbled).  Useful for "background" events.

 * `options.hide.cyViewport` : When `true`, hides qTips when the viewport is manipulated (i.e. zoom/pan).
