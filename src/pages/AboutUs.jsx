import BenImg from '../assets/img/ben.jpeg'
import { GoogleMap } from '../cmps/GoogleMap'


export function AboutUs() {
    return (
        <section className=' about flex column center'>
            <h2>About</h2>
            <div className="team-section">


                <p>Shopping online has become a breeze with a multitude of websites catering to your every need. Amazon stands as a global marketplace, offering everything from books to electronics, making it a one-stop shop for consumers. eBay, a haven for both new and used items, allows you to bid on goods or buy them instantly, offering a unique shopping experience. For fashion enthusiasts, ASOS and Zappos provide a wide range of clothing and shoes, catering to various tastes and sizes. For tech aficionados, Newegg offers the latest in computer hardware, software, and gadgets. Lastly, Etsy is the go-to for handmade, vintage, and unique goods, perfect for gifts or personal treasures. Each of these platforms provides a convenient, diverse shopping experience from the comfort of your home.</p>
            </div>
            
            <h2>Where?</h2>
                <section>
                    <p>Address: 108 Herzl, Tel Aviv-Yafo</p>
                </section>
            <GoogleMap/>
            <div className="team-member">
                <hr />
                <h1 className="title-our-team">Meet the Owner</h1>
                <h1 className="member-name">Ben Goldberger</h1>
                <img className="member-img" src={BenImg} alt="Ben Goldberger" />

                <div className="btn-social">
                    <a className="git-btn" href="https://github.com/bengold1999" target="_blank">
                        <i className="fa-brands fa-github"></i></a>

                    <a
                        className="linkedin-btn"
                        href="https://www.linkedin.com/in/ben-goldberger-290b8b23a/" target="_blank" >
                        <i className="fa-brands fa-linkedin"></i></a>

                </div>
            </div>
                
                
        </section>
    )
}