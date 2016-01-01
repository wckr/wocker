# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.define "docker-root"
  config.vm.box = "ailispaw/docker-root"

  if Vagrant.has_plugin?("vagrant-triggers") then
    config.trigger.after [:up, :resume] do
      info "Adjusting datetime after suspend and resume."
      run_remote "sudo sntp -4sSc pool.ntp.org; date"
    end
  end

  # Adjusting datetime before provisioning.
  config.vm.provision :shell, run: "always" do |sh|
    sh.inline = "sntp -4sSc pool.ntp.org; date"
  end

  # plugin conflict
  if Vagrant.has_plugin?("vagrant-vbguest")
    config.vbguest.auto_update = false
  end

  if Vagrant.has_plugin?("vagrant-hostsupdater")
    config.hostsupdater.remove_on_suspend = true
  end

  config.vm.hostname = "wocker.dev"
  config.vm.network :private_network, ip: "10.0.23.16"

  config.vm.synced_folder "./data", "/home/docker/data", create: true

  # for NFS synced folder
  # config.vm.synced_folder "./data", "/home/docker/data", create: true, type: "nfs", mount_options: ["nolock", "vers=3", "udp"]

  config.vm.provision :shell, privileged: false, inline: <<-EOS
    set -e
    wget -q -O ~/.bashrc https://raw.githubusercontent.com/wckr/wocker-bashrc/master/bashrc
    sed -i -e 's/curl -OL/wget/' ~/.bashrc
    source ~/.bashrc
    echo "source ~/.bashrc" > ~/.bash_profile
    docker pull wocker/wocker:latest
    wocker run --name wocker
  EOS
end
