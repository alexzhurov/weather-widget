import { config, library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

config.autoAddCss = false;

import {
  // faTrash,
  faGear,
  faLocationArrow,
  faCompass,
  faBars,
  faTrashCan,
  faArrowTurnDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  // faTrash,
  faGear,
  faLocationArrow,
  faCompass,
  faBars,
  faBars,
  faTrashCan,
  faArrowTurnDown,
  faXmark
);

export const FAStyles = dom.css();

export { FontAwesomeIcon };
