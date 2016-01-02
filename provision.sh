#!/bin/bash

set -e
if [[ ! -d /opt/bin ]]; then
  mkdir /opt/bin
fi

#
# Install Wocker CLI
#
wget -q -O /opt/bin/wocker https://raw.githubusercontent.com/wckr/wocker-cli/master/wocker
chmod +x /opt/bin/wocker

#
# Pull Wocker image
#
docker pull wocker/wocker:latest

#
# Add wocker user
#
adduser -h /home/wocker -s /bin/bash -G docker wocker
cp -r ~/.ssh/ /home/wocker
chown -R wocker /home/wocker/.ssh
