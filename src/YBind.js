( function( global, factory ) {

        if ( typeof module === "object" && typeof module.exports === "object" ) {

          module.exports = global.document ?

            factory( global, true ) :

            function( w ) {

              if ( !w.document ) {

                throw new Error( "YBind requires a window with a document" );

              }

              return factory( w );

            };

        } else {

          factory( global );

        }

}( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

    var YBind = function( obj, initObj ) {

      if( typeof obj !=='object' ) throw new Error( 'Only object arg is accepted!' );

      if( !(this instanceof YBind) ) return new YBind( obj , initObj );

      init.call( this, obj, initObj );
      
      this.type = 'YBind';

      return this;

    }

    YBind.prototype = {

      set: function( obj, exception, preventRefresh ) {

        if( typeof obj !== 'object' ) throw new Error( 'Only object arg is accepted!' );

        exception = exception || {};

        for( var key in obj ){

          var _key = obj.type === this.type ? key.substr(2) : key;

            if( exception[ _key ] === null ) continue;

            key in this && !( key in YBind.prototype ) && ( this[ preventRefresh ? '__' + _key : _key ] = exception[ _key ] !== undefined ? exception[ _key ] : obj[ key ] );

        }

        return this;

      },

      bind: function() {

        var that = this, key;

        for( key in this ){

          ( function( key ) {

            if( key.indexOf( '__' ) == 0 ){

              Array.prototype.forEach.call( document.querySelectorAll( '[yb-bind="' + key.substr(2) + '"]' ), function( elm, i ) {

                if( elm.nodeName.toLowerCase() == 'input' || elm.nodeName.toLowerCase() == 'textarea' ){

                  elm.removeEventListener( 'change', elm.yb_inputBind );

                  elm.yb_inputBind = function(){

                    var  ybVal = elm.getAttribute( 'yb-bind' ),
                         bind_children = ybVal.indexOf( '.' ) == -1 ? '' : ybVal.replace( /^(\w|\-)*\./ , ''), 
                         parent = that,
                         val = that[ key ],
                         son = '';

                     bind_children && bind_children.split( '.' ).forEach( function( _key, i ) {

                        if( !val.hasOwnProperty( _key ) ){

                          console.error( 'Can\'t find \'' + _key + '\' under', that[ key ] || that, '. Check yb-bind in: ', elm);

                          throw new Error( 'Please check above error message.' );

                        }else{

                            parent = val;
                            val    = val[ _key ],
                            son    = _key;

                        }

                     });

                     parent[ son == '' ? key : son ] = this.value;

                     that.act( key.substr(2) );

                  }

                  elm.addEventListener( 'change' , elm.yb_inputBind );

                }

              });

            }

          })( key )

        }

        return this;

      },

      act: function( key ) {

        if( key ){

          key in this && ( this[ key ] = this[ key ] );

        } else {

          for( var k in this ) {

            typeof this[ k ] == 'object' && ( this[ k.substr(2) ] = this[ k.substr(2) ] )

          }

        }

        return this;
      },

      add: function( obj, initObj ){
        
        init.call( this, obj, initObj );

        return this;

      }

    }

    YBind.bind = { bind: true }

    if ( typeof define === "function" && define.amd ) {

      define([], function() {

        return YBind;

      });

    }

    if(!noGlobal){

        window.YBind =  YBind;

    }

    return YBind;

    //private
    function findValueByChildren(children, returnVal, val, elm, keyword){

      var value = returnVal === undefined ? val : returnVal;

      children && children.split( '.' ).forEach( function( _key, _i ) {

          if( !value.hasOwnProperty( _key ) ){

            console.error( 'Can\'t find \'' + _key + '\' under', returnVal || val , '. Check yb-' + keyword + ' in: ', elm);

            throw new Error('Please check above error message.');

          } else {

            value = value[ _key ];

          }

      });

      return value;
    }

    function refreshViews(elms, keyword, returnVal, val, callback){

      Array.prototype.forEach.call( elms, function( elm, index ) {

         var ybVal    = elm.getAttribute( 'yb-' + keyword ),
             children = ybVal.indexOf( '.' ) == -1 ? '' : ybVal.replace(/^(\w|\-)*\./, ''),
             value    = findValueByChildren(children, returnVal, val, elm, keyword);

          callback( elm, index, value, keyword );

      });

    }

    function eventHandler( elm, index, value, keyword ){

       if( typeof value === 'function' ){

           elm.removeEventListener( keyword, elm[ 'yb_' + keyword ] );

           elm.addEventListener( keyword, value );

           elm[ 'yb_' + keyword ] = value;

        }
    }

    function init( obj, initObj ){

      var that = this;

      for( var key in obj ){

        this[ '__' + key ] = '';

        (function( that, obj, key, undefined ) {

            Object.defineProperty( that, key, {
              
              get: function() {

                return that[ '__' + key ];

              },  

              set: function( val ) {
                
                var returnVal, domHTML, domShow, domCls, domHref, domEach, domClick, domInput, domBlur, domFocus, domChange;

                that[ '__' + key ] = val;

                returnVal = typeof obj[ key ] == 'function' ? obj[ key ].call( that, val, key, '__' + key ) : undefined;  

                domHTML   = document.querySelectorAll( '[yb-bind="' + key + '"], [yb-bind^="' + key + '."]' );

                domShow   = document.querySelectorAll( '[yb-show="' + key + '"], [yb-show^="' + key + '."]' );

                domCls    = document.querySelectorAll( '[yb-class="' + key + '"], [yb-class^="' + key + '."]' );

                domHref   = document.querySelectorAll( '[yb-href="' + key + '"], [yb-href^="' + key + '."]' );

                domEach   = document.querySelectorAll( '[yb-each="' + key + '"], [yb-each^="' + key + '."]' );

                domClick  = document.querySelectorAll( '[yb-click="' + key + '"], [yb-click^="' + key + '."]' );

                domInput  = document.querySelectorAll( '[yb-input="' + key + '"], [yb-input^="' + key + '."]' );

                domBlur   = document.querySelectorAll( '[yb-blur="' + key + '"], [yb-blur^="' + key + '."]' );

                domFocus  = document.querySelectorAll( '[yb-focus="' + key + '"], [yb-focus^="' + key + '."]' );

                domChange = document.querySelectorAll( '[yb-change="' + key + '"], [yb-change^="' + key + '."]' );

                refreshViews( domHTML, 'bind', returnVal, val, function( elm, index, value ) {

                   var way = elm.nodeName.toLowerCase() == 'input' || elm.nodeName.toLowerCase() == 'textarea' ? 'value' : 'innerHTML';

                   elm[ way ] = value;

                });

                refreshViews( domShow, 'show', returnVal, val, function( elm, index, value ) {

                  if( !value ){

                      elm.style.cssText += 'display:none;';

                  } else {

                      elm.style.display == 'none' && ( elm.style.display = '' );

                      if( getComputedStyle( elm, '' ).getPropertyValue( 'display' ) == 'none') {

                        var display = '', 
                                el =  document.createElement( elm.nodeName.toLowerCase() );

                        document.body.appendChild( el );

                        display = getComputedStyle( el, '' ).getPropertyValue( 'display' );

                        document.body.removeChild( el );

                        elm.style.display = display == 'none' ? 'block' : display;   

                       }

                    }

                });

                refreshViews( domCls, 'class', returnVal, val, function( elm, index, value ) {

                  value += '';
                  
                  elm.yb_cls && elm.yb_cls.split(' ').forEach( function( _cls, _i ) {

                      _cls && elm.classList.remove( _cls );

                   });

                   value && value.split(' ').forEach( function( _cls, _i ) {

                      _cls && elm.classList.add( _cls ); 

                   });

                   elm.yb_cls = value;

                });

                refreshViews( domHref, 'href', returnVal, val, function( elm, index, value ) {

                  elm.setAttribute( 'href' , value);

                });

                refreshViews( domEach, 'each', returnVal, val, function( elm, index, value ) {

                  typeof value === 'function' && value.call( elm, index );

                });

                refreshViews( domClick, 'click', returnVal, val, eventHandler);

                refreshViews( domInput, 'input', returnVal, val, eventHandler);

                refreshViews( domBlur, 'blur', returnVal, val, eventHandler);

                refreshViews( domFocus, 'focus', returnVal, val, eventHandler);

                refreshViews( domChange, 'change', returnVal, val, eventHandler);

              }

            });

        })( this, obj, key )
      }

      for( var key in initObj ){

        key in obj && ( this[ '__' + key ] = initObj[ key ] );

      }

      this.bind();
    }
    
}));


