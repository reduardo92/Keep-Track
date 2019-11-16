import React, { useContext, useEffect } from 'react';
import ProfileContext from '../../Context/profile/ProfileContext';
import Hero from '../../Ui/Hero/Hero';
import cartoonCurl from '../../../assets/img/icons/cartoonbarbellup.png';
import FoodSearch from './FoodSearch/FoodSearch';
import GridAuto from '../../Ui/GridAuto/GridAuto';
import FoodCard from './FoodCard/FoodCard';
import AuthContext from '../../Context/auth/AuthContext';
import Spinner from '../../Ui/Spinner/Spinner';

const Food = () => {
  const {
    searchData,
    setFoodSelected,
    handleModal,
    loading,
    isFoodSearch
  } = useContext(ProfileContext);

  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);

  return (
    <section className='food'>
      <Hero
        heroGradient='var(--blue-linear--gradient--three)'
        title='Food Search'
        subtitle='find what you are carving for'
        linkToOne='setcalories'
        linkToTwo='diary'
        linkOneName='Set Calories'
        linkTwoName='Go To Diary'
        img={cartoonCurl}
        heroImgSize='170px'
        heroImgSizeMd='200px'
        heroImgSizeLg='230px'
      />
      <div className='container'>
        <FoodSearch />

        {loading && isFoodSearch ? (
          <Spinner />
        ) : (
          <GridAuto>
            {searchData &&
              searchData.map((data, i) => (
                <FoodCard
                  key={i}
                  data={data}
                  handleModal={handleModal}
                  setFoodSelected={setFoodSelected}
                />
              ))}
          </GridAuto>
        )}
      </div>
    </section>
  );
};

export default Food;
