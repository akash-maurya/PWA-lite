import style from '../styles/fallback.module.css';
import Link from 'next/link';
const fallback  = ()=>{

    return (
      <>
        <div className={style.content}>
          <h1 className = {style.h1}>Page Not Found!</h1>
          <div>
            <p className = {style.para}>We were unable to load the page you requested.</p>
            <p className = {style.para}>Please check your internet connection and try again</p>
          </div>

          <Link href = '/'>
            <button>Refresh</button>
          </Link>
        </div>
      </>
    );
}

export default fallback ;