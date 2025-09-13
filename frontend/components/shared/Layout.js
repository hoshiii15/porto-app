import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, profile }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar profile={profile} />
            <main>{children}</main>
            <Footer profile={profile} />
        </div>
    );
};

export default Layout;
