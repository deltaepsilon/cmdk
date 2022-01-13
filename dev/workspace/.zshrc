# Lines to append to .zshrc from deltaepsilon/dotfiles
# Don't leave blank lines... it copies poorly
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Aliases
alias ll="ls -al"

# Symlinks
ln -s /cmdk/bin/dev.sh /usr/bin/dev
ln -s /cmdk/bin/build.sh /usr/bin/build