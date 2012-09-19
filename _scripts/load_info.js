var contact_details;
var ex_newtab;
var exercise_box_width
var exercise_box_height;
var movie_player_width;
var movie_player_height;
var movie_box_width;
var movie_box_height;
var table_width;
var isNumericVars;

function setNumericVars(){//note: the box in which videos/exercises opens is called a colorbox, after the js plugin
window.contact_details = "info@numeric.org";

window.ex_newtab=true; //open exercise in a new tab if true, otherwise open a colorbox if false
//size of the exercises colorbox if you choose to have one
window.exercise_box_width="800";
window.exercise_box_height="600";

//size of flash player in video colorbox
window.movie_player_width="640";
window.movie_player_height="480";
//size of video colorbox
window.movie_box_width="645";
window.movie_box_height="485";

//width of main pages table
window.table_width="700";
window.isNumericVars='true';
}

function makevid(video_url){
	html=get_flash_content(video_url,movie_player_width,movie_player_height);
	$('.content').append(html);
	}

function get_box_numbers(n){
	var m=n/3.0;
	var b1=Math.ceil(m);
	var b2=Math.round(2*m);
	var b3=Math.floor(3*m);
	return [b1,b2,b3];
}

function get_flash_content(video_url,width,height){
	video_url=video_url;//path relative to index.html, don't include the extension (.flv)...
	//user defined settings, must all be strings.
	//paths are all relative to index.html
	path_flv_progressive="FLVPlayer_Progressive.swf";//Give the path relative to index.html.
	path_expressinstall="Scripts/expressInstall.swf";//path to expressInstall.swf
	path_swfobject_modified_js="Scripts/swfobject_modified.js";
	path_skinName='Clear_Skin_2';//full path to the skin we use.
	autoPlay='true';
	autoRewind='false';
	quality='high';
	//computed settings based on above
	var codebase;
	codebase = "";
	var flv_progressive_filename
	flv_progressive_filename=path_flv_progressive;//if there are no '/', then this is true
	if (path_flv_progressive.indexOf('/')>-1)
	{
		path_list=path_flv_progressive.split('/');
		flv_progressive_filename=path_list[path_list.length-1];
		for (var i = 0; i<path_list.length-1; i++)
		{
			codebase+=path_list[i]+'/';
		}
	}
	html='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n';
	html+='<html xmlns="http://www.w3.org/1999/xhtml">\n';
	html+='<head>\n';
	html+='<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n';
	html+='<title>Video</title>\n';
	html+='<script src="'+path_swfobject_modified_js+'" type="text/javascript"></script>\n';
	html+='</head>\n';

	html+='<body>\n';
	html+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+width+'" height="'+height+'" id="FLVPlayer">\n';
	html+='<param name="movie" value="'+path_flv_progressive+'" />\n';
	html+='<param name="quality" value="'+quality+'" />\n';
	html+='<param name="wmode" value="opaque" />\n';
	html+='<param name="scale" value="noscale" />\n';
	html+='<param name="salign" value="lt" />\n';
	html+='<param name="FlashVars" value="&amp;MM_ComponentVersion=1&amp;skinName='+path_skinName+'&amp;streamName='+video_url+'&amp;autoPlay='+autoPlay+'&amp;autoRewind='+autoRewind+'" />\n';
	html+='<param name="swfversion" value="8,0,0,0" />\n';
	html+='<!-- This param tag prompts users with Flash Player 6.0 r65 and higher to download the latest version of Flash Player. Delete it if you don’t want users to see the prompt. -->\n';
	html+='<param name="expressinstall" value="'+path_expressinstall+'" />\n';

	html+='<!-- Next object tag is for non-IE browsers. So hide it from IE using IECC. -->\n';
	html+='<!--[if !IE]>-->\n';
	html+='<object codebase="'+codebase+'" type="application/x-shockwave-flash" data="'+flv_progressive_filename+'" width="'+width+'" height="'+height+'">\n';
	html+='<!--<![endif]-->\n';
	html+='<param name="quality" value="'+quality+'" />\n';
	html+='<param name="wmode" value="opaque" />\n';
	html+='<param name="scale" value="noscale" />\n';
	html+='<param name="salign" value="lt" />\n';
	html+='<param name="FlashVars" value="&amp;MM_ComponentVersion=1&amp;skinName='+path_skinName+'&amp;streamName='+video_url+'&amp;autoPlay='+autoPlay+'&amp;autoRewind='+autoRewind+'" />\n';
	html+='<param name="swfversion" value="8,0,0,0" />\n';
	html+='<param name="expressinstall" value="'+path_expressinstall+'" />\n';
	html+='<!-- The browser displays the following alternative content for users with Flash Player 6.0 and older. -->\n';
	html+='<div>\n';
	html+='<h4>Content on this page requires a newer version of Adobe Flash Player.</h4>\n';
	html+='<p><a href="http://www.adobe.com/go/getflashplayer"><img src="images/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>\n';
	html+='</div>\n';
	html+='<!--[if !IE]>-->\n';
	html+='</object>\n';
	html+='<!--<![endif]-->\n';
	html+='</object>\n';
	html+='<script type="text/javascript">\n';
	html+='swfobject.registerObject("FLVPlayer");\n';
	html+='</script>\n';
	html+='</body>\n</html>';
	return html
}

