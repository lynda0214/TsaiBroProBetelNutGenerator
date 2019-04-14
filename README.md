# TsaiBroProBetelNutGenerator
Salute to a Facebook Fanpage Tsai Bro Pro Betel Nut ([臉書：財哥專業檳榔攤](https://www.facebook.com/caigezhuanyebinlangtan/?epa=SEARCH_BOX))

### Introduction 簡介

[**Betel nut**](https://en.wikipedia.org/wiki/Areca_nut) is one of the local gum in Taiwan. It is orignated from the aboriginal culture in Taiwan, and it gradually becomes famous across races. The fanpage [**Tsai Bro Pro Betel Nut**](https://www.facebook.com/caigezhuanyebinlangtan/?epa=SEARCH_BOX) was established in Feb, 2016. Tsai Bro (the persona of the fanpage) always stammers out inspiring words using inconsecutive sentence concatenated with ellipsis(...). This reflects a well-known idiom in Taiwan, "挖金憨慢講話，但是挖金實在", which means those poor at speaking speak honestly. Ellipsis implicitly enhances the persuasiveness of the words. In addition, most posts are pictures composed of vivid neon-like colors. This also captured the stereotyped image of betel nut stand. This cult is soonly spreaded in socail network, and people started to mimic this new way of expression. 

Inspired from this phenomenon, I came up with this idea of making a generator to help the trend spread.  

---

[**檳榔**](https://zh.wikipedia.org/zh-tw/%E6%AA%B3%E6%A6%94)，台灣的本土口香糖，起源於原住民文化，漸而過渡到島內各族。[**財哥專業檳榔攤**](https://www.facebook.com/caigezhuanyebinlangtan/?epa=SEARCH_BOX)係一建立於2016年2月之粉絲專頁。一直以來，財哥都以某種看似口吃的溫吞語調說著醒世的名言(用刪節號巧妙表達)，讓人回味無窮。就好比大家耳熟能詳的盜總的五洲製藥廣告，「挖金憨慢講話，但是挖金實在」。無形間，刪節號也讓語句的說服力增加了不少。此外，貼文多以鮮豔霓虹配色的圖文呈現，配色上頗與檳榔攤的視覺印象有所連結。財哥風很快就在社群網路上蔚為風潮，越來越多人或是粉專使用類似的圖或文字描述。

受到財哥風潮啟發，我製作了這個簡易的網站，就讓財哥代替你發聲吧！

---
### Usage 使用方式

Browsing in Chrome on PC or Mac is suggested. First you need to input the text and click on [產生]. Afterwards, you can copy the pure result text or download the generated image. The image will result in 5 different color theme ramdomly. Since I applied Chinese word segmentation, Traditional Chinese input is mandatory. And, the result image only shows 7 lines at most, 

建議使用電腦版Chrome瀏覽器進行瀏覽。輸入文字後點擊產生，可複製左下角的純文字，或下載右側產生的圖，圖一共有五種配色，為隨機選擇。畢竟是使用中文斷詞，目前只支援繁中輸入，而生成的圖片最多只能容納七行字。

---
### Demo 展示

[Tsai Bro Pro Betel Nut Generator](https://tsaibro-probetelnut-generator.herokuapp.com/)

---
### Reference 參考資料
The Chinese word segmentation is based on [Jieba-js](https://github.com/pulipulichen/jieba-js). <br>
本網站中文斷詞技術使用 Jieba-Js