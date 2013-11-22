// Copyright (c) 2013 Intuit, Inc
// Author: Matthew Eagar (matthew_eagar@intuit.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function($) {
    $.fn.imageRotator = function (options) {
        //----------------------------------------------------------------------
        //* Poor man's singleton 
        //----------------------------------------------------------------------
        if (this.getImages) {
            return this;
        }
    
        //----------------------------------------------------------------------
        //* Private variables 
        //----------------------------------------------------------------------
        var _options = $.extend({}, $.fn.imageRotator.defaults, options);
        if (_options.imageTime < 100) {
            _options.imageTime = 100;
        }
        var _images = null;
        var _imageElements = null;
        var _currentIndex = 0;
        var _animationInterval = null;
        var _waitTimeout = null;
        
        this.css("position", "relative");
        
        //----------------------------------------------------------------------
        //* Private methods 
        //----------------------------------------------------------------------
        function crossFadeImages(fadeTime) {
            if (_currentIndex >= 0) {
                var currentImage = _images[_currentIndex];
                currentImage.fadeOut(fadeTime);
            }

            var nextIndex = _currentIndex + 1;
            if (_currentIndex >= _images.length - 1) {
                nextIndex = 0;
            }
            var nextImage = _images[nextIndex];
            nextImage.fadeIn(fadeTime, function () {
                _currentIndex = nextIndex;
            });
        }
        
        //----------------------------------------------------------------------
        //* Public properties 
        //----------------------------------------------------------------------
        this.getOptions = function () {
            return _options;
        };
        
        this.getImages = function () {
            return _images;
        }
        
        this.getCurrentIndex = function () {
            return _currentIndex;
        }
        
        this.setCurrentIndex = function (index) {
            _imageElements.hide();
            
            if (index >= _images.length) {
                index = _images.length - 1;
            }
            
            if (index >= 0) {
                _images[index].show();
            }
            _currentIndex = index;
        }
        
        //----------------------------------------------------------------------
        //* Public methods
        //----------------------------------------------------------------------
        this.start = function () {
            if (_animationInterval) {
                // already running
            }
            else if (_images.length > 1) {
                _animationInterval = setInterval(function () {
                    var waitTime = _options.imageTime - _options.fadeTime;
                    if (waitTime < 0) {
                        crossFadeImages(_options.imageTime - 90);
                    }
                    else {
                        _waitTimeout = setTimeout(function () {
                            _waitTimeout = null;
                            crossFadeImages(_options.fadeTime);
                        }, waitTime);
                    }
                }, _options.imageTime);
            }
        };
        
        this.stop = function () {
            if (_animationInterval) {
                if (_waitTimeout) {
                    clearTimeout(_waitTimeout);
                    _waitTimeout = null;
                }
            
                clearInterval(_animationInterval);
                _animationInterval = null;
                
                if (_currentIndex >= 0) {
                    _images[_currentIndex].show();
                }
            }
        };
        
        this.refresh = function () {
            _images = [];
            _imageElements = this.children("img");
            _imageElements.each(function (index) {
                _images.push($(this));
            });
            
            this.setCurrentIndex(_currentIndex);
        }
        
        this.refresh();

        return this;
    };
    
    //--------------------------------------------------------------------------
    //* Class defaults
    //--------------------------------------------------------------------------
    $.fn.imageRotator.defaults = {
        imageTime: 1000,
        fadeTime: 500
    };
}(jQuery));