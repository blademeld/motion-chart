function init(){
	$( "div.leftmenu" ).accordion({
		collapsible:true,
		active:false
	});
	$( "div.content" ).tabs();

	//use AJAX to fetch country list
	//format should be name, id(ISO), continent, GDP[], population[]
	var countries = [
					{id:"AD", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AE", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AF", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AG", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AI", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AL", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AM", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AO", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AR", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AS", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AT", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AU", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AW", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AX", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"AZ", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BA", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BB", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BD", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BE", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BF", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BG", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BH", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BI", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"BJ", name:'ONE', cont:'africa', gdp:{}, pop:{}},
					{id:"DM", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"DO", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"DZ", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"EC", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"EG", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"EE", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"EH", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"ER", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"ES", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"ET", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"FI", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"FJ", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"FK", name:'ONE', cont:'asia', gdp:{}, pop:{}},
					{id:"GN", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GO", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GP", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GQ", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GR", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GS", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GT", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GU", name:'ONE', cont:'oceania', gdp:{}, pop:{}},
					{id:"GW", name:'ONE', cont:'nAmerica', gdp:{}, pop:{}},
					{id:"GY", name:'ONE', cont:'nAmerica', gdp:{}, pop:{}},
					{id:"HK", name:'ONE', cont:'nAmerica', gdp:{}, pop:{}},
					{id:"HM", name:'ONE', cont:'nAmerica', gdp:{}, pop:{}},
					{id:"HN", name:'ONE', cont:'nAmerica', gdp:{}, pop:{}},
					{id:"HR", name:'ONE', cont:'nAmerica', gdp:{}, pop:{}},
					{id:"HT", name:'ONE', cont:'nAmerica', gdp:{}, pop:{}},
					{id:"JU", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KE", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KG", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KH", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KI", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KM", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KN", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KP", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KR", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"XK", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KW", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KY", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"KZ", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"LA", name:'ONE', cont:'sAmerica', gdp:{}, pop:{}},
					{id:"LB", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"LC", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"LI", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"LK", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"LR", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"MQ", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"MR", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"MS", name:'ONE', cont:'europe', gdp:{}, pop:{}},
					{id:"MT", name:'ONE', cont:'europe', gdp:{}, pop:{}}
					]
					
	for (var key in countries){
		var country = countries[key];
		var input = $('<input>');
		input.attr({
			type:'checkbox',
			id:country['id'],
			value:country['id']
		});
		$('#'+country['cont']).append(input);
		$('#'+country['cont']).append(country['name'] + '<br/>');
	}
}

function obj_place(obj, rx, ry){
	obj.css({
		top:rx,
		left:ry
	});
}

function onContinentClick(continent){
	//minimap.continent.zoom
	//accordion.continent.open
	//uncheck all
	//check all in accordion.continent
}