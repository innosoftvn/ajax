<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/7092420/24218424/e3ffebcc-0f75-11e7-886f-6b3ed1929849.png" alt="logo">
</p>

Makes writing Ajax requests with XMLHttpRequest easier

## Installation
Node

    npm install innosoft-ajax --save

## Usage
#### Examples

    ajax.post('/posts', {
        title: 'Ajax is simple'
    }).then(function(status, data){
        //
    });

#### Options
##### method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
The HTTP method to use for the request.

    ajax.get(url, data [, settings])
    ajax.post(url, data [, settings])
    ajax.put(url, data [, settings])
    ajax.patch(url, data [, settings])
    ajax.delete(url, data [,settings])

##### then: `function(textStatus, data)`
A function to be called when the request finishes. The function gets passed two arguments: The `data` response and a string categorizing the status of the request (`info`, `success`, `warning`, `error`).
##### Settings
These are the available config options for making requests.

    ajax.post(url, data, {
        contentType: false,     // default: true
        headers: {
            // custom headers to be sent
        },
        events: {
            // progress on transfers from the server to the client (downloads)
            progress: function(evt) {},
            load: function(evt) {},
            error: function(evt) {},
            abort: function(evt) {}
        },
        uploadEvents: {
            // progress on transfers from the client to the server (uploads)
            progress: function(evt) {},
            load: function(evt) {},
            error: function(evt) {},
            abort: function(evt) {}
        }
    }).then(function(status, data){
        //
    });

##### Ajax setup
Set default values for future Ajax requests. Its use is not recommended.<br>
For example, CSRF Protection in Laravel.

    <meta name="csrf-token" content="{{ csrf_token() }}">
    ....
    ....
    <script type="text/javascript">
	ajax.setup({
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
	});
    </script>

## Browser Support
![chrome](https://cloud.githubusercontent.com/assets/7092420/24220167/e269228c-0f7b-11e7-97ca-ffb3e92134ed.jpg)|![firefox](https://cloud.githubusercontent.com/assets/7092420/24220162/e263c6a2-0f7b-11e7-90b0-7b84048b55c6.jpg)|![safari](https://cloud.githubusercontent.com/assets/7092420/24220166/e267f380-0f7b-11e7-884b-1516507948f2.jpg)|![edge](https://cloud.githubusercontent.com/assets/7092420/24220165/e2653d0c-0f7b-11e7-8ff8-fee09ab30a72.jpg)|![opera](https://cloud.githubusercontent.com/assets/7092420/24220164/e2641288-0f7b-11e7-9a3a-59fd105b267f.jpg)|![ie](https://cloud.githubusercontent.com/assets/7092420/24220163/e263d156-0f7b-11e7-8c89-7dd480fd98fb.jpg)
-------- |---------|---------|---------|---------|---------
Latest ✔ |Latest ✔ |Latest ✔ |Latest ✔ |Latest ✔ |9+✔ 
## License
[MIT](http://opensource.org/licenses/MIT)