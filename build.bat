
echo off
echo ---
@REM https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/
firebase target:apply hosting nucuoitretho nucuoitretho

node build detail, list, news, js, [image]
firebase deploy --only hosting:nucuoitretho
