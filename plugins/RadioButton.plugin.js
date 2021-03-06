/**
 * @name RadioButton
 * @authorId 262613777357209601
 * @source https://github.com/YukiGasai/BetterDiscord/blob/master/plugins/Radio.plugin.js
 */

var RadioSettingsConfig = {
    Radios : [],
    Volume : 0
}
var Playing = false;
var aPlayer;
module.exports = class RadioButton {

	getName() { return "RadioButton"; }

	getDescription() { return "RadioButton"; }

	getVersion() { return "1.1.1"; }

	getAuthor() { return "L7Yuki Gasai"; }

	//legacy
    load() { 	
    }

    start(){

        RadioSettingsConfig.Radios = BdApi.loadData("RadioButton", "Radios");
        if(RadioSettingsConfig.Radios == undefined)
            BdApi.saveData("RadioButton", "Radios", [{"Name":"MDR Info","Url":"https://mdr-edge-205e-fra-lg-cdn.cast.addradio.de/mdr/aktuell/live/mp3/128/stream.mp3?_art=dj0yJmlwPTkxLjEzNy42My4xNDgmaWQ9aWNzY3hsLWd5NHQyeGFuYiZ0PTE1OTc1MzY0NzMmcz03ODY2ZjI5YyM4ZjVjNDU4NTFmMTk0ZTIxNjdiOGI2NGYzN2QyM2I4MA"},{"Name":"MDR Thüringen","Url":"https://mdr-edge-2060-fra-lg-cdn.cast.addradio.de/mdr/mdrthueringen/live/mp3/128/stream.mp3?_art=dj0yJmlwPTkxLjEzNy42My4xNDgmaWQ9aWNzY3hsLWdjMjYzcWJuYiZ0PTE1OTc1MzY1OTMmcz03ODY2ZjI5YyM2ZjM1Y2MzMzMzOWU1ZWI4MWM0ODY2NmNkYWJhOTFhZA"},{"Name":"Landeswelle Thüringen","Path":"http://landeswelle-de-hz-fal-stream07-cluster01.radiohost.de/lwdemp3-192","Url":"http://landeswelle-de-hz-fal-stream06-cluster01.radiohost.de/lwtmp3-192"},{"Name":"Landes Oldie Welle","Path":"http://landeswelle-de-hz-fal-stream05-cluster01.radiohost.de/lwro_mp3-192","Url":"http://landeswelle-de-hz-fal-stream01-cluster01.radiohost.de/lwol_mp3-192"},{"Name":"Landes Rock Welle","Path":"http://landeswelle-de-hz-fal-stream05-cluster01.radiohost.de/lwro_mp3-192","Url":"http://landeswelle-de-hz-fal-stream05-cluster01.radiohost.de/lwro_mp3-192"},{"Name":"Deutsche Welle","Url":"http://landeswelle-de-hz-fal-stream09-cluster01.radiohost.de/lwdemp3-192"},{"Name":"Grill Welle","Url":"http://landeswelle-de-hz-fal-stream06-cluster01.radiohost.de/lwgrmp3-128"}]);
        RadioSettingsConfig.Radios = BdApi.loadData("RadioButton", "Radios");
         
            RadioSettingsConfig.Volume = BdApi.loadData("RadioButton", "Volume");
        if(RadioSettingsConfig.Volume == undefined)
            BdApi.saveData("RadioButton", "Volume", 0.5);
        RadioSettingsConfig.Volume = BdApi.loadData("RadioButton", "Volume"); 
      
    }

    onSwitch()
    {
        if($('#Radio').length < 1){
        var index = 0;
        var currentProgram = 0;

        function addHover(requestElement, Color){
            $(requestElement).hover(function(){
                    $(this).css({"transform": "scaleY(1.1)","background": "#"+ Color})
                },
                function(){
                    $(this).css({"transform": "scaleY(1.0)","background": "white"})
            });
        }
 
        var wrapper = $("<div>", {
            "tabindex":"0",
            "id":"Radio",
            "class":"iconWrapper-2OrFZ1 clickable-3rdHwn da-iconWrapper da-clickable",    
            "playing":Playing ,
            "role":"button",
            "aria-label":RadioSettingsConfig.Radios[index].Name,
     
        }).insertBefore($(".toolbar-1t6TWx.da-toolbar"));
        
        var svg = $("<svg>", {
            "html":"📻",
            "x":"0",
            "y":"0",
            "name":"Radio",
            "class":"icon-22AiRD da-icon",
            "aria-hidden":"false",
            "width":"24",
            "height":"24",
            "viewBox":"0 0 24 24",
            css:{
                "opcity":"0.2",
                "font-size":"24px",
                "color":"#dcddde"
            }
        }).appendTo(wrapper);

        var text = $("<a>",{
            "html":RadioSettingsConfig.Radios[index].Name,
            css:{
                "color":"#fff"
            }
        }).insertBefore($('#Radio'));

        $(wrapper).mousedown(function(event){
            if(event.which==1){
                if($(wrapper).prop("playing")==false){
                    $(wrapper).prop("playing",true);
                    Playing = true;

                    aPlayer = new Audio(RadioSettingsConfig.Radios[index].Url);
                    $(text).css("font-weight","bold" );

                    aPlayer.volume  = RadioSettingsConfig.Volume;
                    aPlayer.play();
                    console.log("PLAY")

                }else{
                    $(wrapper).prop("playing",false);
                    Playing = false;
                    $(text).css("font-weight","normal" );
                    aPlayer.pause();
                    aPlayer.src = "";
                    
                    console.log("PAUSE")
                }
            }
            
            if(event.which==2){
                console.log(index);
                index++;
                if(index > RadioSettingsConfig.Radios.length-1)index = 0;

                $(text).html(RadioSettingsConfig.Radios[index].Name);

                if($(wrapper).prop("playing")==true){  
                    aPlayer.pause();
                    aPlayer.src = ""; 
                    aPlayer = new Audio(RadioSettingsConfig.Radios[index].Url);
                    aPlayer.volume  = RadioSettingsConfig.Volume;
                    aPlayer.play();
                }
            }

            if(event.which==3){
                if ($(".RadioSettings").length) {
                    $(".RadioSettings").remove();

                }else{
                var cssstyle = {
                    "position": "relative",
                    "width": "80%",
                    "height": "25px",
                    "font-size": "20px",
                    "margin": "5px 10%",
                    "text-align": "center",
                    "transition": "all 1s",
                }
               
                console.log("CREATE")
                        var RadioSettings = $("<div>", {
                            'class': "RadioSettings",
                            "hidden": "true",
                            css: {
                                "position": "absolute",
                                "width": "50%",
                                "height": "auto",
                                "top": "20%",
                                "left": "25%",
                                "font-size": "10px",
                                "background-color": "rgba(213, 254, 253,0.5)",
                                "background-image": "linear-gradient(315deg, rgba(213, 254, 253,0.8) 0%, #rgba(255, 252, 255,0.8) 74%)",
                                "border-radius": "50px",
                                "padding-top": "10px",
                                "z-index":"10",
                                "padding-bottom": "10px"                              
                            }
                        }).insertAfter("body");

                        $(RadioSettings).first().fadeIn("slow");

                        $(RadioSettings).keydown(function (e) {
                            if (e.which == 27) $(RadioSettings).remove();

                        });

                        var RadioIndexP = $("<p>", {
                            'class': "RadioIndexP",
                            'html': "Index of Radiostation",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        var RadioIndexInput = $("<input>", {
                            'type': "number",
                            'min': 0,
                            'max': RadioSettingsConfig.Radios.length - 1,
                            'val': currentProgram,
                            'class': "RadioIndexInput",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        var RadioNameP = $("<p>", {
                            'class': "RadioNameP",
                            'html': "Name of Radio",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        var RadioNameInput = $("<input>", {
                            'class': "RadioNameInput",
                            'val': RadioSettingsConfig.Radios[currentProgram].Name,
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        var RadioPathP = $("<p>", {
                            'class': "RadioPathP",
                            'html': "URL of Radio Stream",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        var RadioPathInput = $("<input>", {
                            'class': "RadioPathInput",
                            'val': RadioSettingsConfig.Radios[currentProgram].Url,
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        var RadioDeleteButton = $("<button>", {
                            'html': "DELETE",
                            'class': "RadioDeleteButton",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        addHover(RadioDeleteButton,"ff6347");

                        var RadioAddButton = $("<button>", {
                            'html': "Add",
                            'class': "RadioAddButton",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        addHover(RadioAddButton,"90ee90");

                        var RadioSaveButton = $("<button>", {
                            'html': "Change",
                            'class': "RadioSaveButton",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        addHover(RadioSaveButton,"90ee90");

                        var RadioBackButton = $("<button>", {
                            'html':"Back",
                            'class':"RadioBackButton",
                            css: cssstyle
                        }).appendTo(RadioSettings);

                        addHover(RadioBackButton,"7ff7ff");

                        $(RadioIndexInput).bind('input', function () {
                            currentProgram = $(".RadioIndexInput").val();
                            $(".RadioNameInput").val(RadioSettingsConfig.Radios[currentProgram].Name);
                            $(".RadioPathInput").val(RadioSettingsConfig.Radios[currentProgram].Url);
                        });

                        $(RadioDeleteButton).click(function () {
                      
                            $(this).html("DELETE ✔");
                            RadioSettingsConfig.Radios.splice(currentProgram,1);
                            BdApi.saveData("RadioButton", "Radios", RadioSettingsConfig.Radios);
                      
                            $(RadioSettings).remove();
                           
                            currentProgram = 0;
                        });

                        $(RadioAddButton).click(function () {
                            
                            if (addbool) {
                                
                                $(".RadioIndexInput").val(RadioSettingsConfig.Radios.length);
                                $(".RadioAddButton").html("Click again to save");
                                $(".RadioNameInput").val("");
                                $(".RadioPathInput").val("");
                                $(".RadioIconInput").val("");
                                addbool = false;
                                $(RadioDeleteButton).attr("disabled",true);
                                $(RadioSaveButton).attr("disabled",true);
                             

                            } else {
                                $(this).html("SAVED ✔");
                                RadioSettingsConfig.Radios.push({
                                    "Name": $(".RadioNameInput").val(),
                                    "Url": $(".RadioPathInput").val(),

                                })

                                addbool = true;
                                BdApi.saveData("RadioButton", "Radios", RadioSettingsConfig.Radios);
                            }
                        });

                        $(RadioSaveButton).click(function () {
                            RadioSettingsConfig.Radios[currentProgram].Name = $(".RadioNameInput").val();
                            RadioSettingsConfig.Radios[currentProgram].Url = $(".RadioPathInput").val();
                            $(this).html("CHANGED ✔");
                            BdApi.saveData("RadioButton", "Radios", RadioSettingsConfig.Radios);
                            currentProgram = 0;
                        });

                        $(RadioBackButton).click(function(){
                            RadioSettings.remove();
                        });
                    }
            }

        });
        document.getElementById("Radio").addEventListener("wheel", MouseWheelHandler, false);
		function MouseWheelHandler(e) {		
				var e = document.body.event || e;
                var dd = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) /  100;
           
                RadioSettingsConfig.Volume = RadioSettingsConfig.Volume + dd;
                if(RadioSettingsConfig.Volume<0)RadioSettingsConfig.Volume=0;
                if(RadioSettingsConfig.Volume>1)RadioSettingsConfig.Volume=1;
                console.log(RadioSettingsConfig.Volume)
                aPlayer.volume  = RadioSettingsConfig.Volume;
                BdApi.saveData("RadioButton", "Volume", RadioSettingsConfig.Volume);
			return false;
		}
    }    
    }
    stop(){}
}