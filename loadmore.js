/*
* jQuery loadmore
* http://carlosrberto.github.com/jquery-selectskin/
*
* Copyright (c) 2012 Carlos Roberto Gomes Junior
* http://carlosroberto.name/
* 
* Licensed under a Creative Commons Attribution 3.0 License
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Version: 0.1
*/

(function($){
    var defaults = {
        url: '/path/',
        pageVar: 'page',
        pageNumber: 1,
        maxPages: 1000,
        autoAppend: true,
        onLoad: function() {},
        onError: function() {},
        onBeforeLoad: function() {},
        onBeforeAppend: function(dataFragment) {},
        onAfterAppend: function() {},
        onEndPages: function() {}
    };
    
    function LoadMore(container, options){
        var that = this;
        
        if ( options ) {
            that.settings = $.extend({}, defaults, options);            
        } else {
            that.settings = defaults;
        }

        that.pageNumber = that.settings.pageNumber;
        that.url = that.settings.url;
        that.pageVar = that.settings.pageVar;
        that.container = $(container);
        that.isLoading = false;
    }

    LoadMore.prototype = {
        load: function() {
            var that = this;
            if ( that.isLoading || that.pageNumber > that.settings.maxPages ) {
                return;
            }
            that.isLoading = true;
            var data = {};
            data[that.pageVar] = that.pageNumber;
            $.ajax({
                type: "get",
                url: that.url,
                data: data,
                beforeSend:function(){
                    that.settings.onBeforeLoad.call(that.container);
                },
                success: function(data){
                    if ( that.pageNumber+1 > that.settings.maxPages ) {
                        that.settings.onEndPages.call(this);
                    }                     
                    that._processData(data);
                    that.settings.onLoad.call(that.container);               
                },
                error: function(jqXHR) {
                    that.isLoading = false;
                    that.settings.onError.call(that.container, jqXHR);
                }
            });
        },

        _processData: function(data) {
            var that = this;
            var fragment = $('<div>');
            fragment.append($(data));
            that.settings.onBeforeAppend.call(this, fragment);
            if ( that.settings.autoAppend ) {
                that.container.append(fragment.html());
                that.settings.onAfterAppend.call(this);
            }
            that.pageNumber++;
            that.isLoading = false;
            that.settings.onAfterPageIncrement.call(this);
        }
    };

    $.fn.loadmore = function( method ) {
        return this.each(function() {
            // TODO: find a way to do this better
            if ( !$(this).data('loadMore') ) {
                $(this).data('loadMore', new LoadMore(this, method));
                return;
            }
            
            var api = $(this).data('loadMore');
            
            if ( api[ method ] ) {
                api[ method ].apply( api, Array.prototype.slice.call( arguments, 1 ) );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.loadmore' );
            }
        });
    };


})(jQuery);