import { useRouter } from 'next/router'
import styles from './priceComponent_listBrands.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faClone } from '@fortawesome/free-solid-svg-icons';
// import './listBrand.css'
function PriceComponent_listBrands({ brands ,setSelectedBrands , path ,applePrice ,samsungPrice ,allPrice ,huaweiPrice ,miPrice ,nokiaPrice ,honorPrice}) {
  const router = useRouter()
  return (
    <nav className={`mb-3 mt-4  d-flex mx-lg-5 mx-md-5 ps-3 pe-2 ${styles.direction_rtl}`}>
      <div className={styles.priceComponent_listBrands_shape}></div>
      <div className={`${styles.priceComponent_listBrands_container} ${styles.overflow_ba} `}>
        <div className={`${styles.priceComponent_listBrandsRow} d-flex  align-items-center`}>
          <a className={`${styles.priceComponent_listBrandsImgAffect} col`} style={{ textDecoration: "none" }}
            onClick={() => {
              setSelectedBrands("all")
              router.push('/قیمت-گوشی-موبایل')
            }}>

              <img src="/images/Select-All-Icon.png" className={`${styles.img_select_all} ${styles.icon_all_brands} me-3 mt-1 ms-2`} />
            <div className={`${styles.priceComponent_listBrandsImgTop} ${(path === allPrice) ? styles.priceComponent_listBrandsImgTopSelected: ''}`}>
              <img src="/images/Select-All-Icon.png" className={`${styles.priceComponent_listBrandsImgHover}`} alt="all"/>
            </div>
              {/* <FontAwesomeIcon
                      icon={faCheckSquare}
                      className={`${styles.img_size} ${styles.icon_all_brands} me-3`}
                    /> */}
            {/* <p>{brands[0].name}</p> */}
          </a>
          <a className={`${styles.priceComponent_listBrandsImgAffect} col me-2`}
            onClick={() => {
              setSelectedBrands("apple")
              router.push('/قیمت-گوشی-اپل')
            }} >
            <img src={brands[1].url} className={styles.img_size} alt="apple" />
            <div className={`${styles.priceComponent_listBrandsImgTop} ${(path === applePrice) ? styles.priceComponent_listBrandsImgTopSelected: ''}`}>
              <img src="/images/h-apple.png" className={`${styles.priceComponent_listBrandsImgHover}`} alt="apple"/>
            </div>
          </a>
          <a className={`${styles.priceComponent_listBrandsImgAffect} col me-3`}
            onClick={() => {
              setSelectedBrands("samsung")
              router.push('/قیمت-گوشی-سامسونگ')
            }}>
            <img src={brands[2].url} className={styles.img_size} alt="samsung" />
            <div className={`${styles.priceComponent_listBrandsImgTop} ${(path === samsungPrice) ? styles.priceComponent_listBrandsImgTopSelected: ''}`}>
              <img src="/images/h-Samsung.png" className={`${styles.priceComponent_listBrandsImgHover}`} alt="samsung"/>
            </div>
          </a>
          <a className={`${styles.priceComponent_listBrandsImgAffect} col me-3`}
            onClick={() => {
              setSelectedBrands("huawei")
              router.push('/قیمت-گوشی-هوآوی')
            }}>
            <img src={brands[3].url} className={styles.img_size} alt="huawei" />
                        <div className={`${styles.priceComponent_listBrandsImgTop} ${(path === huaweiPrice) ? styles.priceComponent_listBrandsImgTopSelected: ''}`}>
              <img src="/images/h-Huawei.png" className={`${styles.priceComponent_listBrandsImgHover}`} alt="huawei"/>
            </div>
          </a>
          <a className={`${styles.priceComponent_listBrandsImgAffect} col me-3`}
            onClick={() => {
              setSelectedBrands("mi")
              router.push('/قیمت-گوشی-شیاومی')
            }}>
            <img src={brands[4].url} className={styles.img_size} alt="mi" />
                        <div className={`${styles.priceComponent_listBrandsImgTop} ${(path === miPrice) ? styles.priceComponent_listBrandsImgTopSelected: ''}`}>
              <img src="/images/h-xiaomi.png" className={`${styles.priceComponent_listBrandsImgHover}`} alt="mi"/>
            </div>
          </a>
          <a className={`${styles.priceComponent_listBrandsImgAffect} col me-3`}
            onClick={() => {
              setSelectedBrands("nokia")
              router.push('/قیمت-گوشی-نوکیا')
            }}>
            <img src={brands[5].url} className={styles.img_size} alt="nokia" />
                        <div className={`${styles.priceComponent_listBrandsImgTop} ${(path === nokiaPrice) ? styles.priceComponent_listBrandsImgTopSelected: ''}`}>
              <img src="/images/h-nokia.png" className={`${styles.priceComponent_listBrandsImgHover}`} alt="nokia"/>
            </div>
          </a>
          <a className={`${styles.priceComponent_listBrandsImgAffect} col me-3`}
            onClick={() => {
              setSelectedBrands("honor")
              router.push('/قیمت-گوشی-آنر')
            }}>
            <img src={brands[6].url} className={`${styles.img_size} ${styles.margin_top_7px}`} alt="honor" />
            <div className={`${styles.priceComponent_listBrandsImgTop} ${(path === honorPrice) ? styles.priceComponent_listBrandsImgTopSelected: ''}`}>
              <img src="/images/h-honor.png" className={`${styles.priceComponent_listBrandsImgHover}`} alt="honor"/>
            </div>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default PriceComponent_listBrands
