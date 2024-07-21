import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="main_container">
      <main className="main_content">{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
