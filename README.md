# Wocker

## Docker-based development environment of WordPress

This repo provides a template Vagrantfile to create a Docker-based development environment of WordPress.

## Getting Started

__1. Install Vagrant__  
http://www.vagrantup.com/

__2. Install VirtualBox__  
https://www.virtualbox.org/

__3. Install the vagrant-hostsupdater plugin.__
```
$ vagrant plugin install vagrant-hostsupdater
```
Windows is not allowed to change hosts-file. Please add 'wocker.dev 172.17.8.23' by yourself!

__4. Clone the Wocker Repo__
```
$ git clone https://github.com/ixkaito/wocker.git
$ cd wocker
```

__5. Start Up Wocker__
```
$ vagrant up
```
This could take a while on the first run as your local machine downloads the required files.  
Watch as the script ends, as an administrator or su password may be required.

__6. Visit following site in your browser__  
http://wocker.dev/

## Credentials and Such

__WordPress__
* User: `admin`
* Pass: `admin`

__Database__
* Name: `wordpress`
* User: `wordpress`
* Pass: `wordpress`

__Local WordPress Source__
* Path: `data/wordpress`
