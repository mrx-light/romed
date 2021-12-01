import axios from 'axios';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import { axiosInstance } from '../../services/AxiosWrapper';
import './HeaderStyles.css';
function Header(props) {
  const params = useHistory()
  const refHeader = useRef()

  async function goHome() {
    params.push("/home")
    window.scrollTo(0, 0)
  }
  function goAboutUs() {
    params.push("/home")
    if (props.aboutScroll) {
      const headerHeight = refHeader.current.offsetHeight;

      const topOfElement = props.aboutScroll.current.offsetTop - headerHeight;
      window.scroll({ top: topOfElement, behavior: "smooth" });
    }
  }
  function goNews() {
    params.push("/home");
    if (props.newsScroll) {
      const headerHeight = refHeader.current.offsetHeight;
      const topOfElement = props.newsScroll.current.offsetTop - headerHeight;
      window.scroll({ top: topOfElement, behavior: "smooth" });
    }
  }
  function goServices() {
    params.push("/home");
    if (props.servicesScroll) {
      const headerHeight = refHeader.current.offsetHeight;
      const topOfElement = props.servicesScroll.current.offsetTop - headerHeight;
      window.scroll({ top: topOfElement, behavior: "smooth" });
    }
  }
  function goProducts() {
    params.push("/categorys");
    // if (props.productsScroll) {
    //   const headerHeight = refHeader.current.offsetHeight;
    //   const topOfElement = props.productsScroll.current.offsetTop - headerHeight;
    //   window.scroll({ top: topOfElement, behavior: "smooth" });
    // }
  }
  // partnersScroll
  function goPartners() {
    params.push("/home");
    if (props.partnersScroll) {
      const headerHeight = refHeader.current.offsetHeight;
      const topOfElement = props.partnersScroll.current.offsetTop - headerHeight;
      window.scroll({ top: topOfElement, behavior: "smooth" });
    }
  }
  function goContacts() {
    params.push("/home");
    if (props.contactsScroll) {
      const headerHeight = refHeader.current.offsetHeight;
      const topOfElement = props.contactsScroll.current.offsetTop - headerHeight;
      window.scroll({ top: topOfElement, behavior: "smooth" });
    }
  }
  return (
    <div ref={refHeader} className="bg-background">
      <div className='container text-uppercase fw-bold padding'>
        <div className="justifyAlign ">
          <div className="text-uppercase verticleAlign color pointer" onClick={goHome}>
            <div className="logo " />
            <div className="paddingRight">Romedcom</div>
          </div>
          <div className="displayFlex ">

            <div className="cursor padding5 color" onClick={goHome}>Acasă</div>
            <div className="cursor padding5 color" onClick={goProducts}>Produse</div>
            <div className="cursor padding5 color" onClick={goAboutUs}>Despre Noi</div>
            <div className="cursor padding5 color" onClick={goNews}>Noutăți</div>
            <div className="cursor padding5 color" onClick={goPartners}>Parteneri</div>
            <div className="cursor padding5 color" onClick={goServices}>Servicii</div>
            <div className="cursor padding5 color" onClick={goContacts}>Contacte</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;