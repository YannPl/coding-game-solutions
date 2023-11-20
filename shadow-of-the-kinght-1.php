<?php
/** Problem URL:
 * https://www.codingame.com/training/medium/shadows-of-the-knight-episode-1
 */

// $W: width of the building.
// $H: height of the building.
fscanf(STDIN, "%d %d", $W, $H);
// $N: maximum number of turns before game over.
fscanf(STDIN, "%d", $N);
fscanf(STDIN, "%d %d", $X0, $Y0);
$x = $X0;
$y = $Y0;

$xMin = $yMin = 0;
$xMax = $W;
$yMax = $H;

// game loop
while (TRUE)
{
    // $bombDir: the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    fscanf(STDIN, "%s", $bombDir);

    // Write an action using echo(). DON'T FORGET THE TRAILING \n
    // To debug: error_log(var_export($var, true)); (equivalent to var_dump)
    error_log(var_export($bombDir, true), $x,$y);
    switch($bombDir){
        case 'U':
            $yMax = $y;
            $xMin = $xMax = $x;
            break;
        case 'UR':
            $yMax = $y;
            $xMin = $x;
            break;
        case 'R':
            $xMin = $x;
            $yMin = $yMax = $y;
            break;
        case 'DR':
            $yMin = $y;
            $xMin = $x;
            break;
        case 'D':
            $yMin = $y;
            $xMin = $xMax = $x;
            break;
        case 'DL':
            $yMin = $y;
            $xMax = $x;
            break;
        case 'L':
            $xMax = $x;
            $yMin = $yMax = $y;
            break;
        case 'UL':
            $yMax = $y;
            $xMax = $x;
            break;

    }

    if(strstr($bombDir, 'U')){
        $y = floor($y - ($yMax - $yMin) / 2);
    } else {
        $y = floor($y + ($yMax - $yMin) / 2);
    }
    if(strstr($bombDir, 'L')){
        $x = floor($x - ($xMax - $xMin) / 2);
    } else {
        $x = floor($x + ($xMax - $xMin) / 2);
    }

    // the location of the next window Batman should jump to.
    echo("$x $y\n");
}
?>