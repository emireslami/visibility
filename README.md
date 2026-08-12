# Visibility

Visibility یک داشبورد فارسی و راست‌چین برای مانیتورینگ پیام‌های گروهی چند پلتفرمی است. پیام‌های تلگرام و بله از طریق بات‌ها دریافت می‌شوند، در Supabase ذخیره می‌شوند و روی Cloudflare Workers به صورت آنلاین نمایش داده می‌شوند.

آدرس فعلی سرویس:

[https://visibility.fgpt.workers.dev](https://visibility.fgpt.workers.dev)

## قابلیت‌ها

- دریافت و ذخیره پیام‌های گروهی از Telegram و Bale.
- پشتیبانی از چند بات در چند پلتفرم، همراه با ثبت `platform`، `bot_id`، نام بات و یوزرنیم بات.
- نمایش پیام‌ها، گروه‌ها، تردها، ارسال‌کننده‌ها، بات‌ها، دسترسی‌ها، اطلاع‌رسانی گروهی و تحلیل پاسخ‌گویی.
- ذخیره متن پیام، کپشن، فایل، عکس، ری‌اکشن، reply، edit، topic/thread، payload خام و زمان دریافت.
- نمایش زمان‌ها بر اساس Tehran time و تاریخ شمسی.
- فیلترهای قابل جستجو و چندانتخابی برای پلتفرم، گروه، تاپیک، تاریخ و سایر بخش‌ها.
- نمایش عکس‌ها و فایل‌ها در ترد و مدال جزئیات، با امکان دانلود.
- تشخیص topicهای تلگرام از `forum_topic_created.name` و `message_thread_id`.
- گروه‌بندی آلبوم‌ها و media groupها برای جلوگیری از نمایش چند پیام جدا برای یک ارسال چندعکسی.
- امکان Reply از داخل صفحه تردها برای کاربران مجاز؛ پیام با بات ارسال می‌شود و ایمیل کاربر داخل متن درج می‌شود.
- امکان اطلاع‌رسانی گروهی با تایید نهایی، دریافت دوباره پسورد کاربر و ثبت لاگ کامل ارسال‌ها.
- مدیریت دسترسی کاربران بر اساس صفحه، قابلیت‌ها، لیبل گروه‌ها و خود گروه‌ها.
- تحلیل میانگین زمان پاسخ‌گویی کل، به تفکیک لیبل گروه، لیبل ارسال‌کننده و گروه.

## صفحات اصلی

مسیرهای داخلی بعد از ورود با الگوی `/main/[page]` هستند:

- `/main/dashboard` - نمودار تعداد پیام‌ها بر اساس روز با تفکیک رنگی گروه‌ها و ارسال‌کننده‌ها.
- `/main/threads` - نمایش مکالمه‌ها به شکل ترد، همراه با reply، reaction، avatar، عکس و فایل.
- `/main/messages` - جدول پیام‌ها با جزئیات کامل، read more، badgeهای عکس/فایل/ویرایش و لینک‌های کلیک‌پذیر.
- `/main/groups` - لیست گروه‌ها، لیبل گروه، پلتفرم، بات، تعداد پیام و آخرین فعالیت.
- `/main/senders` - لیست ارسال‌کننده‌ها، لیبل فرد، آخرین گروه، زمان پیدا شدن و آخرین پیام.
- `/main/broadcast` - ارسال اطلاع‌رسانی گروهی و لاگ اطلاع‌رسانی‌های قبلی.
- `/main/bots` - مدیریت بات‌های پلتفرم‌ها و ثبت credential جدید.
- `/main/access` - مدیریت کاربران، permissionها، revoke/reactive، لاگ دسترسی و دسترسی گروهی.
- `/main/analytics` - تحلیل پاسخ‌گویی و جزئیات اثرگذارترین گروه‌ها/لیبل‌ها/افراد.
- `/main/profile` - پروفایل کاربر، ایمیل و یوزرنیم تلگرام.

صفحه `/` ورودی اصلی است. اگر کاربر لاگین باشد، پروفایل فعلی را نشان می‌دهد و ورود مستقیم به داشبورد ممکن است. `/login` به همین صفحه هدایت می‌شود.

## مدل دسترسی

فقط ایمیل‌های دامنه `@toman.ir` قابل دعوت و ورود هستند.

کاربر جدید با دعوت ساخته می‌شود و در اولین ورود باید پسورد قوی و یوزرنیم تلگرام خود را ثبت کند. نشست‌ها بعد از ۲۴ ساعت منقضی می‌شوند.

Permissionهای صفحه‌ای:

- `dashboard`
- `threads`
- `messages`
- `groups`
- `senders`
- `broadcast`
- `bots`
- `analytics`
- `access`

Permissionهای عملیاتی:

- `reply` - پاسخ دادن از صفحه تردها.
- `broadcast` - ارسال اطلاع‌رسانی گروهی.

دسترسی گروهی محدودکننده است: اگر برای یک کاربر هیچ لیبل یا گروهی انتخاب نشده باشد، پیام یا گروهی نمی‌بیند. مالک سیستم، `a.eslami@toman.ir`، همیشه دسترسی کامل دارد و دسترسی او قابل حذف یا محدودسازی نیست.

## لیبل‌ها

برای گروه‌ها و ارسال‌کننده‌ها سه لیبل عملیاتی وجود دارد:

- داخلی
- مشتری
- پروایدر

لیبل گروه‌ها در دسترسی‌ها هم استفاده می‌شود؛ انتخاب یک لیبل، تمام گروه‌های همان لیبل را برای کاربر انتخاب می‌کند. صفحه Access امکان مشاهده برعکس را هم دارد: انتخاب یک گروه و دیدن کاربرانی که به آن گروه دسترسی دارند.

## داده‌های ذخیره‌شده از پیام

برای هر پیام، بسته به پلتفرم و نوع پیام، داده‌های زیر ذخیره و در جزئیات قابل مشاهده است:

- پلتفرم و بات دریافت‌کننده
- شناسه گروه، نام گروه، یوزرنیم گروه و نوع گروه
- شناسه پیام و شناسه update
- فرستنده، شناسه فرستنده، نام، نام خانوادگی، یوزرنیم و bot بودن یا نبودن
- متن پیام، کپشن، نوع پیام، entityها و payload خام
- شناسه reply، chain ترد و topic/thread
- فایل و عکس، `file_id`، media group و لینک دانلود داخلی
- زمان ارسال، زمان دریافت، زمان ویرایش و تاریخ شمسی/تهران
- ری‌اکشن‌ها و آواتار کاربران در صورت امکان دریافت

## معماری

- Runtime: Cloudflare Workers
- Database/Auth: Supabase
- Storage of bot credentials: Supabase table with encrypted credential fields
- UI: یک HTML/CSS/JS app داخل Worker با فونت IRANSans
- Assets: `assets/fonts`
- Database migrations: `supabase/migrations`
- Worker entrypoint: `cloudflare-worker.js`

## متغیرها و Secretها

مقادیر واقعی نباید داخل Git ذخیره شوند. روی Cloudflare Workers از `wrangler secret put` استفاده کنید.

نمونه متغیرهای لازم:

```sh
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_PUBLISHABLE_KEY=
SESSION_SECRET=
BOT_CREDENTIAL_ENCRYPTION_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_BOT_ID=
TELEGRAM_BOT_USERNAME=
TELEGRAM_BOT_NAME=
TELEGRAM_WEBHOOK_SECRET=
BALE_BOT_TOKEN=
BALE_BOT_ID=
BALE_BOT_USERNAME=
BALE_BOT_NAME=
BALE_WEBHOOK_SECRET=
```

بات‌های جدید از صفحه `/main/bots` قابل ثبت هستند. credentialها باید از مسیر اپلیکیشن یا Secretهای Cloudflare مدیریت شوند، نه داخل README یا کد.

## راه‌اندازی دیتابیس

Supabase project در `supabase/config.toml` تنظیم شده است. برای اعمال migrationها:

```sh
supabase link --project-ref <project-ref>
supabase db push --linked
```

یا با CLI محلی پروژه:

```sh
npx supabase db push --linked
```

## اجرای لوکال Worker

```sh
pnpm install
pnpm dlx wrangler dev
```

در اجرای لوکال هم باید secret/envهای لازم تنظیم شده باشند.

## دیپلوی

```sh
pnpm dlx wrangler deploy --keep-vars --minify
```

بعد از دیپلوی، webhook بات‌ها باید به آدرس Worker اشاره کنند. مسیر عمومی webhook برای بات‌های ذخیره‌شده:

```text
/bot-webhook/:platform/:bot_id
```

برای تلگرام، BotFather privacy باید روی `Disable` باشد تا بات همه پیام‌های گروه را دریافت کند.

## نکات امنیتی

- توکن بات‌ها، کلید Supabase و Secretهای Cloudflare نباید در GitHub یا README قرار بگیرند.
- مدیریت کاربران فقط برای افراد دارای permission `access` فعال است.
- ارسال گروهی یک عملیات حساس است و قبل از ارسال، پسورد کاربر دوباره بررسی می‌شود.
- RLS و تنظیمات امنیتی Supabase در migrationها نگهداری می‌شوند.

## فایل‌های legacy

فایل‌های `collector.js`، `dashboard.js`، `migrate.js` و `bot.py` مربوط به نسخه‌های اولیه/لوکال پروژه هستند. مسیر اصلی تولید در حال حاضر Cloudflare Worker و Supabase است.
