# filendar
filendarはカレンダー上の日付へフィルタリングをするライブラリです。

例えば、次のコードで2016年の5月の平日を求めることができます。

```javascript
const Calendar = requie('filendar');
new Calendar.Month(2016, 5 - 1).filter(Calendar.filter.weekday());
```

(平日とは、祝日でなく、振替休日でなく、国民の休日でなく、土日でない日のことを指します)

# クラス
filendarにはYearクラス、Monthクラス、Dateクラスがあります。

Yearクラス、Monthクラスはfilter()を持っています。

DateクラスはビルトインオブジェクトのDateとほぼ同じ挙動をとります。ただし、セッターはDateに対して破壊的変更を行いません。セッターは新しいオブジェクトを返します。

# フィルタ一覧
それぞれどのような日に合致するフィルタなのかという一覧です。

## 基本フィルタ

* year(year): year年である
* month(month): month月である
* date(date): date日である
* day(day): day曜日である(dayは0から6の数字(0が日曜日、6が土曜日))
* nthDay(n, day): n番目のday曜日である
* every(n, baseDate = new Date(1970, 0, 1)): baseDateから(まで)n日おきにあたる日である。例えばbaseDateを2016年1月1日とし、nを3にすると、2016/1/4、2016/1/7、…だけでなく、201512/29、2015/12/26、…も該当する

## 論理演算フィルタ

* and(...filters): 与えられたフィルタすべてに合致する
* nand(...filters): 与えられたフィルタのいずれかが合致しない
* or(...filters): 与えられたフィルタのいずれかに合致する
* nor(...filters): 与えられたフィルタすべてに合致しない
* not(filter): 与えられたフィルタに合致しない

## 範囲フィルタ
* since(since): since以降である(sinceはDateもしくはCalendar.Dateのインスタンス)
* until(until): until以前である(untilはDateもしくはCalendar.Dateのインスタンス)
* range(start, end): start以降、end以前である(start、endはそれぞれDateもしくはCalendar.Dateのインスタンス)

## 祝日フィルタ
* vernalEquinoxDay(): 春分の日である
* autumnalEquinoxDay(): 秋分の日である
* newYearsDay(): 元旦である
* comingOfAgeDay(): 成人の日である
* foundationDay(): 建国記念の日である
* showaDay(): 昭和の日である
* constitutionMemorialDay(): 憲法記念日である
* greeneryDay(): みどりの日である
* childrensDay(): こどもの日である
* marineDay(): 海の日である
* mountainDay(): 山の日である
* respectForTheAgedDay(): 敬老の日である
* healthAndSportsDay(): 体育の日である
* cultureDay(): 文化の日である
* labourThanksgivingDay(): 勤労感謝の日である
* theEmperorsBirthday(): 天皇誕生日である
* publicHoliday(): 祝日である

## その他のフィルタ

* fullMoonNight(): 十五夜である
* substituteHoliday(): 振替休日である
* citizensHoliday(): 国民の休日である
* weekday(): 平日である
* leapYear(): うるう年である

# サンプル

```javascript
new Calendar.Year(2016).filter(Calendar.filter.publicHoliday())
```
