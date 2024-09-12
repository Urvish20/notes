import Header from '../components/Header';
import Section from '../components/Section';

const HomePage: React.FC = () => {
  return (
    <div className='mx-auto max-w-full py-[64px] px-[15px] md:px-[100px] bg-[#5790A2]'>
      <Header />
      <Section />
    </div>
  );
};

export default HomePage;
