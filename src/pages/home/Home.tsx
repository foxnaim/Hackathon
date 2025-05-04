import HeaderInfo from "../../components/header/header-info/HeaderInfo";

const Home = () => {
  return (
    <div className="px-10">
      <HeaderInfo />
      <main>
        <section className="flex flex-col md:flex-row my-24 md:my-52">
          <article className="md:w-1/2">
            <h1 className="text-4xl font-bold">
              Nexora AI — твой ассистент по стартапам
            </h1>
            <p className="text-lg my-5">
              С помощью Nexora AI вы узнаете, какие ниши растут, где рынок
              перенасыщен, а где есть неиспользованные возможности. Мы используем
              большие данные и машинное обучение, чтобы дать вам чёткие
              рекомендации для запуска успешного бизнеса.
            </p>
            <button
              type="button"
              className="bg-green-200 hover:bg-green-300 py-2 px-6 rounded-lg border-2 border-gray-300 duration-200"
            >
              Cum IN
            </button>
          </article>
          <aside className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
            {/* Здесь будет 3D-контент */}
            <div className="bg-gray-100 w-72 h-72 flex items-center justify-center rounded-lg shadow-inner">
              kjefbikvubevuhbrekvube
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Home;
