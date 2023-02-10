
for(let i = 0 ; i<document.querySelectorAll(".radioInput").length ; i++){
    // document.querySelectorAll("#timing")[i].setAttribute("style" , "visibility:hidden");
    document.querySelectorAll(".radioInput")[i].addEventListener("click" , function(){
        if(document.querySelectorAll(".radioInput")[i].checked){
            document.querySelectorAll(".radioInput")[i+1].setAttribute("style" , "visibility:visible")
            document.querySelectorAll(".radioInput")[i+1].setAttribute("required" , "required");
        }
        
    })
    document.querySelectorAll(".deactivate")[i].addEventListener("click" , function(){
        if(document.querySelectorAll(".deactivate")[i].checked){
            document.querySelectorAll(".deactivate")[i+1].setAttribute("style" , "visibility:hidden");
        }
        
    })
}