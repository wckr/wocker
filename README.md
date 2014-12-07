# VCDW

## Vagrant, CoreOS, Docker, and WordPress

This repo provides a template Vagrantfile to create a development environment of WordPress using CoreOS and Docker.

__1. Install Vagrant__

http://www.vagrantup.com/downloads.html

__2. Install VirtualBox__

https://www.virtualbox.org/

__3. Install the vagrant-hostsupdater plugin.__

```
$ vagrant plugin install vagrant-hostsupdater
```

__4. Clone VCDW Repo__

```
$ git clone https://github.com/ixkaito/vcdw.git
$ cd vcdw
```

__5. Start Up VCDW__

```
$ vagrant up
```

Your WordPress URL will be [http://vcdw.local](http://vcdw.local).
