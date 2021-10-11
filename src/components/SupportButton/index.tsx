
import styles from './styles.module.scss';

import { FaCcPaypal } from "react-icons/fa";
import Link from 'next/link';

export function SupportButton(){
   return(
      <div>
         <Link href="/donate">
            <button id={styles.main}>
               <FaCcPaypal size={45} />
               <span>Apoiar</span>
            </button>
         </Link>
      </div>
   )
}

export default SupportButton;