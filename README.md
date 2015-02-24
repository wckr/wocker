# Wocker

This repository provides a template Vagrantfile to create a Docker-based rapid development environment of WordPress. __IT TAKES JUST 3 SECONDS TO CREATE A NEW ONE!__

## Getting Started

__1. Install Vagrant__  
http://www.vagrantup.com/

__2. Install VirtualBox__  
https://www.virtualbox.org/

__3. Install the vagrant-hostsupdater plugin.__  
```
$ vagrant plugin install vagrant-hostsupdater
```
Windows is not allowed to change hosts-file. Please add "wocker.dev 172.17.8.23" by yourself!

__4. Clone the Wocker Repo__  
```
$ git clone https://github.com/ixkaito/wocker.git
$ cd wocker
```

__5. Start up Wocker__  
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

__WordPress Source of running container (Synced)__  
* Local machine: `data/wordpress`
* Guest machine: `/home/core/data/wordpress`

__Synced Folder__  
* Local machine: `data`
* Guest machine: `/home/core/data`

## Run a new Wocker container (3 SECONDS)

Before running a new one, you must stop or remove the running Wocker container via Wocker command line.

__1. Connect to the guest machine via SSH__  
```
$ vagrant ssh
```

__2. Use Wocker commands to stop or remove the running Wocker container__  
```
core@wocker ~ $ wocker stop CONTAINER
```
or
```
core@wocker ~ $ wocker kill CONTAINER
```
or
```
core@wocker ~ $ wocker rm CONTAINER
```
e.g. `$ wocker stop wocker`  
`CONTAINER` can be a name or ID of a container.  
You can use a docker command `$ docker ps` or a wocker command `$ wocker ps` (alias) to list running containers.  
Note: The initial Wocker container's name after your first `$ vagrant up` is "wocker".  


__3. Use a wocker command to run a new Wocker container__  
```
core@wocker ~ $ wocker run
```
You can use the name option to assign a specific name to the container.  
e.g. `$ wocker run --name wp`

## Restart a stopped Wocker container (1 SECONDS)

Before a restart, you must stop or remove the running Wocker container via Wocker command line.

__1. Connect to the guest machine via SSH__  
```
$ vagrant ssh
```

__2. Use Wocker commands to stop or remove the running Wocker container__  
```
core@wocker ~ $ wocker stop CONTAINER
```
or
```
core@wocker ~ $ wocker kill CONTAINER
```
or
```
core@wocker ~ $ wocker rm CONTAINER
```
`CONTAINER` can be a name or ID of a container.  

__3. Use a wocker command to restart a stopped Wocker container__  
```
core@wocker ~ $ wocker start CONTAINER
```
e.g. `$ wocker start wocker`  
`CONTAINER` can be a name or ID of a container.  
You can use a docker command `$ docker ps -a` or a wocker command `$ wocker ps -a` (alias) to list all containers including stopped ones.  

## Shutdown Wocker

Before the shutdown, you must stop or remove the running Wocker container via Wocker command line.

__1. Connect to the guest machine via SSH__  
```
$ vagrant ssh
```

__2. Use Wocker commands to stop or remove the running Wocker container__  
```
core@wocker ~ $ wocker stop CONTAINER
```
or
```
core@wocker ~ $ wocker kill CONTAINER
```
or
```
core@wocker ~ $ wocker rm CONTAINER
```
`CONTAINER` can be a name or ID of a container.  

__3. Exit from the guest machine__  
```
core@wocker ~ $ exit
```

__4. Shutdown the guest machine__  
```
$ vagrant halt
```

## Restart Wocker

__1. Start the guest machine__  
```
$ vagrant up
```

__2. Connect to the guest machine via SSH__  
```
$ vagrant ssh
```

__3. Use a wocker command to restart a stopped Wocker container__  
```
core@wocker ~ $ wocker start CONTAINER
```
`CONTAINER` can be a name or ID of a container.  
