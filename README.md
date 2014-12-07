# VCDW

## Vagrant, CoreOS, Docker, and WordPress

This repo provides a template Vagrantfile to create a development environment of WordPress using CoreOS and Docker.

*** 1. Install Vagrant ***
http://www.vagrantup.com/downloads.html

*** 2. Install VirtualBox ***
https://www.virtualbox.org/

*** 3. Install the vagrant-hostsupdater plugin. ***
```
$ vagrant plugin install vagrant-hostsupdater
```

*** 4. Clone VCDW Repo ***
```
$ git clone https://github.com/ixkaito/vcdw.git
$ cd vcdw
```

*** 5. Start Up VCDW ***
```
$ vagrant up
```

Your WordPress URL will be [http://vcdw.local](http://vcdw.local).
