//Article Info
$(document).on('click', '#submit', function () {
	$.getJSON("/api/articles", function (data) {
		for (var i = 0; i < data.length; i++) {

			// Display Info
			var nameTitle = data[i].title;
			var srcInfo = data[i].link;
			var dataId = data[i]._id;
			$("#articles").append("<p data-id='" + data[i]._id + "'>" + "<strong>Title: </strong>" + data[i].title + "<br />" + "<strong>Link:</strong> nytimes.com" + data[i].link + "</p>");

			//Notes Button
			var noteInput = $('<button>');
			noteInput.text(' Take Article Notes');
			noteInput.attr('name', nameTitle);
			noteInput.attr('data-id', dataId);
			noteInput.addClass('take-note');
			$('#articles').append(noteInput);

			//Read Notes
			var noteReview = $('<button>');
			noteReview.text('Review Notes');
			noteReview.addClass('getnote');
			$('#articles').append(noteReview);

			//Hide Notes
			var close = $('<button>');
			close.text('Close Notes');
			close.addClass('hide');
			$('#articles').append(close);

			//Delete
			var remove = $('<button>');
			remove.text('Delete Notes');
			remove.addClass('delete');
			$('#articles').append(remove);
		}
	});
});

// Article Notes
$(document).on("click", ".take-note", function () {
	console.log(event.target.name);
	var title = event.target.name;
	//shows notes
	$('#notes').show();
	var titleUpdate = $('.notes-title').text("Title: " + title);
});

//Note info to db
$(document).on("click", "#savenote", function () {
	var dataIdEvent = $('.take-note').attr('data-id');
	console.log(dataIdEvent);

	// ajax call for note update
	$.ajax({
		method: "POST",
		url: "/api/articles/" + dataIdEvent,
		data: {
			body: $('#notes-body').val()
		}
	})

	$('form').trigger('reset');
	$("#notes").hide();
	alert('Notes have been added to the db');
});

$(document).on('click', '.getnote', function () {
	var dataIdEvent = $('.take-note').attr('data-id');
	console.log(dataIdEvent);

	// ajax call for note update
	$.getJSON("/api/articles/" + dataIdEvent, (data) => {
		
		//Notes display
		console.log(data.note.body);
		var note = data.note.body;
		var noteDisplay = $('<p><strong> Notes:</strong> ' + note + '</p>');
		noteDisplay.addClass('notes-output');
		$('#notes-display').append(noteDisplay);
		$('#notes-display').show();
	})
});

//close event
$(document).on('click', '.hide', function () {
	$('#notes-display').hide();
});

$(document).on("click", ".delete", function () {
	var dataIdEvent = $('.take-note').attr('data-id');
	console.log(dataIdEvent);

	// ajax call for note update
	$.ajax({
		method: "PUT",
		url: "/api/articles/" + dataIdEvent
	}).then((data) => {
		console.log(data);
	});
	$('#notes-display').append("THIS NOTE HAS BEEN DELETED FROM THE DATABASE");
});