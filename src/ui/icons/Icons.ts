// icons.ts
import { AiOutlineLoading3Quarters, AiOutlineCheck, AiOutlineArrowLeft } from "react-icons/ai";
import { FiMail, FiLock, FiUser, FiPhone, FiSearch, FiChevronDown, FiChevronUp, FiAirplay } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowForward, IoIosLogOut } from "react-icons/io";
import { MdOutlineMoreVert } from "react-icons/md";

export const Icons = {
  spinner: AiOutlineLoading3Quarters,
  check: AiOutlineCheck,
  email: FiMail,
  password: FiLock,
  user: FiUser,
  phone: FiPhone,
  search: FiSearch,
  chevronDown: FiChevronDown,
  chevronUp: FiChevronUp,
  airplay: FiAirplay,
  send: LuSendHorizontal,
  menu: GiHamburgerMenu,
  close: IoCloseSharp,
  arrow: IoIosArrowForward,
  arrowLeft: AiOutlineArrowLeft,
  logout: IoIosLogOut,
  more: MdOutlineMoreVert,
};
