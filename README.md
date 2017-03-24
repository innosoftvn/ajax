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
    }).before(function(){
        //
    }).then(function(status, data){
        //
    });

#### Options
##### method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
The HTTP method to use for the request.

    ajax.get(String url, Object data)
    ajax.post(String url, Object data)
    ajax.put(String url, Object data)
    ajax.patch(String url, Object data)
    ajax.delete(String url, Object data)

##### before: `function(Object settings)`
A pre-request callback function that can be used to modify the xhr (XMLHTTPRequest) object before it is sent. Use this to set custom headers, etc. The xhr and settings objects are passed as arguments. This is an Ajax Event. Returning `false` in the beforeSend function will cancel the request.
##### then: `function(String status, mixed data)`
A function to be called when the request finishes.
#### Ajax setup
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