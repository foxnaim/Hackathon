import { Link } from 'react-router-dom';
import HeaderInfo from "../../components/header/header-info/HeaderInfo";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="px-10">
      <HeaderInfo />
      <main>
        <section className="flex flex-col md:flex-row my-24 md:my-56">
          <article className="md:w-1/2">
            <h1 className="text-4xl font-bold">
              Nexora AI — твой ассистент по стартапам
            </h1>
            <p className="text-lg my-5">
              С помощью Nexora AI вы узнаете, какие ниши растут, где рынок
              перенасыщен, а где есть неиспользованные возможности. Мы
              используем большие данные и машинное обучение, чтобы дать вам
              чёткие рекомендации для запуска успешного бизнеса.
            </p>
            <button
              type="button"
              className="bg-green-200 hover:bg-green-300 py-2 px-6 rounded-lg border-2 border-gray-300 duration-200"
              onClick={() => navigate('/register')}
            >
              Присоединиться
            </button>
          </article>
          <aside className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
           ХЪиолриолри
          </aside>
        </section>
        <div className="border-2 mt-80" />
        <section>
  <span id="about-us" className='flex justify-center mt-5 text-2xl'>
    Что такое Nexora AI?
  </span>
  <div className='mt-5 w-full md:w-2/5 mx-auto text-center'>
    <p>
      Nexora AI — это ваш интеллектуальный помощник для поиска и запуска стартапов. Мы анализируем огромные массивы данных, чтобы выявлять тренды, пробелы и перспективные ниши на рынке. Наша цель — помочь вам запускать бизнесы быстрее, точнее и с меньшими рисками.
    </p>
  </div>
</section>

      </main>
    </div>
  );
};

export default Home;