function make_html_for_exercise(video){//returns null if there's no exercise
	ex_html = "<br />";
	ex_list = video.childNodes;
	for (ex_key in ex_list){
		this_ex = ex_list[ex_key];
		if (this_ex.constructor == Element){
			ex_url = this_ex.getAttribute("url");
			ex_title = this_ex.getAttribute("title");
			ex_html="	---------	<a href=_scripts/\""+ex_url+"\" target=\"_blank\">"+ex_title+"</a><br />";
		}
	}
	return ex_html;
}

function make_html_for_video(video){
	video_url = video.getAttribute("url");
	video_title = video.getAttribute("title");
	video_html = "<a href = _scripts/\""+video_url+"\">"+video_title+"</a>";
	ex_html = make_html_for_exercise(video);
	return video_html+ex_html;
}

function make_html_for_topic(topic){
	topic_html="<h3>"+topic.getAttribute("title")+"</h3><br />";
	//now we get the videos
	video_list = topic.childNodes;
	for (video_key in video_list){
		this_video = video_list[video_key];
		//alert("...");
		if (this_video.constructor == Element){
			//alert("Element");
			video_html = make_html_for_video(this_video);
			topic_html+=video_html;
		}
	}
	return topic_html;
}

function contentDisp(){
	
}
function load_jwplayer_html(){
	x = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
	x+='\n<html xmlns="http://www.w3.org/1999/xhtml">';
	x+='\n\t<head>\n\t\t<script type="text/javascript" src="_scripts/jwplayer.js"></script>\n\t</head>';
	x+='\n\t<body>';
	x+='\n\t\t<div id="container">Loading the player ...</div>';
	x+='\n\t</body>';
	x+='\n</html>';
	return x;
}


