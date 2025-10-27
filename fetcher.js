import fs from "fs";
let dots = [
    "~/.config/hypr",
    "~/.config/kitty/kitty.conf",
    "~/.config/vesktop/settings.json",
    "~/.config/vesktop/settings",
    "~/.local/bin/cfg",
    "~/.local/bin/n",
    "~/.zshrc",
    "~/ff.js",
    "~/p",
    "~/zshc.js",
];

let reset = dir =>
    fs.readdirSync(dir).forEach(e => {
        let stat = fs.lstatSync(`${dir}/${e}`);
        if (stat.isDirectory()) {
            if (`${dir}/${e}` == "./.git") return;
            reset(`${dir}/${e}`);
            fs.rmdirSync(`${dir}/${e}`);
        } else {
            if (e == "fetcher.js" || e == "README.md") return;
            fs.rmSync(`${dir}/${e}`);
        }
    });
reset(".");
if (process.argv[2] == "reset") process.exit(0);
for (let dot of dots) {
    dot = dot.replace("~", process.env.HOME);
    let newpath = dot.replace(process.env.HOME, ".");

    copy(dot, newpath);
}

function copy(old, newp) {
    if (fs.lstatSync(old).isDirectory()) {
        if (old.endsWith(".git")) return;
        fs.mkdirSync(newp, { recursive: true });
        let files = fs.readdirSync(old);
        if (files.includes(".gitignore")) {
            let gitignore = fs
                .readFileSync(`${old}/.gitignore`)
                .toString()
                .split("\n")
                .map(x => x.trim().replace(/^\//, ""))
                .filter(x => x);
            files = files.filter(f => !gitignore.includes(f));
        }
        files.map(p => copy(`${old}/${p}`, `${newp}/${p}`));
    } else {
        let root = newp.split(/(.+)\//)[1];
        if(!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true })
        fs.copyFileSync(old, newp);
    }
}
