import HeroHeading from '../../../components/HeroHeading';
import PrimaryButton from '../../../components/PrimaryButton';
import HeroImg from '../../../assets/images/heroImg.jpg';
import LooperGroup from '../../../assets/images/LooperGroup.png';

const Hero: React.FC = () => {
  return (
    <section className='p-6 md:p-0 mb-16 top-20 relative'>
      <div className="">
        <HeroHeading className=''>Revolutionizing<span className='text-black'>,</span></HeroHeading>
        <h1 className='md:text-heading-1 text-5xl font-helvetica-light text-black'>Healthcare for the Sakin Community.</h1>
      </div>
      <div className="md:w-[536px]">
        <p className='my-6 text-xl font-helvetica-light'>
          At Smart Doctor, we are committed to enhancing healthcare accessibility and efficiency through technology. Our platform offers seamless appointment booking, patient management, and telemedicine solutions tailored to the needs of the Sakin community.
        </p>
        <PrimaryButton className='w-[200px] font-helvetica-light font-normal text-lg my-6'>
          Get Started
        </PrimaryButton>
      </div>
      <div className="relative">
        <img src={HeroImg} alt='Hero Image' height={590}  className='rounded-lg'/>
        <img src={LooperGroup} alt='Hero Image' className='absolute z-50 md:w-[852.32px] h-[718.48px] -top-96 -right-96' />
      </div>
    </section>
  );
};

export default Hero;
