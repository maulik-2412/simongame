function clicked(){
    $(".buttons").on("mousedown touchstart",function(){
        var color=$(this).attr('id');
        $(this).addClass("clicker");
        var sound=new Audio("sounds/"+color+".mp3");
        sound.play();
    });

    $(".buttons").on("mouseup touchend",function(){
        $(this).removeClass("clicker");
    });

    $(".btn").on("mousedown touchstart",function(){
        $(this).addClass("clicker");
    });

    $(".btn").on("mouseup touchend",function(){
        $(this).removeClass("clicker");
    });
}

var seq=new Array();
var used=new Array();
var score=0;

function sequence(){
    let n=Math.floor(Math.random()*4)+1;
    seq.push(n);
}

function display(){
    for(let i=0;i<seq.length;i++){
        var delay=i*600;
        setTimeout(clicker,delay);
    }
}

function clicker(){
    var top = seq.shift();
    used.push(top);
    var sound1=new Audio("sounds/"+top+".mp3");
    sound1.play();
    $(".box"+top).addClass("clicker");
     setTimeout(function(){
        $(".box"+top).removeClass("clicker");
    },300); 
    
    if(seq.length<=0){
        checker();
    }
}

function checker(){
    
    $(".buttons").on("click",function (){
       
       var clickedbtn=$(this).attr('id');
       var item=used.shift();
       if(item==clickedbtn){
        seq.push(item);
        if(used.length<=0){
            score++;
            $("h2").text("Score:"+score);
            remove();
            sequence();

            setTimeout(display,800);
        }
       }
       else{
        $("h2").text("Game Over");
        $("body").addClass("gameover")
        setTimeout(function(){
            $("body").removeClass("gameover");
        },600)
        var over=new Audio("sounds/wrong.mp3");
        over.play();
        seq=[];
        used=[];
       }
    });
}

function remove(){
    $(".buttons").off("click");
}

function start(){
    remove();
    restart();
    sequence();
    display();
}

function restart(){
    score=0;
    $("h2").text("Score:"+score);
    seq.lenght=0;
    used.length=0;
}

$(".start").on("click",start);



clicked();


