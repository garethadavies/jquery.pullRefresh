/**
jQuery - Pull to refresh
v0.1.0
*/

/*
Requires:
  * jQuery
  * Hammer.js
Optional:
  * Modernizr
Contents:
  * Plugin constructor
  * Plugin prototype
    * init
    * resetTargetEl
    * showMessage
  * Plugin wrapper
Author(s):
  * Gareth Davies @garethadavies
*/

/*
Usage:

HTML

JS
$('#page-inner').pullRefresh({
  
  // The min drag distance to fire off an update
  minDragDistance: 50,
  // The max distance we want the target element to be draggable
  maxDragDistance: 60,
  // This message will appear when the user initially drags down the target element
  pullMessage: 'Pull down to update',
  // This message will appear when the min drag distance is exceeded
  releaseMessage: 'Release to update',
  // This message will appear when the drag ends and the min drag distance is exceeded
  updateMessage: 'Updating...',
  // The time taken for the refresh panel to close
  animationDuration: 200,
  // The id of the refresh panel
  refreshPanel: 'refresh-panel',
  // Do something on drag start
  dragStart: function() {
  },
  // Do something on drag end
  dragEnd: function() {
  },
  // Do something after we have detected an update request
  update: function(callback) {
    // A callback is require set to true to reset the UI in an proper fashion, e.g.
    callback();
  }


});

*/

;(function ($, window, document, undefined) {

  // Create the defaults once
  var
  pluginName = 'pullRefresh',
  defaults = {

    minDragDistance: 50,
    maxDragDistance: 60,
    pullMessage: 'Pull down to update',
    releaseMessage: 'Release to update',
    updateMessage: 'Updating...',
    animationDuration: 200,
    refreshPanel: 'refresh-panel',
    dragStart: undefined,
    dragEnd: undefined,
    update: undefined

  };

  /*
  Plugin constructor
  */

  function Plugin(element, options) {

    this.element = element;
    this.$element = $(element);

    // future instances of the plugin
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;

    // Resize event listener initial state 
    this.settings.$refreshPanel = $('#' + this.settings.refreshPanel);

    // Call the init method to start it all off
    this.init();

  }

  /*
  Plugin prototype
  */

  Plugin.prototype = {

    /**
    @method init
    */
    init: function() {

      var
      _this = this,
      panelOpen = false;

      /*
      Drag event listener
      */

      // Detect a user swiping the left panel shut
      this.$element.hammer().on('drag', function(e) {

        // We need the current scroll top value
        var currentScrollPos = _this.$element.scrollTop();

        // We need to be at the top of the scroll to enable pull down refresh
        if (currentScrollPos === 0) {

          // Has there been a valid gesture?
          if (e.gesture) {

            // Fire off the drag end callback if one has been supplied
            if (_this.settings.dragStart) {

              // Make sure we have a proper function
              if ($.isFunction(_this.settings.dragStart)) {
                
                // Fire the callback
                _this.settings.dragStart();
              
              }
              else {

                throw 'The dragStart event callback is not a function';

              }

            }

            // We require vertical drag
            if (e.gesture.direction === 'down') {

              // If we haven't reach the max drag distance
              if (e.gesture.distance < _this.settings.maxDragDistance) {

                // Adjust the target element's top position
                _this.$element.css('top', e.gesture.distance);

              }

              // If the distance travelled is less than the min drag dinstance
              if (e.gesture.distance < _this.settings.minDragDistance) {

                // Show the 'pull' message
                _this.showMessage({

                  message: _this.settings.pullMessage

                });

                // Set panel open state to false
                panelOpen = false;

              }
              else {

                // Show the 'release' message
                _this.showMessage({

                  message: _this.settings.releaseMessage

                });

                // Set panel open state to true
                panelOpen = true;

              }

            }
            else {

              return;

            }

          }
          else {

            return;

          }

        }
        else {

          return;

        }

        e.gesture.preventDefault();
        e.preventDefault;

      });

      /*
      Drag end event listener
      */

      // Detect a user swiping the left panel shut
      this.$element.hammer().on('dragend', function(e) {

        // Fire off the drag end callback if one has been supplied
        if (_this.settings.dragEnd) {

          // Make sure we have a proper function
          if ($.isFunction(_this.settings.dragEnd)) {

            // Fire the callback
            _this.settings.dragEnd();

          }

        }

        // Has the panel moved the required distance to update?
        if (panelOpen === true) {

          // Make sure the panel is fully open
          _this.$element.css('top', _this.settings.maxDragDistance);

          // Show the 'update' message
          _this.showMessage({

            message: _this.settings.updateMessage

          });

          // Fire off the update callback if one has been supplied
          if (_this.settings.update) {

            // Make sure we have a proper function
            if ($.isFunction(_this.settings.update)) {
              
              // Fire the callback and provide our own callback to reset the UI
              _this.settings.update(function() {

                // Reset the UI
                _this.resetTargetEl();

                // Set panel open state to false
                panelOpen = false;

              });
            
            }

          }

        }
        else {

          // Reset the UI
          _this.resetTargetEl();

          // Set panel open state to false
          panelOpen = false;

        }

        e.gesture.preventDefault();
        e.preventDefault;

      });

    },

    /**
    @method resetTargetEl
    */
    resetTargetEl: function() {

      var _this = this;

      // Return the element to the start position
      this.$element.animate({

        top: '0'

      }, { 

        duration: _this.settings.animationDuration,
        queue: false,
        complete: function() {

          // Remove the style attribute from the target eloement
          _this.$element.removeAttr('style');

        }

      });

    },

    /**
    @method showMessage
    */
    showMessage: function(options) {

      // Make sure the correct message is shown in the refresh panel
      this.settings.$refreshPanel.html(options.message);

    }

  };

  /*
  Plugin wrapper
  */

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {

    return this.each(function() {

      if (!$.data(this, 'plugin_' + pluginName)) {

        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }

    });

  };

})(jQuery, window, document);
