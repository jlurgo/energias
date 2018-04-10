$(function(){
    $("#btn_subirMedicion").click(function(){
        $.ajax({
			url: "guardarMedicion",
			type: "POST",
			async: true,
            dataType: "json",
            contentType: "application/json",
			data: JSON.stringify({
				medicion:{
					valor: 10,
					medidor: 10
				}
			})
        });
    });    
});