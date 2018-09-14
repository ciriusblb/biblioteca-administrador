
var pdfMakePrinter = require('pdfmake');

var dataPDF={};

dataPDF.createPDFBinary =function(pdfDoc,callback){
	let data=pdfDoc.data;
	console.log(data);
	let datos=pdfDoc;
	var border={
			hLineWidth: function (i, node) {
				return ( (i === 0 || i === node.table.body.length )? 1 : 1 &&( i!=0 || i!=node.table.body.length )? 0 : 0 );
			},
			vLineWidth: function (i, node) {
				return (i === 0 || i === node.table.widths.length ? 1: 1 && i!=0 || i!=node.table.widths.length ? 0 : 0 );
			},
			hLineColor: function (i, node) {
				return (i === 0 || i === node.table.body.length) ? '#DCDCDC' : '#DCDCDC';
			},
			vLineColor: function (i, node) {
				return (i === 0 || i === node.table.widths.length) ? '#DCDCDC' : '#DCDCDC';
			}
	};

	var contenidos_r=[];
	var titulo=[];

	switch(datos.identificar){
		case'reservas': 
			console.log("reservas");
			titulo.push([{ text:'Reservas de Usuarios',colSpan:5,fillColor: '#555',color:'#fff', style:['negrita','fs11','centrado','margin_titulo','campo_total']},{},{},{},{}]);
			var usuarios = [];
			
			for (var i = 0; i < data.length; i++) {var insertar = false;
				for (var j = 0; j < usuarios.length; j++) {
					if(data[i].codigo_usuario==usuarios[j].codigo_usuario){
						insertar = true;
					}
				}
				if(insertar==false){
					usuarios.push({codigo_usuario:data[i].codigo_usuario,nombre_usuario:data[i].nombre_usuario,apellido_usuario:data[i].apellido_usuario});
				}
			}
			for (var i = 0; i < usuarios.length; i++) {
				let tabla =[];
				tabla.push([{text:'Estudiante ',style:['negrita','izquierda'],fontSize:11,colSpan:4},{},{},{}]);
				tabla.push([{text:'Apellidos y Nombres: '+usuarios[i].apellido_usuario+' '+usuarios[i].nombre_usuario,style:['negrita','izquierda'],fillColor:'#F3F3F3',colSpan:2},{},{text:'Código: '+usuarios[i].codigo_usuario,style:['negrita','derecha'],fillColor:'#F3F3F3',colSpan:2},{}]);
				tabla.push([{text:'Libros Reservados ',style:['negrita','izquierda'],fontSize:11,colSpan:4},{},{},{}]);
				tabla.push([{text:'Código',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Título',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Autor',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Fecha de reserva',style:['negrita','centrado'],fillColor:'#F3F3F3'}]);
				for (var j = 0; j < data.length; j++) {
					if(usuarios[i].codigo_usuario==data[j].codigo_usuario){
						tabla.push([{text:data[j].codigo_libro,style:['centrado']},{text:data[j].titulo_l,style:['izquierda']},{text:data[j].autor_l,style:['izquierda']},{text:data[j].fecha_inicio,style:['centrado']}]);
					}
				}
				contenidos_r.push({
						style: 'tableExample2',
						color: '#2A333C',
						table: {
							widths: [60,150,150,100],
							headerRows: 1,
							body: tabla
								
						},layout:border
					})
			}
		break;
		case'libros': 
			console.log("libros");
			titulo.push([{ text:'Libros del Sistema',colSpan:5,fillColor: '#555',color:'#fff', style:['negrita','fs11','centrado','margin_titulo','campo_total']},{},{},{},{}]);
			for (var i = 0; i < data.length; i++) {
				let tabla=[];
				if(data[i].value && data[i].array.length>0){
					tabla.push([{text:'Libros ingresados en el mes de '+data[i].mes,style:['negrita','centrado'],fontSize:11,colSpan:4},{},{},{}]);
					tabla.push([{text:'Código Libro',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Título',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Autor',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Cantidad',style:['negrita','centrado'],fillColor:'#F3F3F3'}]);
					for (var j = 0; j < data[i].array.length; j++) {
						if(j%2==0){
						tabla.push([{text:data[i].array[j].codigo_libro,style:['centrado']},{text:data[i].array[j].titulo_l,style:['izquierda']},{text:data[i].array[j].autor_l,style:['izquierda']},{text:data[i].array[j].cantidad_l,style:['centrado']}]);
						}else{
						tabla.push([{text:data[i].array[j].codigo_libro,style:['centrado'],fillColor:'#F3F3F3'},{text:data[i].array[j].titulo_l,style:['izquierda'],fillColor:'#F3F3F3'},{text:data[i].array[j].autor_l,style:['izquierda'],fillColor:'#F3F3F3'},{text:data[i].array[j].cantidad_l,style:['centrado'],fillColor:'#F3F3F3'}]);
						}	
					}
					contenidos_r.push({
						style: 'tableExample2',
						color: '#2A333C',
						table: {
							widths: [100,150,150,60],
							headerRows: 1,
							body: tabla
								
						},layout:border
					})	
				}
			}
		break;
		case 'esperas':
			console.log("esperas");
			var usuarios = [];
			titulo.push([{ text:'Libros esperados por Usuarios',colSpan:5,fillColor: '#555',color:'#fff', style:['negrita','fs11','centrado','margin_titulo','campo_total']},{},{},{},{}]);
			
			for (var i = 0; i < data.length; i++) {
				var insertar = false;
				for (var j = 0; j < usuarios.length; j++) {
					if(data[i].codigo_usuario==usuarios[j].codigo_usuario){
						insertar = true;
					}
				}
				if(insertar==false){
					usuarios.push({codigo_usuario:data[i].codigo_usuario,nombre_usuario:data[i].nombre_usuario,apellido_usuario:data[i].apellido_usuario});
				}
			}
			for (var i = 0; i < usuarios.length; i++) {
				let tabla =[];
				tabla.push([{text:'Estudiante ',style:['negrita','izquierda'],fontSize:11,colSpan:3},{},{}]);
				tabla.push([{text:'Apellidos y Nombres: '+usuarios[i].apellido_usuario+' '+usuarios[i].nombre_usuario,style:['negrita','izquierda'],fillColor:'#F3F3F3',colSpan:2},{},{text:'Código: '+usuarios[i].codigo_usuario,style:['negrita','derecha'],fillColor:'#F3F3F3'}]);
				tabla.push([{text:'Esperando los siguientes Libros ',style:['negrita','izquierda'],fontSize:11,colSpan:3},{},{}]);
				tabla.push([{text:'Código',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Título',style:['negrita','izquierda'],fillColor:'#F3F3F3'},{text:'Autor',style:['negrita','izquierda'],fillColor:'#F3F3F3'}]);
				for (var j = 0; j < data.length; j++) {
					if(usuarios[i].codigo_usuario==data[j].codigo_usuario){
						tabla.push([{text:data[j].codigo_libro,style:['centrado']},{text:data[j].titulo_l,style:['izquierda']},{text:data[j].autor_l,style:['izquierda']}]);
					}
				}
				contenidos_r.push({
						style: 'tableExample2',
						color: '#2A333C',
						table: {
							widths: [60,200,200],
							headerRows: 1,
							body: tabla
								
						},layout:border
					})
			}
		break;
		case 'penalizados':
			console.log("penalizados");
			titulo.push([{ text:'Usuarios Penalizados',colSpan:5,fillColor: '#555',color:'#fff', style:['negrita','fs11','centrado','margin_titulo','campo_total']},{},{},{},{}]);
			let tabla =[];
			tabla.push([{text:'Estudiantes Penalizados ',style:['negrita','izquierda'],fontSize:11,colSpan:4},{},{},{}]);
			tabla.push([{text:'Código',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Apellidos y Nombres',style:['negrita','izquierda'],fillColor:'#F3F3F3'},{text:'DNI',style:['negrita','izquierda'],fillColor:'#F3F3F3'},{text:'Carrera Profesional',style:['negrita','izquierda'],fillColor:'#F3F3F3'}]);
			for (var j = 0; j < data.length; j++) {
				tabla.push([{text:data[j].codigo_usuario,style:['centrado']},{text:data[j].apellido_usuario+' '+data[j].nombre_usuario,style:['izquierda']},{text:data[j].DNI_usuario,style:['izquierda']},{text:data[j].escuela_usuario,style:['izquierda']}]);
			}
			contenidos_r.push({
					style: 'tableExample2',
					color: '#2A333C',
					table: {
						widths: [60,140,100,160],
						headerRows: 1,
						body: tabla
							
					},layout:border
				})
		break;
		case 'prestamos':
			console.log("prestamos");
			titulo.push([{ text:'Prestamos de Usuarios',colSpan:5,fillColor: '#555',color:'#fff', style:['negrita','fs11','centrado','margin_titulo','campo_total']},{},{},{},{}]);
			var usuarios = [];
			
			for (var i = 0; i < data.length; i++) {
				var insertar = false;
				for (var j = 0; j < usuarios.length; j++) {
					if(data[i].codigo_usuario==usuarios[j].codigo_usuario){
						insertar = true;
					}
				}
				if(insertar==false){
					usuarios.push({codigo_usuario:data[i].codigo_usuario,nombre_usuario:data[i].nombre_usuario,apellido_usuario:data[i].apellido_usuario});
				}
			}
			for (var i = 0; i < usuarios.length; i++) {
				let tabla =[];
				tabla.push([{text:'Estudiante ',style:['negrita','izquierda'],fontSize:11,colSpan:4},{},{},{}]);
				tabla.push([{text:'Apellidos y Nombres: '+usuarios[i].apellido_usuario+' '+usuarios[i].nombre_usuario,style:['negrita','izquierda'],fillColor:'#F3F3F3',colSpan:2},{},{text:'Código: '+usuarios[i].codigo_usuario,style:['negrita','derecha'],fillColor:'#F3F3F3',colSpan:2},{}]);
				tabla.push([{text:'Libros Prestados ',style:['negrita','izquierda'],fontSize:11,colSpan:4},{},{},{}]);
				tabla.push([{text:'Código',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Título',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Autor',style:['negrita','centrado'],fillColor:'#F3F3F3'},{text:'Fecha de prestamo',style:['negrita','centrado'],fillColor:'#F3F3F3'}]);
				for (var j = 0; j < data.length; j++) {
					if(usuarios[i].codigo_usuario==data[j].codigo_usuario){
						tabla.push([{text:data[j].codigo_libro,style:['centrado']},{text:data[j].titulo_l,style:['izquierda']},{text:data[j].autor_l,style:['izquierda']},{text:data[j].fecha_prestada,style:['centrado']}]);
					}
				}
				contenidos_r.push({
						style: 'tableExample2',
						color: '#2A333C',
						table: {
							widths: [60,150,150,100],
							headerRows: 1,
							body: tabla
								
						},layout:border
					})
			}
		break;
	}

	var cuerpo=[];
	for (var i = 0; i < contenidos_r.length; i++) {
		cuerpo.push(contenidos_r[i]);
	}



	let firmas = [];
	firmas.push(
			{
				width: 70,style:'centrado', margin:[1,1,1,1],
				table: {
					headerRows: 1,widths:'100%',			
					body: [	
						[{image: './apps/reporte/pdf/linea.jpg',lineWidth: 2,width: 100,style:'centrado', margin:[1,50,1,1]}],		
						[ 'Biblioteca Central'],
						[ 'Adm: Diestro'],
					]
				},
				layout: 'noBorders'
			},
			{
				width: 70,style:'centrado', margin:[1,1,1,1],
				table: {
					headerRows: 1,widths:'100%',			
					body: [	
						[{image: './apps/reporte/pdf/linea.jpg',lineWidth: 2,width: 100,style:'centrado', margin:[1,50,1,1]}],		
						[ ''],
						[ ''],
					]
				},
				layout: 'noBorders'
			}
		);

	let tiempo=[];
	for (var i = 0; i < 2; i++) {
	    tiempo.push([ datos.tiempo[i].text]);       
	}
	firmas.push({
		fontSize:8,margin:[1,50,1,1],
		table: {
			headerRows: 1,
			body: tiempo			
		},
		layout: 'noBorders'
	});

	//Reportess 

	var dd = {
		header: function() {
			return [{
				style: 'tableHeader',
				table:{
					widths: ['15%','70%','15%'],
					headerRows: 1,
					body:[	
						[
							[{image: './apps/reporte/pdf/logo.png',width: 50,style:'centrado'}],
							[{
								table: {
									widths: '100%',
									body: [
									[{ text: 'AÑO OFICIAL DE BUEN SERVICIO AL CIUDADANO', style:['fs12','centrado']}],
									[{ text: 'UNIVERSIDAD NACIONAL AMAZÓNICA DE MADRE DE DIOS', style:['fs12','centrado']}],
									[{ text: 'BIBLIOTECA CENTRAL', style:['fs12','centrado']}]
									]
								},layout: 'noBorders'
							}],
							[{image: './apps/reporte/pdf/logo.png',width: 50,style:'centrado'}]
						],
					],
				},layout: 'noBorders'
			},
			{
				style: 'tableSubHeader',
				color: '#2A333C',
				table: {
					widths: [ '20%','20%','20%','20%','20%'],
					headerRows: 1,
					body:titulo  
				},layout: 'noBorders'
			}];
		},
		content: cuerpo,
		footer: function(){
			return [
				{image: './apps/reporte/pdf/fajois.png',style:['centrado'], margin:[1,1,1,1]},
				{
					style: 'tableFooter',
					table: {
						widths: ['45%','45%','45%','10%'],
						headerRows: 1,
						body:[
							firmas
						]	
					},layout: 'noBorders'
				},
			]
		},	


			pageMargins: [40, 150,100,150],
			//['izquierda','arriba','derecha','abaj0']
			
			styles: {
				header: {
					fillColor:'#F3F3F3',
					margin: [0, 0, 0, 10],
				},
				tableExample: {
					margin: [0, 0, 0, 5],
					bold:true
				},
				tableSubHeader:{
					margin: [40, 0, 40, 0],
				},
				tableFooter:{
					margin: [40, 0, 40, 40],
				},
				tableExample2: {
					margin: [8, 0, 0, 5],
				},
				tableHeader: {
					bold: 'black',
					margin: [40, 35, 40, 0]
				},
				margin_right:{
					margin: [40,0, 0, 0],
				},
				margin_header:{
					margin: [0,20,0,0],
				},
				negrita:{
					bold:true,
				},
				// TAMAÑO DE FUENTES
				fs7:{fontSize:7,},fs8:{fontSize:8,},fs9:{fontSize:9,},fs10:{fontSize:10,},fs11:{fontSize:11,},fs12:{fontSize:12,},
				fs13:{fontSize:13,},fs14:{fontSize:14,},fs15:{fontSize:15,},fs16:{fontSize:16,},fs17:{fontSize:17,},fs18:{fontSize:18,},
				//ALINEACION DE TEXTO
				centrado:{alignment:'center',},derecha:{alignment:'right',},izquierda:{alignment:'left',},

				campo_total:{
					width:'100%',	
				},
				margin_titulo:{
					margin: [0, 5, 0, 5],
				}
			},
			defaultStyle: {
				columnGap: 1,
				fontSize:10,
			},pageSize: 'A4',pageOrientation: 'portrait',	
		}
	//portrait  vertical
	//landscape horizontal

		pdfDoc = dd;
		var fontDescriptors = {
			Roboto: {
	            normal: './apps/reporte/pdf/fonts/Roboto-Regular.ttf',
	            bold: './apps/reporte/pdf/fonts/GOTHIC.ttf',
	            italics: './apps/reporte/pdf/fonts/Roboto-Italic.ttf',
	            bolditalics: './apps/reporte/pdf/fonts/Roboto-Medium.ttf'
	        }
		};


		    	
		var printer = new pdfMakePrinter(fontDescriptors);
		
		var doc = printer.createPdfKitDocument(pdfDoc);
		var chunks = [];
		    	

		doc.on('data', function (chunk) {
			chunks.push(chunk);
		});
		doc.on('end', function () {
			result = Buffer.concat(chunks);
			callback(result);
		});


		doc.end();

}

module.exports=dataPDF;