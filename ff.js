function rainbow(index) {
    let noOfColors = 20
    let frequency = Math.PI * 2 / noOfColors;
    let e = [];
    for (var i = 0; i < noOfColors; ++i) {
        let r = Math.floor(Math.cos(-frequency * i + 0) * 127 + 128);
        let g = Math.floor(Math.cos(-frequency * i + 2) * 127 + 128);
        let b = Math.floor(Math.cos(-frequency * i + 4) * 127 + 128);
        e.push([r,g,b])
    }
    return e[index % noOfColors]
}
function t(i) {
    let a = [
        [150, 211, 255],
        [235, 184, 184],
        [255, 255, 255],
        [235, 184, 184],
        [150, 211, 255],
    ][~~(i / 4.2) % 5];
    // console.log(i / 4)
    return a;
}
function blue(i) {
    let to = [26, 124, 226];
    let from = [123, 160, 212];
    return [
        to[0] + (from[0] - to[0]) * (i / 12),
        to[1] + (from[1] - to[1]) * (i / 12),
        to[2] + (from[2] - to[2]) * (i / 12),
    ].map(x=>~~x)
}
let color_func = blue;
let grey = c => [255,255,255]; //c.map(x=>255-x).map(x=>~~((c[0]+c[1]+c[2])/3));
let hide = ["Local IP", "Locale", "Battery"];
let i = 0;
let i2 = 0;
for await (let line of console) {
    if (line.replace(/█/g, "").length < 10) continue;
    if (line.startsWith("\x1b") && line.includes(":")) {
        if (
            hide
                .some((x) => line.split(/C(.+)/)[1]?.startsWith(x))
                
        )
            continue;
        let parts = line.split(":");
        let c = color_func(i);
        console.log(
            `\x1b[41C\x1b[1;38;2;${grey(c).join(";")};48;2;${c.join(";")}m ${
                parts[0].split(/C(.+)/)[1]
            } \x1b[0;38;2;${c.join(";")}m\x1b[0m${parts[1] || ""}`
        );
        i++;
    } else {
        i2++;
        console.log(`\x1b[38;2;${color_func(i2).join(";")}m${line}\x1b[0m`);
    }
    // console.log(line.split(/C(.+)/)[1]?.startsWith("Local IP"));
}
//[48;5;208m[37;1mkomali[0m[38;5;208m[46m[0m[46m[38;2;100;100;100;1mArch[0m[36m[0m:[0m[0;38;5;195m[32;1m~[0;38;5;195m[0m [36m❯[0m
/*                  -`    
                 .o+`    
                `ooo/    
               `+oooo:    
              `+oooooo:    
              -+oooooo+:    
            `/:-:++oooo+:    
           `/++++/+++++++:    
          `/++++++++++++++:    
         `/+++ooooooooooooo/`    
        ./ooosssso++osssssso+`    
       .oossssso-````/ossssss+`    
      -osssssso.      :ssssssso.    
     :osssssss/        osssso+++.    
    /ossssssss/        +ssssooo/-    
  `/ossssso+/:-        -:/+osssso+-    
 `+sso+:-`                 `.-/+oso:    
`++:.                           `-/+/    
.`                                 `/[1G[18A[41Ckomali@rosepad
[41C--------------
[41COS: Arch Linux x86_64
[41CHost: 21DDS4U600 (ThinkPad P1 Gen 5)
[41CKernel: Linux 6.9.6-arch1-1
[41CUptime: 3 days, 12 hours, 42 mins
[41CPackages: 1798 (pacman)
[41CShell: zsh 5.9
[41CDisplay (AUOB69D): 1920x1200 @ 60Hz
[41CWM: i3 (X11)
[41CTheme: Adwaita-dark [GTK2/3/4]
[41CIcons: breeze-dark [GTK2/3/4]
[41CFont: Noto Sans (10pt) [GTK2/3/4]
[41CCursor: breeze (24px)
[41CTerminal: kitty 0.35.2
[41CTerminal Font: UbuntuMonoNF (11pt)
[41CCPU: 12th Gen Intel(R) Core(TM) i7-12700H (20) @ 4.70 GHz
[41CGPU: Intel Iris Xe Graphics @ 1.40 GHz [Integrated]
[41CMemory: 10.18 GiB / 31.05 GiB (33%)
[41CSwap: 256.00 KiB / 4.00 GiB (0%)
[41CDisk (/): 156.12 GiB / 456.89 GiB (34%) - ext4
[41CLocal IP (wlp0s20f3): 137.112.196.78/22 *
[41CBattery: 100% [AC Connected]
[41CLocale: en_US.UTF-8
[41C
[41C████████████████████████
[41C████████████████████████
*/
