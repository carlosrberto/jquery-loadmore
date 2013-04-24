# jQuery loadmore

A jQuery plugin to add the "load more" functionality

## Options

|   Option   | Default |                                                            Description                                                            |
|------------|---------|-----------------------------------------------------------------------------------------------------------------------------------|
| url        | ''      | The path to load content                                                                                                          |
| pageVar    | 'page'  | Query String passed with the `url` parameter                                                                                      |
| extraVars  | {}      | Extra variables to pass in the query string                                                                                       |
| pageNumber | 1       | Initial page number                                                                                                               |
| maxPages   | 10      | The maximum number of pages generate by pagination in the server side                                                             |
| autoAppend | true    | If `true` content will be appended automatically, if false you can customize the behavior using the `'load.loadmore` plugin event |
| selector   | null    | if passed only the requested selector will be loaded, similar behavior from (`$('el').load('url #selector')`)                     |
|            |         |                                                                                                                                   |

## Events

* `beforeload.loadmore` 
* `error.loadmore`      
* `load.loadmore`       
* `endpages.loadmore`   


## Usage

```javascript
$('#selector').loadmore( options );
```

Loading data:

```javascript
$('#selector').loadmore( 'load' );
```

Add Events

```javascript
$('#selector').on('load.loadmore', function( event, html, page ) {
    $('.log').text('content loaded, page: ' + page);
});
```