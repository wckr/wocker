# -*- mode: ruby -*-
# vi: set ft=ruby :

# A dummy plugin for Barge to set hostname and network correctly at the very first `vagrant up`
module VagrantPlugins
  module GuestLinux
    class Plugin < Vagrant.plugin("2")
      guest_capability("linux", "change_host_name") { Cap::ChangeHostName }
      guest_capability("linux", "configure_networks") { Cap::ConfigureNetworks }
    end
  end
end

Vagrant.configure(2) do |config|
  config.vm.define "wocker"
  config.vm.box = "ailispaw/barge"

  # plugin conflict
  if Vagrant.has_plugin?("vagrant-vbguest")
    config.vbguest.auto_update = false
  end

  if Vagrant.has_plugin?("vagrant-hostsupdater")
    config.hostsupdater.remove_on_suspend = true
  end

  config.vm.hostname = "wocker.test"
  config.vm.network :private_network, ip: "10.0.23.16"

  config.vm.synced_folder "./data", "/home/bargee/data", create: true,
    mount_options: ["iocharset=utf8"]

  config.vm.provision :shell do |s|
    s.privileged = false
    s.path = 'provision.sh'
  end
end
