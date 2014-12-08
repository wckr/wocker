# -*- mode: ruby -*-
# # vi: set ft=ruby :

require 'fileutils'

Vagrant.require_version ">= 1.6.0"

# Defaults for config options
$update_channel = "stable"
$vb_gui = false
$vb_memory = 1024
$vb_cpus = 1

Vagrant.configure("2") do |config|
  config.vm.box = "coreos-%s" % $update_channel
  config.vm.box_version = ">= 308.0.1"
  config.vm.box_url = "http://%s.release.core-os.net/amd64-usr/current/coreos_production_vagrant.json" % $update_channel

  config.vm.provider :vmware_fusion do |vb, override|
    override.vm.box_url = "http://%s.release.core-os.net/amd64-usr/current/coreos_production_vagrant_vmware_fusion.json" % $update_channel
    vb.gui = $vb_gui
  end

  config.vm.provider :virtualbox do |vb|
    # On VirtualBox, we don't have guest additions or a functional vboxsf
    # in CoreOS, so tell Vagrant that so it can be smarter.
    vb.check_guest_additions = false
    vb.functional_vboxsf     = false

    vb.gui = $vb_gui
    vb.memory = $vb_memory
    vb.cpus = $vb_cpus
  end

  # plugin conflict
  if Vagrant.has_plugin?("vagrant-vbguest") then
    config.vbguest.auto_update = false
  end

  if Vagrant.has_plugin?("vagrant-hostsupdater")
    config.hostsupdater.remove_on_suspend = true
  end

  config.vm.hostname = "vcdw.local"
  config.vm.network :private_network, ip: "172.17.8.23"

  config.vm.synced_folder "./share", "/home/core/share", create: true, id: "core", :nfs => true, :mount_options => ['nolock,vers=3,udp']

  config.vm.provision :shell, :privileged => false, :inline => <<-EOS
    curl -O https://raw.githubusercontent.com/ixkaito/vcdw-bashrc/master/bashrc && mv -f bashrc .bashrc && source .bashrc
    docker pull ixkaito/vcdw
    vcdwrun
  EOS

end
