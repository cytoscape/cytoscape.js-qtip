;(function( $, $$ ){
  
  function generateOpts( qtip, passedOpts ){
    var opts = $.extend( {}, passedOpts );

    if( !opts.id ){
      opts.id = 'cy-qtip-target-' + ( +new Date() );
    }

    if( !qtip.$domEle ){
      qtip.$domEle = $('<div id="' + opts.id + '"></div>');

      var parent = passedOpts && passedOpts.position && passedOpts.position.container ? passedOpts.position.container : document.body;

      $(parent).append( qtip.$domEle );
    }

    // qtip should be positioned relative to cy dom container
    opts.position = opts.position || {};

    opts.position.adjust = opts.position.adjust || {};

    if( opts.position.adjust.mouse === undefined ){
      opts.position.adjust.mouse = false;
    }

    // default show event
    opts.show = opts.show || {};

    if( !opts.show.event ){
      opts.show.event = 'tap';
    }

    // default hide event
    opts.hide = opts.hide || {};

    if( !opts.hide.event ){
      opts.hide.event = 'unfocus';
    }

    return opts;
  }

  function tryQtipApi( ele, passedOpts, args ){
    // call qtip api function
    if( $$.is.string( passedOpts ) ){
      var ele = eles[0];
      var qtip = ele.scratch().qtip;

      if( ele && qtip ){
        return qtip.$domEle.qtip.apply( qtip.$domEle, arguments );
      }
    }

    throw 'Could not run qtip api';
  }

  $$('collection', 'qtip', function( passedOpts ){
    var args = arguments;
    var eles = this;
    var cy = this.cy();
    var container = cy.container();

    try {
     return tryQtipApi( ele, passedOpts, args );
    } catch( err ){
      // just continue
    }

    eles.each(function(i, ele){
      var scratch = ele.scratch();
      var qtip = scratch.qtip = scratch.qtip || {};
      var opts = generateOpts( qtip, passedOpts );


      // call qtip on dummy dom ele      
      qtip.$domEle.qtip( opts );
      var qtipApi = qtip.$domEle.qtip('api');

      var updatePosition = function(e){
        var pos = ele.renderedPosition() || e.cyRenderedPosition;
        var cOff = container.getBoundingClientRect();
        var w = ele.isNode() ? ele.renderedWidth() : 0;
        var h = ele.isNode() ? ele.renderedHeight() : 0;

        qtip.$domEle.css({
          position: 'absolute',
          zIndex: '-1',
          width:  w  + 'px',
          height: h + 'px',
          left: cOff.left + pos.x + window.scrollX - w/2,
          top: cOff.top + pos.y + window.scrollY - h/2
        });
      };
      updatePosition();

      ele.on( opts.show.event, function(e){
        updatePosition(e);

        qtipApi.show();
      } );

      ele.on( opts.hide.event, function(e){
        qtipApi.hide();
      } );

      if( opts.position.adjust.cyViewport ){
        cy.on('pan zoom', function(e){
          updatePosition(e);

          qtipApi.reposition();
        });
      }

    });

    return this; // chainability
    
  });

  $$('core', 'qtip', function( passedOpts ){
    var args = arguments;
    var cy = this;
    var container = cy.container();

    try {
     return tryQtipApi( cy, passedOpts, args );
    } catch( err ){
      // just continue
    }

    var scratch = cy.scratch();
    var qtip = scratch.qtip = scratch.qtip || {};
    var opts = generateOpts( qtip, passedOpts );


    // call qtip on dummy dom ele      
    qtip.$domEle.qtip( opts );
    var qtipApi = qtip.$domEle.qtip('api');

    var updatePosition = function(e){
      var pos = e.cyRenderedPosition;
      var cOff = container.getBoundingClientRect();

      qtip.$domEle.css({
        position: 'absolute',
        zIndex: '-1',
        left: cOff.left + pos.x + window.scrollX,
        top: cOff.top + pos.y + window.scrollY
      });
    };

    cy.on( opts.show.event, function(e){
      if( !opts.show.cyBgOnly || (opts.show.cyBgOnly && e.cyTarget === cy) ){
        updatePosition(e);

        qtipApi.show();
      }
    } );

    cy.on( opts.hide.event, function(e){
      if( !opts.hide.cyBgOnly || (opts.hide.cyBgOnly && e.cyTarget === cy) ){
        qtipApi.hide();
      }
    } );

    return this; // chainability
    
  });
  
})( jQuery, cytoscape );