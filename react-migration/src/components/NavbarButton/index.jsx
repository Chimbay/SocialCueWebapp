export default function NavbarButton({ cn, link, label }) {
    return <a className={cn} href={link}>{label}</a>
}
