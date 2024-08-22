import Logo from "./Logo";
import Menu from "./Menu";

const NavContainer = ({children, ready, webtitle}) => {
    return (
        <nav id="navContainer" className={`w-full bg-white lg:h-[108px] flex justify-between border-b border-black  ${!ready ? "opacity-0" : " opacity-100"} overflow-y-visible`}>
            <Menu />
            <Logo text={webtitle} first={true} />
            {children}
        </nav>
    )
}

export default NavContainer;