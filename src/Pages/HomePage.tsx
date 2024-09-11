import Header from '../components/Header';
import Section from '../components/Section';

const HomePage: React.FC = () => {
  return (
    <div className='mx-auto max-w-full px-[15px] md:px-[100px]'>
      <Header />
      <Section />
    </div>
  );
};

export default HomePage;
