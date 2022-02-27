$(document).ready(function(){  
   // var socket = io.connect("http://localhost:3000");
	var socket = io.connect("http://40cf-201-17-210-168.ngrok.io/");
    var ready = false;

    $("#submit").submit(function (e) {		
			var name = $("#nickname").val();
			if(name.length > 0){
				e.preventDefault();
				$("#nick").fadeOut();
				$("#chat").fadeIn();
				var time = new Date();
				$("#name").html(name);
				$("#time").html('Primeiro login: ' + time.getHours() + ':' + time.getMinutes());
	
				ready = true;
				socket.emit("join", name);
			}
		});

	$("#textarea").keypress(function(e){
        if(e.which == 13) {
        	var text = $("#textarea").val();
			if(text.length > 0){
				$("#textarea").val('');
				var time = new Date();
				$(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
				
				socket.emit("send", text);
				// automatically scroll down
				document.getElementById('bottom').scrollIntoView();				
			}
        }
    });


    socket.on("update", function(msg) {
    	if (ready) {
    		$('.chat').append('<li class="info" style="margin-top: -10px;">' + msg + '</li>')
    	}
    }); 

    socket.on("chat", function(client,msg) {
    	if (ready) {
				var time = new Date();
				$(".chat").append('<li class="field"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
				
    	}
    });
});

