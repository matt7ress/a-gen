# a-gen
A simple script that generates word chains based on your inputs. **Make sure that you installed `prompt-sync` package if you're using source code!**
## How to use it
That's easy.
1) Download [EXE](https://github.com/mat1rus/a-gen/releases/latest/build.exe) or source code;
2) Run it and type some words. That's all!
## How it works
A-Gen is based on NobDod algorithm you can't find anywhere in internet. The only projects that using NobDod algorithm are A-Gen, Magisk _(that's my discord bot I am not about [root thing](https://github.com/topjonhwu/Magisk); it uses A-Gen)_ and Andrey Bot _(another discord bot; NobDod made him; he's dead)_.

### NobDod algorithm short explaination
First thing it does is memorizing first word it will start prompts. Then it finding word chains and memorizing it as CNP (curr-next-prev) words. Based on CNP and first words, it generates prompts.
## Am I able to use it on Android/Linux/MacOS/iOS?
Linux/MacOS: sure, you just need to recompile source code for your OS;

Android: use Termux package `nodejs` & command `node` to use it;

iOS: I really don't know. I never had iOS and will never have.
