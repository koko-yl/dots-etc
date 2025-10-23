let colors = {
    "#5c6370": [ "comment"],
    "#abb2bf": [
        "hashed-command", "default"
    ],
    "#e06c75": [
        "commandseparator", "path_pathseparator", "path_prefix_pathseparator",
        "reserved-word", "builtin",
    ],
    "#e06c75,underline": [
        "alias", "global-alias", "suffix-alias", 
        "function", "command", "precommand"
    ],
    "#98c379": [ 
        "command-substitution-quoted", "command-substitution-delimiter-quoted", "single-quoted-argument",
        "double-quoted-argument", "rc-quote"
    ],
    "#c678dd": [
        "reserved-word" // why does this include (){}
    ],
    "#56b6c2": [
        "builtin"
    ],
    "#61afef": [
        "single-hyphen-option", "double-hyphen-option"
    ],
    "#ff0000": [ 
        "single-quoted-argument-unclosed", "double-quoted-argument-unclosed", "back-quoted-argument-unclosed",
        "unknown-token", "dollar-quoted-argument-unclosed"
    ]
};
for(let color in colors) {
    for(let key of colors[color]) console.log(`ZSH_HIGHLIGHT_STYLES[${key}]='fg=${color}'`)
}
