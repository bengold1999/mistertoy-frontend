import homeImg from '../assets/img/home.png'


export function HomePage(){
    return <section className="home flex ">
     <img className="img-home" src={homeImg} alt="" />
     <h4 className='line-home'>"Find your perfect toy"</h4>
     </section>
}