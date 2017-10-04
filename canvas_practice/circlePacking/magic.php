<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Circle Packing</title>
    
    <style>
        * {
            padding: 0;
            margin: 0;
        }
    </style>
</head>
<body>
    
    <?php 
        $upload_dir = getcwd(); 
        $img = $_POST['imageSrc'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = $upload_dir."/test.png";
        $success = file_put_contents($file, $data);
//    NOW IMAGE IS SAVED AS test.png
//    APPLYING JAVASCRIPT ON THAT
    ?>
    
    <script src="../p5.js"></script>
    <script src="circle.js"></script>
    <script src="main.js"></script>
</body>
</html>