---
title: 2024 Dev Setup
date: 2024-01-26T20:00:00+07:00
lang: en
duration: 5 mins
description: So this is my dev setup in 2024. I hope you find it interesting.
---

So last week, an colleague asked me about my dev setup, he thought it looked cool compared to what she had. And boy, I was flattered. I mean, I don't think my setup is that cool, but I'm glad that he liked it. So I decided to write this post to share my setup with you. I hope you find it interesting.

## Visual Studio Code

Let's start with the most important tool for a developer: the code editor. I use [Visual Studio Code](https://code.visualstudio.com/) as my code editor. Not really a surprise to anyone, to be honest. But what matters is how it looks, right? So here's how my VS Code looks like:

<figure pt-5>
  <div lg:scale-120 md:scale-110>
    <img src="/images/2024/subessence-vscode.png" alt="VS Code setup" shadow />
  </div>
  <figcaption important-mt8 text-center>
    My VS Code setup
  </figcaption>
</figure>

### Layout

Not exactly feel like everyone else's VS Code, right? In this particular setup, I set the activity bar to the top instead of the left side using

```json
{
  // ...
  "workbench.activityBar.location": "top"
}
```

Also on my work machine, which is running Windows, I set the title bar to be hidden. I also hide the breadcrumbs and the minimap because I find them distracting.

### Theme

- For **color theme**, I always opt for a minimal look, not too many colors, but also not too bland. Recently, I have found a theme named Subminimal, which is exactly what I'm looking for. But itself and its fork, Subminimal Next, haven't been updated for a while, so I decided to fork it and make my own version, which I named [Subessence](https://marketplace.visualstudio.com/items?itemName=vinhphm.subessence). It's available on the VS Code Marketplace, so you can install it if you want.
- For **icon theme**, I use [JetBrains Icon Theme](https://marketplace.visualstudio.com/items?itemName=chadalen.vscode-jetbrains-icon-theme), the "2023+" variant. It fits quite well with my Subessence theme.

### Font

I used to be a loyal user of [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) font, but ever since I found [Geist Mono](https://vercel.com/font) font, I have been using it for all my setup eventhough it still does not support Vietnamese characters yet. I just love the look of it.

## Terminal

### Shells

Having to work with two different operating systems means I have to configure and work with two different shells. On my work machine, I set [PowerShell](https://docs.microsoft.com/en-us/powershell/) as the default shell. I also have [Git Bash](https://git-scm.com/downloads) installed, but I rarely use it. On my personal machine, I use [fish shell](https://fishshell.com) as the default shell.

### Prompt

Though I use different shells on different machines, I want to have the same experience with prompt for both. So I use [Starship](https://starship.rs) as my prompt. It's fast, customizable, and cross-platform. I have been using it for a while now, and I'm quite happy with it.

<figure pt-5>
  <div lg:scale-120 md:scale-110>
    <img src="/images/2024/terminal.png" alt="iTerm with Starship prompt" />
  </div>
  <figcaption important-mt8 text-center>
    My terminal setup on macOS
  </figcaption>
</figure>

Starship tends to use a default preset that need a nerdfont to work properly. But since I want to stick with the original Geist Mono, I have to customize it a bit. Here's my Starship config:

```toml
# ~/.config/starship.toml
[battery]
full_symbol = "• "
charging_symbol = "⇡ "
discharging_symbol = "⇣ "
unknown_symbol = "❓ "
empty_symbol = "❗ "

[erlang]
symbol = "ⓔ "

[git_branch]
symbol = "⎇ "

[nodejs]
symbol = "[⬢](bold green) "

[pulumi]
symbol = "🧊 "

[typst]
symbol = "t "
```

## Conclusion

So that's it, my dev setup in 2024. I hope you find it interesting. If you have any feedback, please let me know. I would love to hear from you.
