What is it?
===========
`imageRotator.js` is a lightweight (1 KB) [jQuery][] plugin that crossfades through a series of images. 

Dependencies
============
`imageRotator.js` uses the [jQuery][] library for DOM manipulation.

How do I use it?
================

1. Create a `<div>` with `<img>` tags for all the images you would like to display.
2. Create a jQuery object for the `<div>`, and invoke the `imageRotator()` method on it to instantiate and return the image rotator. Optional: pass configuration parameters to specify animation timing.
3. Call the `start()` method on the image rotator to start cycling through the images.

For example:  
```javascript  
var $imageDiv = $("#imageRotator");
var $imageRotator = $imageDiv.imageRotator({
    imageTime: 3000,
    fadeTime: 2000
});
$imageRotator.start();
```

Function reference
==================

Options and Defaults
--------------------
The `imageRotator()` method optionally takes an options object that you can use to specify animation timings. 

* **imageTime**: The total amount of time (in milliseconds) that each image will be displayed. The default is 1 second.
* **fadeTime**: The amount of time (in milliseconds) for the crossfade animation. This value should be less than or equal to image time. The default is 0.5 seconds.

Alternatively, if you decide you want *all* new instances of `imageRotator` to use the same timing, then you can set default values. For example:

```javascript  
$.fn.imageRotator.defaults.imageTime = 2000;
```

`imageRotator` Methods
----------------------

###imageRotator(options)###
Creates a new image rotator and binds it to the `<div>` on which this method is called. If invoked more than once on the same jQuery object, will return a single instance; however, if you create a new jQuery object for the same div, you will end up with more than one image rotator.

**parameters**  
*options* (object): Configuration options for the image rotator instance. See "Options and Defaults" for details.

**returns**  
The image rotator instance.

###getOptions()###
Retrieves the options for this image rotator instance.

**parameters**  
(none)

**returns**  
An object containing the configuration parameters for the instance.

###getImages()###
Returns an array of jQuery objects, each wrapping one of the `<img>` tags within the image rotator `<div>`. 

**parameters**  
(none)

**returns**  
An array of jQuery-wrapped `<img>` elements.

###getCurrentIndex()###
Determines the current index (i.e., currently displayed image) within the image rotator.

**parameters**  
(none)

**returns**  
An integer pointing to the index of the image currently being displayed. The value will be -1 if there are no images to display.

###setCurrentIndex(index)###
Sets the control's current index property and displays the image at that index. If the requested index is outside the upper bound of the image array, the last image will be displayed. If the requested image is outside the lower bound of the image array (i.e., negative), then no image will be displayed.

**parameters**  
*index* (integer): The new desired index for the control.

**returns**  
(none)

###start()###
Initiates animation. Once started, changes to the rotator options will not affect the animation unless you stop and then restart the animation.

**parameters**  
(none)

**returns**  
(none)

###stop()###
Stops animation. 

**parameters**  
(none)

**returns**  
(none)

###refresh()###
Refreshes the control's list of images. Call this method if you modify the contents of the image rotator `<div>`. NOTE: it is unsafe to remove an image from the `<div>` while the animation is in progress. It is therefore best practice to call the `stop()` method before modifying the `<div>` contents, and then call `start()` again once you are finished making changes.

**parameters**  
(none)

**returns**  
(none)

License
=======
`imageRotator.js` is free to use under the MIT license, which is included at the top of the un-minified version of the source. If you use the un-minified version, please include the license text as provided. 

I wrote this plugin while working for [Intuit][]'s [QuickBase][] team; Intuit is the copyright holder. 


[jQuery]: http://jquery.com/ 
[Intuit]: http://www.intuit.com/ 
[QuickBase]: http://quickbase.intuit.com/ 
