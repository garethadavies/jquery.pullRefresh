# jquery.pullRefresh

Current version: **0.1.0**

## Demo

You can see a demo of this plug-in in action here: [http://garethdavies.me/projects/jquery.pullRefresh/](http://garethdavies.me/projects/jquery.pullRefresh/)

## Requirements

* jQuery (1.9.1+) - http://jquery.com
* Hammer.js (1.0.5+) - http://eightmedia.github.io/hammer.js

## Getting up and running

### Download the files

* [jquery.pullRefresh.js](https://github.com/garethadavies/jquery.pullRefresh/raw/master/js/jquery.pullRefresh.js)
* [jquery.pullRefresh.css](https://github.com/garethadavies/jquery.pullRefresh/raw/master/css/jquery.pullRefresh.css)

### Reference the files

```html
<link rel="stylesheet" href="path/to/file/jquery.pullRefresh.css" type="text/css">
```

This script requires jQuery so make sure you add the pull refresh script after it or define jQuery as a dependency.

```html
<script src="path/to/file/jquery.pullRefresh.js"></script>
```

### Usage:

This plugin requires a specific HTML layout and CSS styling:

#### HTML

```html
<div id="page-wrapper" class="page-wrapper">

	<div id="refresh-panel" class="refresh-panel"></div>

	<div id="page-inner" class="page-inner"></div>

</div>
```

#### CSS

```css
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

.page-wrapper {
  height: 100%;
  overflow: hidden;
}

.page-inner {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 1em;
  position: relative;
  z-index: 1;
  background-color: white;
}

.refresh-panel {
  background-color: #eeeeee;
  min-height: 60px;
  width: 100%;
  text-align: center;
  position: absolute;
  z-index: 0;
  padding: 1em;
}
```

As you can see, there needs to be very specific control over the html and body elements to get this plug-in to work as it is. If this doesn't suit your particular set-up, you are welcome to hack on the current code.

#### JS

```js
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
```