# Tessel remote deploy testing

Intended usage is that you can do this:

    TESSEL_KEY=<cloud_key> TESSEL_ID=<tessel_serno> ./push.sh

…and it will increment a counter configuration file, and push a blinky script to that Tessel via cloud API. (If TESSEL_ID is omitted it will use `tessel list` for you, assuming a USB attached debug device.)

Each time you push, the pattern will include one more blink than the last (`rm the_number` to reset) and every other number blinks the blue vs. green LED so it should alternate each successful push. To make the push heavier `dd` to some_big_file or something I guess.

---

Prerequisites: get the [oauth](https://github.com/tessel/oauth) and [cloud](https://github.com/tessel/cloud) servers running, then go to <http://localhost:3000/profile> — once you are logged in the page should show your api key, use it in place of `<cloud_key>` above.