jQuery loadmore
===============

A jQuery plugin for ajax pagination

Options
-------

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>url</td>
            <td>'/path/'</td>
        </tr>
        <tr>
            <td>pageNumber</td>
            <td>1</td>
        </tr>
        <tr>
            <td>maxPages</td>
            <td>1000</td>
        </tr>
        <tr>
            <td>autoAppend</td>
            <td>true</td>
        </tr>
        <tr>
            <td>onLoad</td>
            <td>function() {}</td>
        </tr>
        <tr>
            <td>onError</td>
            <td>function() {}</td>
        </tr>             
        <tr>
            <td>onBeforeLoad</td>
            <td>function() {}</td>
        </tr>             
        <tr>
            <td>onBeforeAppend</td>
            <td>function(dataFragment) {}</td>
        </tr>             
        <tr>
            <td>onAfterAppend</td>
            <td>function() {}</td>
        </tr>                  
        <tr>
            <td>onAfterPageIncrement</td>
            <td>function() {}</td>
        </tr>        
        <tr>
            <td>onEndPages</td>
            <td>function() {}</td>
        </tr>
    </tbody>             
</table>

Usage
-----

    $('#container').loadmore(options);

Loading data:

    $('#container').loadmore('load');