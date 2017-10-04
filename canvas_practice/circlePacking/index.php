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
        
        #textCanvas{
            display: none;
            height: 360px;
            widows: 640px;
        }
        
        #image {
            position: absolute;
            left: 20vw;
            top: 10vh;
        }
        
        form {
            position: absolute;
            left: 40vw;
            top: 70vh;
        }
        
    </style>
    
</head>
<body>
    
    <canvas id='textCanvas'></canvas>
    <img id='image'>
    <br>
    
    <form method="post" action = "magic.php" id="go">
        <input type="text" id='text' maxlength="9">
        <input type="text" name="imageSrc" id='text1' style="display : none">
        <input type="submit" id="gen" value="GENERATE">
    </form>
    
    <script>
    
        var tCtx = document.getElementById('textCanvas').getContext('2d'),
    imageElem = document.getElementById('image');
        document.getElementById('textCanvas').style.backgroundColor = "black";
        tCtx.canvas.width = 640;
        tCtx.canvas.height = 360;

        document.getElementById('text').addEventListener('keyup', function (){
            
            var img = new Image();
            
            tCtx.fillStyle = "black";
            tCtx.fillRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);
            tCtx.font = "bold 60px Georgia";
            tCtx.fillStyle = "white";
            tCtx.textAlign = 'center';
            tCtx.fillText(this.value, tCtx.canvas.width/2 , tCtx.canvas.height/2);
            imageElem.src = tCtx.canvas.toDataURL();
            document.getElementById('text1').value = tCtx.canvas.toDataURL();
            image.src = tCtx.canvas.toDataURL();
            
        }, false);
        
        
    
    </script>
    
</body>
</html>