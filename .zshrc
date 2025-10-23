skip_global_compinit=1
HISTFILE=~/.zshhist
HISTSIZE=1000
SAVEHIST=1000
PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/bin:~/.local/bin:~/.cargo/bin:~/scripts:~/.bun/bin

setopt SHARE_HISTORY
bindkey "^[[1;5C" forward-word
bindkey "^[[1;5D" backward-word
bindkey "^[[3~" delete-char
bindkey "^[[Z" forward-char
precmd() {
    PROMPT=$(USER=kate Q=$? ~/p2)
    # PROMPT=$(~/prompt --zsh -c block.user.bg '48;2;26;124;226' -c block.os.bg '48;2;0;215;255;' -c path.home '38;2;26;124;226')
    # PROMPT=$(~/prompt --zsh -u koko -c block.user.bg '48;2;209;54;191' -c block.os.bg '48;2;253;192;240' -c path.home '38;2;158;43;209')
    # PROMPT=$(~/prompt --zsh')
}
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.plugin.zsh
source <(bun ~/zshc.js)

export JAVA_HOME="/usr/lib/jvm/java-21-openjdk"
export LS_COLORS="$(vivid generate catppuccin-mocha)"
export MAKEFLAGS="-j${NUMCPUSPLUSONE} -l${NUMCPUS}"

alias agdb="arm-linux-gnueabihf-gdb"
alias arm='qemu-arm -L /usr/arm-linux-gnueabihf'
alias cat='bat --paging=never'
alias clip='wl-copy'
alias xsel='wl-paste'
alias grep='grep --color=auto'
alias hpc='bluetoothctl connect AC:80:0A:83:39:F8'
alias hprp="{echo 'scan on'; sleep 3; echo 'pair AC:80:0A:83:39:F8'; echo 'connect AC:80:0A:83:39:F8'} | bluetoothctl"
alias ls='ls --color=auto'
alias vmake="HOME=$HOME/vex-toolchain make"

alias startx="env __GLX_VENDOR_LIBRARY_NAME=nvidia WLR_NO_HARDWARE_CURSORS=1 Hyprland"

# bun completions
[ -s "/home/komali/.bun/_bun" ] && source "/home/komali/.bun/_bun"
alias neofetch="USER=kate fastfetch | bun ~/ff.js"
alias ssh="TERM=xterm-color ssh"
alias 400b="echo 400 | sudo tee /sys/class/backlight/intel_backlight/brightness"
# alias jtest="java -cp /usr/share/java/hamcrest-core.jar:/usr/share/java/junit.jar:bin org.junit.runner.JUnitCore"

export QSYS_ROOTDIR="/home/komali/.cache/yay/quartus-free/pkg/quartus-free-quartus/opt/intelFPGA/23.1/quartus/sopc_builder/bin"
# alias code="code --disable-gpu --disable-software-rasterizer"
code() {
    /usr/bin/code $@ --disable-gpu --disable-software-rasterizer
}
alias ffmpeg="ffmpeg -hide_banner"
alias rnm="sudo systemctl restart NetworkManager"
alias rewp='pkill mpvpaper -9; hyprctl dispatch exec "$(cat ~/.config/hypr/hyprland.conf | grep mpvpaper | sed "s/exec-once = //")"'

alias blahaj="display3d blahaj/blahaj.obj"
