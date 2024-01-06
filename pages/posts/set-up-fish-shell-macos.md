---
title: Set up Fish Shell on macOS (Intel and Silicone)
date: 2023-08-20T13:30:00+07:00
lang: en
duration: 3 mins
type: note
---

[[toc]]

Okay, you probably thought I must be joking, installing fish shell on macOS couldn't be that hard. But believe me, at first, I had a hard time making everything work with fish the moment I installed it on macOS (Silicone). If you're here, I assume you got fish installed on your machine, now, let's figure out the rest.

## Check the path

Here lies the difference between Intel Macs and Silicone Macs, the location of fish is different between the two. You have to check the path using `which fish`:

<div class="grid grid-cols-2 gap-2 lt-sm:grid-cols-1">

```shell
# Silicone
/opt/homebrew/bin/fish
```

```shell
# Intel
/usr/local/bin/fish
```

</div>

In the examples below, I will use the Silicone Macs path, but you can replace them accordingly.

## Make `fish` the default

1. Add fish to the know shells by running the command:

```shell
sudo sh -c 'echo /opt/homebrew/bin/fish >> /etc/shells'
```

2. Restart your terminal
3. Set fish as the default shell using the command:

```shell
chsh -s /opt/homebrew/bin/fish
```

4. Restart your terminal and check if it launched with fish or not
5. Add brew binaries in fish path:

```shell
set -U fish_user_paths /opt/homebrew/bin $fish_user_paths
```

## Optionnaly configure the shell (launch web interface)

```shell
fish_config
```
