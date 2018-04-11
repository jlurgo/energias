$(function(){
    $("#btn_subirMedicion").click(function(){
        $.ajax({
			url: "guardarMedicion",
			type: "POST",
			async: true,
            dataType: "json",
            contentType: "application/json",
			data: JSON.stringify({
				"Id-MAC": "12.23.2.12.31.32",
                "mediciones":[
                    {fecha:"1/5/2017 17:15:20", sensor: "Temperatura-IN", valor: 11.27},
                    {fecha:"1/5/2017 17:15:22", sensor: "Temperatura-OUT", valor: 15.27},
                    {fecha:"1/5/2017 17:15:25", sensor: "Caudalimetro", valor: 12.27}                
                ]
			})
        });
    });    
});