function processGrade(xmlurl){
	$.ajax({
		url : xmlurl,
		dataType: "xml",
		success: function(xml) {
			content_html='<div class=\"video-list-container\">';
			num_topics = $(xml).find('topic').length;
			$(xml).find('term').each(function(){//for each term
				term_name = $(this).attr('term');
				content_html+='<div class=\"video-term-title\"><h1>Term '+term_name+'</h1></div>';
				
				$(this).find('topic').each(function(){//for each topic
					num_videos=$(this).find('video').length;
					topic_name = $(this).attr('title');
					content_html+='<div class=\"video-topic-title\"><h2>'+topic_name+'</h2></div>';
					content_html+='<ul class=\"video-list\">';
					var i = 1;
					
					$(this).find('video').each(function(){//for each video in the current topic
						num_exercises=$(this).find('exercise').length;
						video_group=$(this).attr('url').split('/')[1];
						if (String(video_group).indexOf('index.html')==-1){//disinclude videos not on disk
							video_title = $(this).attr('title');
							video_url = $(this).attr('url').replace('.flv','.html').replace('videos/','html/');
							video_optional = $(this).attr('optional');
							exercise_title = $(this).find('exercise').attr('title');
							exercise_url = $(this).find('exercise').attr('url');
							
							/*Exercises*/

							ex_html_special='';
							if (ex_newtab){//make exercises open in new tab
								ex_html_special += 'target="_blank"';
							}
							else{//open in colorbox 
								ex_html_special += 'onClick="$.colorbox({inline:true, iframe:true, rel:\'aa\', title: \'Exercise: '+exercise_title+'\', innerWidth:'+exercise_box_width+', innerHeight:'+exercise_box_height+', href:\''+exercise_url+'\'}); return false;"';
							}
							//now check if there's an exercise associated with this video...
							if( exercise_title && exercise_url ){
							ex_html='<span class="exercise"><a href="'+exercise_url+'" title="Exercise: '+exercise_title+'" class=\"exercise-image\" alt="Exercise: '+exercise_title+'" '+ex_html_special+'></a></span>';
							}
							else{
							ex_html='<span class="exercise"><a href="no_exercise.html" title="No Exercise" alt="No Exercise" class=\"no-exercise-image\" '+((ex_newtab)?'target="_blank"':'onClick="$.colorbox({inline:true, iframe:true, rel:\'aa\', title: \'Exercise: '+exercise_title+'\', innerWidth:'+exercise_box_width+', innerHeight:'+exercise_box_height+', href:\'no_exercise.html\'}); return false;"></a></span>');
							}
							
							/*Videos*/
							//define columns
							video_col='';
							x=Math.ceil(num_videos/3); //to style columns
							if (i <= x)
								{video_col="col0 ";}
							else if (i <= 2*x)
								{video_col="col1 ";}
							else 
								{video_col="col2 ";}
								
							if (video_optional==="1")
							{video_optional='v_optional';}//content_html+='<ul class = \"optional\"><li>';}
							else
							{video_optional='v_compulsory';}//content_html+='<ul class = \"compulsory\"><li>';}
							
							//make_colorbox specifies the onclick value required for playing the video in a colorbox
							//make_colorbox='$.colorbox({rel: \''+video_group+'\', title: \''+video_title+'\', innerWidth: '+movie_box_width+', innerHeight: '+movie_box_height+', html: get_flash_content(\''+video_url.replace('html/','videos/').replace('.html','')+'\','+movie_player_width+','+movie_player_height+')}); return false;';
							make_colorbox='col(this); return false';
							content_html+='<li class=\"'+video_col+'\" >';
							//Exercise html added in here
							content_html+=ex_html;
							content_html+='<span class=\"video\"><a title=\"'+video_title+'\" class=\"'+video_optional+'\" onClick=\"'+make_colorbox+'\" href=\"'+video_url+'\" rel=\"'+video_group+'\">'+video_title+'</a></span>';
							content_html+='</li>';
						i++;
						}//disinclude videos not on disk
					});//end  $(this).find('video').each
					content_html+='</ul>';//video-list ul
				});//end foreach topic
				content_html+='</div>';//
			});//end foreach term
			content_html+='</div>';//video-list-container div
		$('.content').html(content_html);
		}//end success
	});//end ajax
}//end function

function makeColorbox(obj,video_url){
	v='$.colorbox({rel: \''+obj.rel+'\',title: \''+obj.title+'\', innerWidth: w+2, innerHeight: h+2, html: '+load_jwplayer_html().replace('\n',' ')+',onComplete: function(){jwplayer(\'container\').setup({flashplayer: \'_scripts/player.swf\',file: \''+video_url.replace('html/','videos/').replace('.html','.flv')+'\',height: '+'555'+',width: '+'555'+' })}}); return false;';
	return v;
}


