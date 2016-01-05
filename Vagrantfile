# -*- mode: ruby -*-
# vi: set ft=ruby :

# A dummy plugin for DockerRoot to set hostname and network correctly at the very first `vagrant up`
module VagrantPlugins
  module GuestLinux
    class Plugin < Vagrant.plugin("2")
      guest_capability("linux", "change_host_name") do
        Cap::ChangeHostName
      end

      guest_capability("linux", "configure_networks") do
        Cap::ConfigureNetworks
      end
    end
  end
end

Vagrant.configure(2) do |config|
  config.vm.define "wocker"
  config.vm.box = "ailispaw/docker-root"
  config.vm.box_version = ">= 1.2.6"

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

  config.vm.provision :shell do |s|
    s.path = 'provision.sh'
  end

end
