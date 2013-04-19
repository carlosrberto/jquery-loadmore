/*
* jQuery loadmore
* http://carlosrberto.github.com/jquery-loadmore/
*
* Copyright (c) 2013 Carlos Roberto Gomes Junior
* http://carlosroberto.name/
* 
* Licensed under a Creative Commons Attribution 3.0 License
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Version: 1.0
*/

(function($){
    var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    var defaults = {
        url: '',
        pageVar: 'page',
        extraVars: {},
        pageNumber: 1,
        maxPages: 10,
        autoAppend: true,
        selector: null,
        buttonSelector: null
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

        that.initButtonEvents();
    }

    LoadMore.prototype = {

        initButtonEvents: function() {
            if ( typeof this.settings.buttonSelector === 'string' ) {
                $('body').on('click', this.settings.buttonSelector, $.proxy(function( event ) {
                    event.preventDefault();
                    this.load();
                }, this));
            }
        },

        setOptions: function( options ) {
            this.settings = $.extend({}, this.settings, options);
        },

        load: function() {
            var that = this, data = {};
            
            if ( that.isLoading || that.settings.pageNumber > that.settings.maxPages ) {
                return;
            }

            that.isLoading = true;
                    
            $.extend(data, that.settings.extraVars);
            data[that.settings.pageVar] = that.settings.pageNumber;
            $.ajax({
                type: "get",
                url: that.settings.url,
                data: data,

                beforeSend:function(){
                    that.container.trigger('beforeload.loadmore');
                },
                
                success: function(data){                     
                    that._processData(data);
                },

                error: function(jqXHR) {
                    that.isLoading = false;
                    that.container.trigger('error.loadmore', [jqXHR]);
                }
            });
        },

        _parseHTML: function( string ) {
            return string.replace(rscript, "");
        },        

        _processData: function(data) {
            var that = this,
                fragment = $('<div>'),
                html;

            fragment.append( this._parseHTML( data ) );
            
            if ( typeof that.settings.selector === 'string' ) {
                html = fragment.find( that.settings.selector ).html();
            } else {
                html = fragment.html();
            }

            if ( that.settings.autoAppend ) {
                that.container.append( html );
            }

            that.settings.pageNumber++;
            that.isLoading = false;
            that.container.trigger('load.loadmore', [ html, that.settings.pageNumber ]);
            
            if ( that.settings.pageNumber > that.settings.maxPages ) {
                that.container.trigger('endpages.loadmore');
            }            
        }
    }

    $.fn.loadmore = function( method ) {
        var args = arguments;
        return this.each(function() {

            if ( !$(this).data('loadMore') ) {
                $(this).data('loadMore', new LoadMore(this, method));
                return;
            }
            
            var api = $(this).data('loadMore');
            
            if ( typeof method === 'string' && method.charAt(0) !== '_' && api[ method ] ) {
                api[ method ].apply( api, Array.prototype.slice.call( args, 1 ) );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.loadmore' );
            }
        });
    };
})(jQuery);