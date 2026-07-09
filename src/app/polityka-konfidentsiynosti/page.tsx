import type { Metadata } from 'next'
import Link from 'next/link'
import { BRAND } from '../brand'
import { absoluteUrl } from '../seo'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
  description:
    'Політика конфіденційності West Auto Shipping — як ми збираємо, використовуємо та захищаємо ваші персональні дані.',
  alternates: {
    canonical: absoluteUrl('/polityka-konfidentsiynosti'),
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          ← На головну
        </Link>
        <h1>Політика конфіденційності</h1>
        <p className={styles.updated}>Останнє оновлення: 9 липня 2026</p>
      </header>

      <article className={styles.content}>
        <section>
          <h2>1. Загальні положення</h2>
          <p>
            Ця політика конфіденційності описує, як {BRAND.name} («ми») збирає та обробляє
            персональні дані користувачів сайту {absoluteUrl('/')}.
          </p>
        </section>

        <section>
          <h2>2. Які дані ми збираємо</h2>
          <p>Через форму заявки ми можемо отримувати:</p>
          <ul>
            <li>імʼя;</li>
            <li>номер телефону;</li>
            <li>обрану послугу;</li>
            <li>коментар або побажання щодо автомобіля.</li>
          </ul>
        </section>

        <section>
          <h2>3. Мета обробки даних</h2>
          <p>Ми використовуємо ваші дані виключно для:</p>
          <ul>
            <li>звʼязку з вами щодо заявки;</li>
            <li>консультації та розрахунку вартості послуг;</li>
            <li>супроводу угоди з пригону автомобіля.</li>
          </ul>
        </section>

        <section>
          <h2>4. Передача даних третім особам</h2>
          <p>
            Ми не продаємо та не передаємо ваші персональні дані третім особам, окрім випадків,
            передбачених законодавством України, або коли це необхідно для надання послуги
            (наприклад, логістичним партнерам у процесі доставки).
          </p>
        </section>

        <section>
          <h2>5. Зберігання та захист</h2>
          <p>
            Ми вживаємо розумних організаційних і технічних заходів для захисту ваших даних
            від несанкціонованого доступу, втрати або розголошення.
          </p>
        </section>

        <section>
          <h2>6. Ваші права</h2>
          <p>Ви маєте право:</p>
          <ul>
            <li>дізнатися, які дані про вас обробляються;</li>
            <li>вимагати виправлення або видалення даних;</li>
            <li>відкликати згоду на обробку персональних даних.</li>
          </ul>
        </section>

        <section>
          <h2>7. Контакти</h2>
          <p>
            З питань щодо обробки персональних даних звертайтесь:
            <br />
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            <br />
            {BRAND.address}, {BRAND.city}
          </p>
        </section>
      </article>
    </div>
  )
}
