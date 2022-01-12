FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt clean && apt update && apt -y upgrade \
  && apt install -y --fix-missing vim curl build-essential git-core zsh \
  autoconf inotify-tools

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt install apt-transport-https \
  && apt update && apt install --no-install-recommends yarn

# Dotfiles
RUN git clone https://github.com/deltaepsilon/dotfiles.git ~/dotfiles \
  && git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim

WORKDIR /root

# Install Oh My ZSH
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" || true && rm .zshrc

# Install Node
# https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
WORKDIR /root
RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh \
  && sh nodesource_setup.sh \
  && apt install -y nodejs

# Set up dotfiles
WORKDIR /root/dotfiles
RUN ./setup.sh

WORKDIR /root
RUN sed -i 's/\/Users\/quiver/\/root/g' .zshrc

# Custom ZSH config
COPY .zshrc .append-to-zshrc
RUN sed -i 's/\r//' .append-to-zshrc \
  && cat .append-to-zshrc >> .zshrc \
  && echo '\n' >> .zshrc

# Rock and Roll
WORKDIR /cmdk

CMD [ "tail", "-f", "/dev/null" ]