function load_info(topic_object){
	var topic_name=topic_object.getAttribute('name');
	if (typeof window.current_topic === 'undefined')
		window.current_topic='';
	if (topic_name==window.current_topic){
		//alert('already clicked that.');
		return;}
	/*
	//First we get our xml parsing object
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari, most browsers...
		xmlhttp=new XMLHttpRequest();
	}
	else{// code for IE5/6
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}*/
	switch(topic_name){//Figure out which info to update with:
		case "Basics":
			$.ajax({
				url : "xml/basic.xml",
				dataType: "xml",
				success: function(xml) {
					content_html='<div class=\"video-list-container\">';
					num_topics = $(xml).find('topic').length;
					$(xml).find('topic').each(function(){//for each topic
						num_videos=$(this).find('video').length;
						topic_name = $(this).attr('title');
						content_html+='<div class=\"video-topic-title\"><h2>'+topic_name+'</h2></div>';
						content_html+='<ul class=\"video-list\">';
						var i = 1;
						$(this).find('video').each(function(){//for each video in the current topic
							num_exercises=$(this).find('exercise').length;
							video_group=$(this).attr('url').split('/')[1];
							if (String(video_group).indexOf('index.html')==-1){//disinclude videos not on disk
								video_title = $(this).attr('title');
								video_url = $(this).attr('url').replace('.flv','.html').replace('videos/','html/');
								video_optional = $(this).attr('optional');
								exercise_title = $(this).find('exercise').attr('title');
								exercise_url = $(this).find('exercise').attr('url');
								
								/*Exercises*/

								ex_html_special='';
								if (ex_newtab){//make exercises open in new tab
									ex_html_special += 'target="_blank"';
								}
								else{//open in colorbox 
									ex_html_special += 'onClick="$.colorbox({inline:true, iframe:true, rel:\'aa\', title: \'Exercise: '+exercise_title+'\', innerWidth:'+exercise_box_width+', innerHeight:'+exercise_box_height+', href:\''+exercise_url+'\'}); return false;"';
								}
								//now check if there's an exercise associated with this video...
								if( exercise_title && exercise_url ){
								ex_html='<span class="exercise"><a href="'+exercise_url+'" title="Exercise: '+exercise_title+'" class=\"exercise-image\" alt="Exercise: '+exercise_title+'" '+ex_html_special+'></a></span>';
								}
								else{
								ex_html='<span class="exercise"><a href="no_exercise.html" title="No Exercise" alt="No Exercise" class=\"no-exercise-image\" '+((ex_newtab)?'target="_blank"':'onClick="$.colorbox({inline:true, iframe:true, rel:\'aa\', title: \'Exercise: '+exercise_title+'\', innerWidth:'+exercise_box_width+', innerHeight:'+exercise_box_height+', href:\'no_exercise.html\'}); return false;"></a></span>');
								}
								
								/*Videos*/
								//define columns
								video_col='';
								x=Math.ceil(num_videos/3); //to style columns
								if (i <= x)
									{video_col="col0 ";}
								else if (i <= 2*x)
									{video_col="col1 ";}
								else 
									{video_col="col2 ";}
									
								if (video_optional==="1")
								{video_optional='v_optional';}//content_html+='<ul class = \"optional\"><li>';}
								else
								{video_optional='v_compulsory';}//content_html+='<ul class = \"compulsory\"><li>';}
								
								//make_colorbox specifies the onclick value required for playing the video in a colorbox
								//make_colorbox='$.colorbox({rel: \''+video_group+'\', title: \''+video_title+'\', innerWidth: '+movie_box_width+', innerHeight: '+movie_box_height+', html: get_flash_content(\''+video_url.replace('html/','videos/').replace('.html','')+'\','+movie_player_width+','+movie_player_height+')}); return false;';
								//make_colorbox='makeColorbox(this,\''+video_url+'\'); return false;';
								make_colorbox='col(this); return false;';
								
								content_html+='<li class=\"'+video_col+'\" >';
								//Exercise html added in here
								content_html+=ex_html;
								content_html+='<span class=\"video\"><a title=\"'+video_title+'\" class=\"'+video_optional+'\" onClick=\"'+make_colorbox+'\" href=\"'+video_url+'\" rel=\"'+video_group+'\"><span class=\"test\">'+video_title+'</span></a></span>';
								content_html+='</li>';
								//close the unordered list
							i++;
							}//disinclude videos not on disk
						});//end  $(this).find('video').each
						content_html+='</ul>';//video-list ul
					});//end  $(this).find('topic').each
					content_html+='</div>';//video-list-container div
				$('.content').html(content_html);
				}
			});
			break;
		case "Grade_10":
			processGrade('xml/gr10.xml');
			break;
		case "Grade_11":
			processGrade('xml/gr11.xml');
			break;
		case "Grade_12":
			processGrade('xml/gr12.xml');
			break;
		case "All":
		$('.content').html('<h2 class="begin-message">Loading all videos - this may take a few seconds...</h2>');
		$.ajax({
				url : "xml/all.xml",
				dataType: "xml",
				success: function(xml) {
					
					content_html='<div class=\"video-list-container\">';
					//1//content_html='<table width='+table_width+'px align=\'center\'><tr><th>Video</th><th>Exercise</th></tr>';
					num_topics = $(xml).find('topic').length;
					$(xml).find('topic').each(function(){//for each topic
						topic_name = $(this).attr('title');
						content_html+='<div class=\"video-topic-title\"><h1>'+topic_name+'</h1></div>';
						
						$(this).find('subtopic').each(function(){//for each topic
							num_videos=$(this).find('video').length;
							subtopic_name = $(this).attr('title');
							content_html+='<a href="/" class=\"video-subtopic-title\"><h2>'+subtopic_name+'</h2></a>';
							content_html+='<div class=\"video-list-div\">';
							content_html+='<ul class=\"video-list\">';
							var i = 1;
							
							$(this).find('video').each(function(){//for each video in the current subtopic
								num_exercises=$(this).find('exercise').length;
								video_group=$(this).attr('url').split('/')[1];
								if (String(video_group).indexOf('index.html')==-1){//disinclude videos not on disk
									video_title = $(this).attr('title');
									video_url = $(this).attr('url').replace('.flv','.html').replace('videos/','html/');
									video_optional = $(this).attr('optional');
									exercise_title = $(this).find('exercise').attr('title');
									exercise_url = $(this).find('exercise').attr('url');
									
									/*Exercises*/

									ex_html_special='';
									if (ex_newtab){//make exercises open in new tab
										ex_html_special += 'target="_blank"';
									}
									else{//open in colorbox 
										ex_html_special += 'onClick="$.colorbox({inline:true, iframe:true, rel:\'aa\', title: \'Exercise: '+exercise_title+'\', innerWidth:'+exercise_box_width+', innerHeight:'+exercise_box_height+', href:\''+exercise_url+'\'}); return false;"';
									}
									//now check if there's an exercise associated with this video...
									if( exercise_title && exercise_url ){
									ex_html='<span class="exercise"><a href="'+exercise_url+'" title="Exercise: '+exercise_title+'" class=\"exercise-image\" alt="Exercise: '+exercise_title+'" '+ex_html_special+'></a></span>';
									}
									else{
									ex_html='<span class="exercise"><a href="no_exercise.html" title="No Exercise" alt="No Exercise" class=\"no-exercise-image\" '+((ex_newtab)?'target="_blank"':'onClick="$.colorbox({inline:true, iframe:true, rel:\'aa\', title: \'Exercise: '+exercise_title+'\', innerWidth:'+exercise_box_width+', innerHeight:'+exercise_box_height+', href:\'no_exercise.html\'}); return false;"></a></span>');
									}
									
									/*Videos*/
									//define columns
									video_col='';
									x=Math.ceil(num_videos/3); //to style columns
									if (i <= x)
										{video_col="col0 ";}
									else if (i <= 2*x)
										{video_col="col1 ";}
									else 
										{video_col="col2 ";}
										
									if (video_optional==="1")
									{video_optional='v_optional';}//content_html+='<ul class = \"optional\"><li>';}
									else
									{video_optional='v_compulsory';}//content_html+='<ul class = \"compulsory\"><li>';}
									
									//make_colorbox specifies the onclick value required for playing the video in a colorbox
									//make_colorbox='$.colorbox({rel: \''+video_group+'\', title: \''+video_title+'\', innerWidth: '+movie_box_width+', innerHeight: '+movie_box_height+', html: get_flash_content(\''+video_url.replace('html/','videos/').replace('.html','')+'\','+movie_player_width+','+movie_player_height+')}); return false;';
									make_colorbox = 'col(this); return false;';
									content_html+='<li class=\"'+video_col+'\" >';
									//Exercise html added in here
									content_html+=ex_html;
									content_html+='<span class=\"video\"><a title=\"'+video_title+'\" class=\"'+video_optional+'\" onClick=\"'+make_colorbox+'\" href=\"'+video_url+'\" rel=\"'+video_group+'\"><span class=\"test\">'+video_title+'</span></a></span>';
									content_html+='</li>';
								i++;
								}//disinclude videos not on disk
							});//end  $(this).find('video').each
							content_html+='</div>';//video-list-div div
							content_html+='</ul>';//video-list ul
						});//end foreach subtopic
						content_html+='</div>';//video-topic-title div
					});//end foreach topic
					content_html+='</div>';//video-list-container div
					$('.content').html(content_html);
					
				}
				
			});
			break;
		/*default:
			alert("Error parsing content tag - please inform us at "+window.contact_details);
			break;*/
	}
	window.current_topic = topic_name;
}
