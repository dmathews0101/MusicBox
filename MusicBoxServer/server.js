'use strict'

var cors = require('cors')

var DB = require('./dao')

var express = require('express');
var app = express();

app.use(cors())

app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
//---------------------------------------------------------------------

DB.connect()


//All track routes

DB.query("select * from track",[],
    function(results){
        console.log(results.rows)
    }
)


// ROUTES  ------------------------------------------------
//get all users
app.get('/users/login',
    function(request, response){
        response.send("this is the login reply")
    }
)


//get playlist
app.get('/playlist',
    function(request, response){
        DB.query("select * from playlist order by id asc", [],
            function(results){
                var html_string = JSON.stringify(results.rows)
                console.log(html_string)
                response.send(html_string)
            }
        )
    }
)

//get playlist
app.get('/playlisttitle',
    function(request, response){
        DB.query("select distinct(title) from playlist order by id asc", [],
            function(results){
                var html_string = JSON.stringify(results.rows)
                console.log(html_string)
                response.send(html_string)
            }
        )
    }
)

//get track
app.get('/track',
    function(request, response){
        DB.query("select * from track order by id asc", [],
            function(results){
                var html_string = JSON.stringify(results.rows)
                console.log(html_string)
                response.send(html_string)
            }
        )
    }
)

//get 1 track
app.get('/track/:id',
    function(request, response){
            DB.query("select * from track where id=$1 order by id asc", [request.params.id],
            function(results){
                if(results.rowCount==1)
                {
                    var output={}
                    output.message="OK"
                    output.data=results.rows
                    //html_string = JSON.stringify(results.rows)
                    var html_string = JSON.stringify(output)
                    console.log(html_string)
                    // tell the client i'm sending out a javascript object
                    // in the form of a string
                    // response.set('Content-Type', 'application/json')
                    response.set('Content-Type', 'text/html')
                    response.status(200).send(html_string)
                }
                else
                {
                    // tell the client i'm sending out html code
                    console.log("test123")
                    response.set('Content-Type', 'text/html')
                    response.status(404).send("<b>user id "+request.params.id+" not found !</b>")
                }
            }
        )
    }
)

//delete 1 playlist
app.delete('/track/:id',
    function(request, response){
        DB.query("delete from track where id=$1", [request.params.id],
            function(results){
                console.log(results)
                if(results.rowCount != 0)
                {
                    console.log("deletion successful")
                    var output={}
                    output.message="Row Deleted Successfully"
                    output.value="OK"
                    var html_string=JSON.stringify(output)
                    console.log(html_string)
                    console.log(output)
                    response.set('Content-Type', 'application/json')
                    response.status(200).send(html_string)
                }
                else
                {
                    console.log("Row not found .. error")
                    var output={}
                    output.message="Error .. Row Not Found"
                    output.value="Deletion Unsuccessful"
                    var html_string=JSON.stringify(output)
                    console.log(html_string)
                    console.log(output)
                    response.set('Content-Type', 'application/json')
                    response.status(404).send(html_string)
                }
            }
        )
    }
)

//update 1 playlist
app.put('/track/:id',
    function(request, response){
        DB.query("UPDATE track SET id = '22', playlist_id = '42', title = 'kkk', uri='kjjkj', master_id='12' WHERE id=$1", [request.params.id],
            function(results){
                response.send("Record updated")
            }
        )
    }
)

//create/insert 1 new playlist
app.post('/track',
    function(request, response){
        console.log("------------------------------")
        console.log(request.body.playlist_id)
        console.log(request.body.title)
        console.log(request.body.uri)
        console.log(request.body.master_id)
        DB.query("INSERT INTO track ( playlist_id, title, uri, master_id ) VALUES ( $1, $2, $3, $4 )", [request.body.playlist_id, request.body.title, request.body.uri, request.body.master_id],
            function(results){
                response.send("Row inserted successfully : values")
            }
        )
    }
)

// START SERVER ------------------------------------------
app.listen(3001, function(){
    console.log("User authentication service is running")
})