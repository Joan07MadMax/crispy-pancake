song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('¡PoseNet está incializado!');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keyponits[9].score;
        console.log("Velocidad = " + scoreRightWrist + "Volúmen = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Coordenada X de muñeca derecha = " + rightWristX + "Coordenada Y de muñeca derecha = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Coordenada X de muñeca izquierda = " +leftWristX + "Coordenada Y de muñeca izquierda = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        if(rightWristY >0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 1x";
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 2x";
            song.rate(2);
        }
        else if(rightWristY >400)
        {
            document.getElementById("speed").innerHTML = "Velocidad = 2.5x";
            song.rate(2.5);
        }

    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        new_leftWristY = floor(InNumberleftWristY *2);
        leftWristY_divide_1000 = new_leftWristY/1000;
        document.getElementById("volume").innerHTML = "volumen = " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }
}

function play() 
{
    song.play();
    song.setVolume(1);
    //recurso variableName.setVolume(0.1) - Muy bajo
    //recurso variableName.setVolume(0.3) - Poco bajo
    //recurso variableName.setVolume(0.5) - Medio
    //recurso variableName.setVolume(0.7) - Poco alto
    //recurso variableName.setVolume(0.9) - Alto
    //recurso variableName.setVolume(1) - Volumen completo
    song.rate(1);
    //variableName.rate(0.5) - Muy lento
    //variableName.rate(1) - Normal
    //variableName.rate(1.5) - Un poco rápido
    //variableName.rate(2) - El doble de rápido
    //variableName.rate(2.5) - Muy rápido
}