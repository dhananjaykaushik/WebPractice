<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Circle packing</title>
    
    <style>
        
        
        * {
            padding: 0;
            margin: 0;
        }
        
        body {
            background: black;
        }
        
        #textCanvas{
            display: none;
        }
        
        
        form {
            position: absolute;
            left: 40vw;
            top: 70vh;
            background: #333;
            padding: 20px;
            border-radius: 20px;
        }
        
        #text {
            padding: 5px;
            border: 0;
            background: #333;
            outline: none;
            color: white;
            border-bottom: 2px solid white;
            font-family: helvetica;
            font-size: 20px;
            margin-bottom: 20px;
            text-align: center
        }
        
        #gen {
            background: #000;
            color: white;
            font-family: helvetica;
            font-size: 20px;
            padding: 20px;
            border: 0;
            border-radius: 20px;
            cursor: pointer;
            outline: none;
        }
        
        img {
            border: 1px solid grey;
            position: absolute;
            left: 41vw;
            top: 20vh;
        }
        
    </style>
    
</head>
<body>
    
    <canvas id='textCanvas'></canvas>
    <img id='image'>
    <br>
    
    <form method="post" action = "magic.php" id="go">
        <input type="text" id='text' maxlength="1" autofocus autocomplete="off"> <br/>
        <input type="text" name="imageSrc" id='text1' style="display : none">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" id="gen" value="GENERATE">
    </form>
    
    <script>
    
        var tCtx = document.getElementById('textCanvas').getContext('2d'),
    imageElem = document.getElementById('image');
        document.getElementById('textCanvas').style.backgroundColor = "black";
        tCtx.canvas.width = 220;
        tCtx.canvas.height = 220;

        document.getElementById('text').addEventListener('keyup', function (){
            
            var img = new Image();
            
            tCtx.fillStyle = "black";
            tCtx.fillRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);
            tCtx.font = "800 270px Helvetica";
            tCtx.fillStyle = "white";
            tCtx.textAlign = 'center';
            tCtx.fillText(this.value, tCtx.canvas.width/2 , tCtx.canvas.height/1.06);
            imageElem.src = tCtx.canvas.toDataURL();
            document.getElementById('text1').value = tCtx.canvas.toDataURL();
            image.src = tCtx.canvas.toDataURL();
            
        }, false);
        
        
    
    </script>
    
</body>
</html>